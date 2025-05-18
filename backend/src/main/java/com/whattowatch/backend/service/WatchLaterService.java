package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.WatchLater;
import com.whattowatch.backend.entity.enums.MediaType;

import java.util.List;

public interface WatchLaterService {
    WatchLater addToWatchLater(User user, Long itemId, String name, String imageURL, MediaType type);
    void removeFromWatchLater(User user, Long itemId);
    List<WatchLater> getWatchLater(User user);
    boolean isInWatchLater(User user, Long itemId);
}