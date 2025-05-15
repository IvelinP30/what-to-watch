package com.whattowatch.backend.controller;

import com.whattowatch.backend.entity.Watchlist;
import com.whattowatch.backend.service.UserDetailsServiceImpl;
import com.whattowatch.backend.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user/watchlist")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WatchlistController {

    private final WatchlistService watchService;
    private final UserDetailsServiceImpl userService;

    @GetMapping
    public ResponseEntity<List<Watchlist>> getWatchlist() {
        return ResponseEntity.ok(watchService.getWatchlist(userService.getCurrentUser()));
    }

    @PostMapping
    public ResponseEntity<Watchlist> addWatchlist(@RequestBody Map<String, String> body) {
        var item = watchService.addToWatchlist(
                userService.getCurrentUser(),
                Long.valueOf(body.get("id")),
                body.get("name"),
                body.get("imageURL"));
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeWatchlist(@PathVariable Long id) {
        watchService.removeFromWatchlist(userService.getCurrentUser(), id);
        return ResponseEntity.ok().build();
    }
}
