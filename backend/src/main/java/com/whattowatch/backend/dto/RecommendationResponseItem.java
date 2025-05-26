package com.whattowatch.backend.dto;

import com.whattowatch.backend.entity.enums.MediaType;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponseItem {

    private int itemId;
    private String name;
    private MediaType type;
    private String imageUrl;
    private double similarityScore;

    @Override
    public String toString() {
        return "RecommendationResponseItem{" +
                "itemId=" + itemId +
                ", name='" + name + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", type=" + type +
                ", similarityScore=" + similarityScore +
                '}';
    }
}
