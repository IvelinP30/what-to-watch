package com.whattowatch.backend.service.impl;

import com.whattowatch.backend.entity.Favourite;
import com.whattowatch.backend.entity.User;
import com.whattowatch.backend.repository.FavouriteRepository;
import com.whattowatch.backend.service.FavouriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavouriteServiceImpl implements FavouriteService {

    private final FavouriteRepository favRepo;

    @Override
    public Favourite addToFavourites(User user, Long itemId, String name, String imageURL) {
        if (favRepo.findByUserAndItemId(user, itemId).isPresent()) {
            throw new RuntimeException("Item already in favourites");
        }
        Favourite fav = new Favourite(null, itemId, name, imageURL, user);
        return favRepo.save(fav);
    }

    @Override
    public void removeFromFavourites(User user, Long itemId) {
        Favourite fav = favRepo.findByUserAndItemId(user, itemId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        favRepo.delete(fav);
    }

    @Override
    public List<Favourite> getFavourites(User user) {
        return favRepo.findAllByUser(user);
    }

    @Override
    public boolean isInFavourites(User user, Long itemId) {
        return favRepo.findByUserAndItemId(user, itemId).isPresent();
    }
}