package com.whattowatch.backend.repository;

import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.entity.WatchLater;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchLaterRepository extends JpaRepository<WatchLater, Long> {
    List<WatchLater> findAllByUser(User user);
    Optional<WatchLater> findByUserAndItemId(User user, Long itemId);
}
