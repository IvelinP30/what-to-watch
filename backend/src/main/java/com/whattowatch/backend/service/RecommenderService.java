package com.whattowatch.backend.service;

import com.whattowatch.backend.dto.MediaItem;
import com.whattowatch.backend.dto.RecommendationResponseItem;

import java.util.List;

public interface RecommenderService {
    List<RecommendationResponseItem> getRecommendations(List<MediaItem> favorites, List<MediaItem> watchLater);
}
