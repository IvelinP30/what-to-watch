package com.whattowatch.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MediaItem {
    private int id;
    private String type;

    public MediaItem(int id, String type) {
        this.id = id;
        this.type = type;
    }

}
