package com.whattowatch.backend.service.impl;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.WatchLater;
import com.whattowatch.backend.repository.WatchLaterRepository;
import com.whattowatch.backend.service.WatchLaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchLaterServiceImpl implements WatchLaterService {

    private final WatchLaterRepository watchRepo;

    @Override
    public WatchLater addToWatchLater(User user, Long itemId, String name, String imageURL) {
        if (watchRepo.findByUserAndItemId(user, itemId).isPresent()) {
            throw new RuntimeException("Item already in watch later");
        }
        WatchLater item = new WatchLater(null, itemId, name, imageURL, user);
        return watchRepo.save(item);
    }

    @Override
    public void removeFromWatchLater(User user, Long itemId) {
        WatchLater item = watchRepo.findByUserAndItemId(user, itemId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        watchRepo.delete(item);
    }

    @Override
    public List<WatchLater> getWatchLater(User user) {
        return watchRepo.findAllByUser(user);
    }

    @Override
    public boolean isInWatchLater(User user, Long itemId) {
        return watchRepo.findByUserAndItemId(user, itemId).isPresent();
    }
}