package com.whattowatch.backend.controller;

import com.whattowatch.backend.entity.WatchLater;
import com.whattowatch.backend.service.AppUserDetailsService;
import com.whattowatch.backend.service.WatchLaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user/watch-later")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WatchLaterController {

    private final WatchLaterService watchService;
    private final AppUserDetailsService userService;

    @GetMapping
    public ResponseEntity<List<WatchLater>> getWatchLater() {
        return ResponseEntity.ok(watchService.getWatchLater(userService.getCurrentUser()));
    }

    @GetMapping("/exists/{itemId}")
    public ResponseEntity<Boolean> isWatchLater(@PathVariable Long itemId) {
        boolean exists = watchService.isInWatchLater(userService.getCurrentUser(), itemId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping
    public ResponseEntity<WatchLater> addWatchLater(@RequestBody Map<String, String> body) {
        var item = watchService.addToWatchLater(
                userService.getCurrentUser(),
                Long.valueOf(body.get("id")),
                body.get("name"),
                body.get("imageURL"));
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeWatchLater(@PathVariable Long id) {
        watchService.removeFromWatchLater(userService.getCurrentUser(), id);
        return ResponseEntity.ok().build();
    }
}
