package com.whattowatch.backend.repository;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findAllByUser(User user);
    Optional<Watchlist> findByUserAndItemId(User user, Long itemId);
}
