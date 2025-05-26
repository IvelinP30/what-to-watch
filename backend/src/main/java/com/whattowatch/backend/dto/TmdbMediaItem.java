package com.whattowatch.backend.dto;

import com.whattowatch.backend.entity.enums.MediaType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TmdbMediaItem {
    private int id;
    private String title;
    private String name;
    private String overview;
    private String posterPath;
    private MediaType mediaType;
    private List<String> genres;
    private List<String> keywords;
    private List<String> cast;
    private List<String> directors;
    private List<String> productionCompanies;

}
