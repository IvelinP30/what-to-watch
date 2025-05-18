package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.WatchLater;
import com.whattowatch.backend.repository.WatchLaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchLaterService {

    private final WatchLaterRepository watchRepo;

    public WatchLater addToWatchLater(User user, Long itemId, String name, String imageURL) {
        if (watchRepo.findByUserAndItemId(user, itemId).isPresent()) {
            throw new RuntimeException("Item already in watch later");
        }
        WatchLater item = new WatchLater(null, itemId, name, imageURL, user);
        return watchRepo.save(item);
    }

    public void removeFromWatchLater(User user, Long itemId) {
        WatchLater item = watchRepo.findByUserAndItemId(user, itemId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        watchRepo.delete(item);
    }

    public List<WatchLater> getWatchLater(User user) {
        return watchRepo.findAllByUser(user);
    }

    public boolean isInWatchLater(User user, Long itemId) {
        return watchRepo.findByUserAndItemId(user, itemId).isPresent();
    }
}
