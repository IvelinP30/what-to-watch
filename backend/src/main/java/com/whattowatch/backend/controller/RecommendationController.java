package com.whattowatch.backend.controller;

import com.whattowatch.backend.dto.MediaItem;
import com.whattowatch.backend.dto.RecommendationResponseItem;
import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.repository.FavouriteRepository;
import com.whattowatch.backend.repository.WatchLaterRepository;
import com.whattowatch.backend.service.AppUserDetailsService;
import com.whattowatch.backend.service.RecommenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    private final RecommenderService recommenderService;
    private final FavouriteRepository favouriteRepository;
    private final WatchLaterRepository watchLaterRepository;
    private final AppUserDetailsService userDetailsService;

    @Autowired
    public RecommendationController(
            RecommenderService recommenderService,
            FavouriteRepository favouriteRepository,
            WatchLaterRepository watchLaterRepository,
            AppUserDetailsService userDetailsService
    ) {
        this.recommenderService = recommenderService;
        this.favouriteRepository = favouriteRepository;
        this.watchLaterRepository = watchLaterRepository;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendations() {
        try {
            User user = userDetailsService.getCurrentUser();

            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            List<MediaItem> favorites = favouriteRepository.findAllByUser(user).stream()
                    .map(fav -> new MediaItem(fav.getItemId().intValue(), fav.getType().name().toLowerCase()))
                    .collect(Collectors.toList());

            List<MediaItem> watchLater = watchLaterRepository.findAllByUser(user).stream()
                    .map(wl -> new MediaItem(wl.getItemId().intValue(), wl.getType().name().toLowerCase()))
                    .collect(Collectors.toList());

            List<RecommendationResponseItem> recommendations = recommenderService.getRecommendations(favorites, watchLater);

            if (recommendations == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Recommendation service returned null");
            }

            recommendations.forEach(r -> System.out.println("Recommendation: " + r));

            return ResponseEntity.ok(recommendations);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error: " + e.getMessage());
        }
    }
}