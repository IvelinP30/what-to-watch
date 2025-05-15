package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.Watchlist;
import com.whattowatch.backend.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchRepo;

    public Watchlist addToWatchlist(User user, Long itemId, String name, String imageURL) {
        if (watchRepo.findByUserAndItemId(user, itemId).isPresent()) {
            throw new RuntimeException("Item already in watchlist");
        }
        Watchlist item = new Watchlist(null, itemId, name, imageURL, user);
        return watchRepo.save(item);
    }

    public void removeFromWatchlist(User user, Long itemId) {
        Watchlist item = watchRepo.findByUserAndItemId(user, itemId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        watchRepo.delete(item);
    }

    public List<Watchlist> getWatchlist(User user) {
        return watchRepo.findAllByUser(user);
    }
}
