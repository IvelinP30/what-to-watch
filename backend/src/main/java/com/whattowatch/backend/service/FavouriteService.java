package com.whattowatch.backend.service;

import com.whattowatch.backend.entity.Favourite;
import com.whattowatch.backend.entity.User;

import java.util.List;

public interface FavouriteService {
    Favourite addToFavourites(User user, Long itemId, String name, String imageURL);
    void removeFromFavourites(User user, Long itemId);
    List<Favourite> getFavourites(User user);
    boolean isInFavourites(User user, Long itemId);
}
