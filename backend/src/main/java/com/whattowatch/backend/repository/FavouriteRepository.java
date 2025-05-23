package com.whattowatch.backend.repository;

import com.whattowatch.backend.entity.Favourite;
import com.whattowatch.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    List<Favourite> findAllByUser(User user);
    Optional<Favourite> findByUserAndItemId(User user, Long itemId);
}
