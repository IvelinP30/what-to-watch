package com.whattowatch.backend.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class Credits {
    private final List<String> cast;
    private final List<String> directors;

    public Credits(List<String> cast, List<String> directors) {
        this.cast = cast;
        this.directors = directors;
    }

}
