package com.whattowatch.backend.service.tmdb;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.whattowatch.backend.dto.Credits;
import com.whattowatch.backend.dto.TmdbMediaItem;
import com.whattowatch.backend.entity.enums.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class TmdbClient {

    private static final Logger logger = LoggerFactory.getLogger(TmdbClient.class);
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${tmdb.api.key}")
    private String tmdbApiKey;

    @Value("${tmdb.base.url}")
    private String tmdbBaseUrl;

    private final Map<Integer, String> genreIdToNameMap = new ConcurrentHashMap<>();
    private final Map<String, List<String>> keywordCache = new ConcurrentHashMap<>();
    private final Map<String, Credits> creditsCache = new ConcurrentHashMap<>();

    public TmdbClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        loadGenreMap();
    }

    public List<TmdbMediaItem> fetchPopularMovies() {
        return fetchMediaListFromTmdb("/movie/popular", MediaType.MOVIE);
    }

    public List<TmdbMediaItem> fetchTrendingMovies() {
        return fetchMediaListFromTmdb("/trending/movie/day", MediaType.MOVIE);
    }

    public List<TmdbMediaItem> fetchTopRatedMovies() {
        return fetchMediaListFromTmdb("/movie/top_rated", MediaType.MOVIE);
    }

    public List<TmdbMediaItem> fetchDiscoverMovies() {
        return fetchMediaListFromTmdb("/discover/movie", MediaType.MOVIE);
    }

    public List<TmdbMediaItem> fetchPopularTvShows() {
        return fetchMediaListFromTmdb("/tv/popular", MediaType.TV);
    }

    public List<TmdbMediaItem> fetchTrendingTvShows() {
        return fetchMediaListFromTmdb("/trending/tv/day", MediaType.TV);
    }

    public List<TmdbMediaItem> fetchTopRatedTvShows() {
        return fetchMediaListFromTmdb("/tv/top_rated", MediaType.TV);
    }

    public List<TmdbMediaItem> fetchDiscoverTvShows() {
        return fetchMediaListFromTmdb("/discover/tv", MediaType.TV);
    }

    public JsonNode fetchMediaDetails(TmdbMediaItem item) {
        try {
            String url = String.format("%s/%s/%d?language=en-US", tmdbBaseUrl,
                    item.getMediaType().name().toLowerCase(), item.getId());
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET,
                    new HttpEntity<>(buildHeaders()), String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonNode json = objectMapper.readTree(response.getBody());
                ((ObjectNode) json).put("media_type", item.getMediaType().name().toLowerCase());
                return json;
            }
        } catch (Exception e) {
            logger.error("Error fetching details for {} id={}", item.getMediaType(), item.getId(), e);
        }
        return null;
    }

    public List<JsonNode> fetchMediaDetails(List<TmdbMediaItem> items) {
        return items.parallelStream()
                .map(this::fetchMediaDetails)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private List<TmdbMediaItem> fetchMediaListFromTmdb(String endpoint, MediaType mediaType) {
        List<TmdbMediaItem> mediaList = new ArrayList<>();

        for (int page = 1; page <= 2; page++) {
            String url = String.format("%s%s?language=en-US&page=%d", tmdbBaseUrl, endpoint, page);
            try {
                ResponseEntity<String> response = restTemplate.exchange(
                        url, HttpMethod.GET, new HttpEntity<>(buildHeaders()), String.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    JsonNode results = objectMapper.readTree(response.getBody()).path("results");

                    if (results.isArray()) {
                        results.forEach(result -> {
                            TmdbMediaItem item = new TmdbMediaItem();
                            item.setId(result.path("id").asInt());
                            item.setTitle(result.path("title").asText(null));
                            item.setName(result.path("name").asText(null));
                            item.setOverview(result.path("overview").asText(null));
                            item.setPosterPath(result.path("poster_path").asText(null));
                            item.setMediaType(mediaType);

                            item.setGenres(extractGenres(result));
                            item.setKeywords(fetchKeywords(item.getId(), mediaType));
                            Credits credits = fetchCredits(item.getId(), mediaType);
                            item.setCast(credits.getCast());
                            item.setDirectors(credits.getDirectors());

                            mediaList.add(item);
                        });
                    }
                } else {
                    logger.warn("TMDB request to {} failed: {}", url, response.getStatusCode());
                }
            } catch (Exception e) {
                logger.error("Error fetching TMDB data from {}", url, e);
            }
        }

        return mediaList;
    }

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbApiKey);
        headers.setAccept(Collections.singletonList(org.springframework.http.MediaType.APPLICATION_JSON));
        return headers;
    }

    private List<String> extractGenres(JsonNode result) {
        List<String> genreNames = new ArrayList<>();
        JsonNode genreIds = result.path("genre_ids");

        if (genreIds.isArray()) {
            for (JsonNode genreId : genreIds) {
                genreNames.add(genreIdToNameMap.getOrDefault(genreId.asInt(), "Unknown"));
            }
        }
        return genreNames;
    }

    private void loadGenreMap() {
        loadGenres("/genre/movie/list");
        loadGenres("/genre/tv/list");
    }

    private void loadGenres(String endpoint) {
        try {
            String url = tmdbBaseUrl + endpoint;
            ResponseEntity<String> response = restTemplate.exchange(
                    url, HttpMethod.GET, new HttpEntity<>(buildHeaders()), String.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonNode genres = objectMapper.readTree(response.getBody()).path("genres");
                for (JsonNode genre : genres) {
                    genreIdToNameMap.put(genre.path("id").asInt(), genre.path("name").asText());
                }
            }
        } catch (Exception e) {
            logger.error("Failed to load genres from {}", endpoint, e);
        }
    }

    private List<String> fetchKeywords(int mediaId, MediaType type) {
        String cacheKey = type + "_" + mediaId;
        return keywordCache.computeIfAbsent(cacheKey, key -> {
            List<String> keywords = new ArrayList<>();
            String endpoint = String.format("/%s/%d/keywords", type.name().toLowerCase(), mediaId);

            try {
                String url = tmdbBaseUrl + endpoint;
                ResponseEntity<String> response = restTemplate.exchange(
                        url, HttpMethod.GET, new HttpEntity<>(buildHeaders()), String.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    JsonNode root = objectMapper.readTree(response.getBody());
                    JsonNode keywordNode = root.path("keywords").isArray() ? root.path("keywords") : root.path("results");

                    for (JsonNode keyword : keywordNode) {
                        String name = keyword.path("name").asText(null);
                        if (name != null) keywords.add(name);
                    }
                }
            } catch (Exception e) {
                logger.error("Failed to fetch keywords for {} {}", type, mediaId, e);
            }
            return keywords;
        });
    }

    private Credits fetchCredits(int mediaId, MediaType type) {
        String cacheKey = type + "_" + mediaId;
        return creditsCache.computeIfAbsent(cacheKey, key -> {
            List<String> cast = new ArrayList<>();
            List<String> directors = new ArrayList<>();
            String endpoint = String.format("/%s/%d/credits", type.name().toLowerCase(), mediaId);

            try {
                String url = tmdbBaseUrl + endpoint;
                ResponseEntity<String> response = restTemplate.exchange(
                        url, HttpMethod.GET, new HttpEntity<>(buildHeaders()), String.class);

                if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                    JsonNode root = objectMapper.readTree(response.getBody());

                    JsonNode castNode = root.path("cast");
                    for (int i = 0; i < Math.min(castNode.size(), 5); i++) {
                        cast.add(castNode.get(i).path("name").asText(null));
                    }

                    for (JsonNode crew : root.path("crew")) {
                        if ("Director".equalsIgnoreCase(crew.path("job").asText(""))) {
                            String name = crew.path("name").asText(null);
                            if (name != null && !directors.contains(name)) {
                                directors.add(name);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                logger.error("Failed to fetch credits for {} {}", type, mediaId, e);
            }

            return new Credits(cast, directors);
        });
    }
}