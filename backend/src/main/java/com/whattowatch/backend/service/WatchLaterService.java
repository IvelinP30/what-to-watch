package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.WatchLater;

import java.util.List;

public interface WatchLaterService {
    WatchLater addToWatchLater(User user, Long itemId, String name, String imageURL);
    void removeFromWatchLater(User user, Long itemId);
    List<WatchLater> getWatchLater(User user);
    boolean isInWatchLater(User user, Long itemId);
}