package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.Favourite;
import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.repository.FavouriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavouriteService {

    private final FavouriteRepository favRepo;

    public Favourite addToFavourites(User user, Long itemId, String name, String imageURL) {
        if (favRepo.findByUserAndItemId(user, itemId).isPresent()) {
            throw new RuntimeException("Item already in favourites");
        }
        Favourite fav = new Favourite(null, itemId, name, imageURL, user);
        return favRepo.save(fav);
    }

    public void removeFromFavourites(User user, Long itemId) {
        Favourite fav = favRepo.findByUserAndItemId(user, itemId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        favRepo.delete(fav);
    }

    public List<Favourite> getFavourites(User user) {
        return favRepo.findAllByUser(user);
    }
}
