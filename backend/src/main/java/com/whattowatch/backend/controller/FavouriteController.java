package com.whattowatch.backend.controller;

import com.whattowatch.backend.entity.Favourite;
import com.whattowatch.backend.service.FavouriteService;
import com.whattowatch.backend.service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user/favorite")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FavouriteController {

    private final FavouriteService favService;
    private final AppUserDetailsService userService;

    @GetMapping
    public ResponseEntity<List<Favourite>> getFavourites() {
        return ResponseEntity.ok(favService.getFavourites(userService.getCurrentUser()));
    }

    @GetMapping("/exists/{itemId}")
    public ResponseEntity<Boolean> isFavourite(@PathVariable Long itemId) {
        boolean exists = favService.isInFavourites(userService.getCurrentUser(), itemId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping
    public ResponseEntity<Favourite> addFavourite(@RequestBody Map<String, String> body) {
        var fav = favService.addToFavourites(
                userService.getCurrentUser(),
                Long.valueOf(body.get("id")),
                body.get("name"),
                body.get("imageURL"));
        return ResponseEntity.ok(fav);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFavourite(@PathVariable Long id) {
        favService.removeFromFavourites(userService.getCurrentUser(), id);
        return ResponseEntity.ok().build();
    }
}
