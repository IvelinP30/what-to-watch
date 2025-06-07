package com.whattowatch.backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.whattowatch.backend.dto.MediaItem;
import com.whattowatch.backend.dto.RecommendationResponseItem;
import com.whattowatch.backend.dto.TmdbMediaItem;
import com.whattowatch.backend.entity.enums.MediaType;
import com.whattowatch.backend.service.RecommenderService;
import com.whattowatch.backend.service.tmdb.TmdbClient;
import com.whattowatch.backend.util.TextSimilarityUtil;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class RecommenderServiceImpl implements RecommenderService {

    private static final double SIMILARITY_THRESHOLD = 0.1;
    private static final int MAX_RECOMMENDATIONS = 50;

    private final TmdbClient tmdbClient;

    public RecommenderServiceImpl(TmdbClient tmdbClient) {
        this.tmdbClient = tmdbClient;
    }

    @Override
    public List<RecommendationResponseItem> getRecommendations(List<MediaItem> favorites, List<MediaItem> watchLater) {
        Set<MediaItem> watchedSet = new HashSet<>();
        Optional.ofNullable(favorites).ifPresent(watchedSet::addAll);
        Optional.ofNullable(watchLater).ifPresent(watchedSet::addAll);

        watchedSet = watchedSet.stream()
                .filter(item -> !"person".equalsIgnoreCase(item.getType()))
                .collect(Collectors.toSet());
        
        if (watchedSet.isEmpty()) return getFallbackRecommendations();

        Map<Integer, TmdbMediaItem> candidateMap = fetchCandidates();
        Set<Integer> watchedIds = watchedSet.stream()
                .map(MediaItem::getId)
                .collect(Collectors.toSet());

        List<TmdbMediaItem> filteredCandidates = candidateMap.values().stream()
                .filter(item -> !watchedIds.contains(item.getId()))
                .collect(Collectors.toList());

        List<JsonNode> watchedDetails = tmdbClient.fetchMediaDetails(convertToTmdbMediaItems(watchedSet));
        List<JsonNode> candidateDetails = tmdbClient.fetchMediaDetails(filteredCandidates);

        if (watchedDetails.isEmpty() || candidateDetails.isEmpty()) return Collections.emptyList();

        List<String> watchedTexts = prepareCombinedTexts(watchedDetails);
        List<String> candidateTexts = prepareCombinedTexts(candidateDetails);

        Map<String, Double> idfMap = TextSimilarityUtil.idf(
                Stream.concat(watchedTexts.stream(), candidateTexts.stream()).toList()
        );

        List<Map<String, Double>> watchedVectors = watchedTexts.stream()
                .map(text -> TextSimilarityUtil.tfIdf(text, idfMap))
                .toList();

        List<Map<String, Double>> candidateVectors = candidateTexts.stream()
                .map(text -> TextSimilarityUtil.tfIdf(text, idfMap))
                .toList();

        Map<Integer, Double> scoredCandidates = new HashMap<>();
        for (int i = 0; i < candidateVectors.size(); i++) {
            Map<String, Double> candidateVectorMap = candidateVectors.get(i);

            double similarity = watchedVectors.stream()
                    .mapToDouble(watchVectorMap -> TextSimilarityUtil.cosineSimilarity(watchVectorMap, candidateVectorMap))
                    .average()
                    .orElse(0.0);

            int candidateId = candidateDetails.get(i).path("id").asInt(-1);
            scoredCandidates.put(candidateId, similarity);
        }

        return scoredCandidates.entrySet().stream()
                .filter(entry -> entry.getValue() >= SIMILARITY_THRESHOLD)
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(MAX_RECOMMENDATIONS)
                .map(entry -> buildRecommendationResponse(entry.getKey(), entry.getValue(), candidateDetails))
                .filter(Objects::nonNull)
                .toList();
    }

    private List<RecommendationResponseItem> getFallbackRecommendations() {
        LinkedHashSet<TmdbMediaItem> fallbackSet = new LinkedHashSet<>();
        fallbackSet.addAll(tmdbClient.fetchPopularMovies());
        fallbackSet.addAll(tmdbClient.fetchTrendingMovies());
        fallbackSet.addAll(tmdbClient.fetchPopularTvShows());
        fallbackSet.addAll(tmdbClient.fetchTrendingTvShows());

        return fallbackSet.stream()
                .limit(MAX_RECOMMENDATIONS)
                .map(item -> new RecommendationResponseItem(
                        item.getId(),
                        item.getTitle() != null ? item.getTitle() : item.getName(),
                        item.getMediaType(),
                        item.getPosterPath() != null ? "https://image.tmdb.org/t/p/w500" + item.getPosterPath() : null,
                        0.0
                ))
                .toList();
    }

    private Map<Integer, TmdbMediaItem> fetchCandidates() {
        List<List<TmdbMediaItem>> allCandidates = List.of(
                tmdbClient.fetchPopularMovies(),
                tmdbClient.fetchTrendingMovies(),
                tmdbClient.fetchPopularTvShows(),
                tmdbClient.fetchTrendingTvShows(),
                tmdbClient.fetchTopRatedMovies(),
                tmdbClient.fetchTopRatedTvShows(),
                tmdbClient.fetchDiscoverMovies(),
                tmdbClient.fetchDiscoverTvShows()
        );

        Map<Integer, TmdbMediaItem> candidateMap = new HashMap<>();
        for (List<TmdbMediaItem> candidateList : allCandidates) {
            if (candidateList != null) {
                for (TmdbMediaItem item : candidateList) {
                    candidateMap.putIfAbsent(item.getId(), item);
                }
            }
        }
        return candidateMap;
    }

    private RecommendationResponseItem buildRecommendationResponse(int id, double score, List<JsonNode> candidateDetails) {
        return candidateDetails.stream()
                .filter(json -> json.path("id").asInt() == id)
                .findFirst()
                .map(media -> {
                    MediaType mediaType = MediaType.MOVIE;
                    try {
                        mediaType = MediaType.valueOf(media.path("media_type").asText("movie").toUpperCase());
                    } catch (IllegalArgumentException ignored) {}
                    String name = mediaType == MediaType.TV ? media.path("name").asText() : media.path("title").asText();
                    String imageUrl = media.path("poster_path").asText(null);
                    return new RecommendationResponseItem(
                            id,
                            name,
                            mediaType,
                            imageUrl != null ? "https://image.tmdb.org/t/p/w500" + imageUrl : null,
                            score
                    );
                }).orElse(null);
    }

    private List<TmdbMediaItem> convertToTmdbMediaItems(Collection<MediaItem> mediaItems) {
        return mediaItems.stream().map(item -> {
            TmdbMediaItem tmdb = new TmdbMediaItem();
            tmdb.setId(item.getId());
            try {
                tmdb.setMediaType(MediaType.valueOf(item.getType().toUpperCase()));
            } catch (IllegalArgumentException | NullPointerException e) {
                tmdb.setMediaType(MediaType.MOVIE);
            }
            return tmdb;
        }).toList();
    }

    private List<String> prepareCombinedTexts(List<JsonNode> details) {
        return details.stream().map(detail -> {
            String sb = detail.path("title").asText("") +
                    " " + detail.path("name").asText("") +
                    " " + detail.path("overview").asText("") +
                    " " + repeatWords(detail, "genres", 30) +
                    " " + repeatWords(detail, "keywords", 5) +
                    " " + repeatTopCast(detail) +
                    " " + repeatDirectors(detail);
            return sb.trim();
        }).toList();
    }

    private String repeatWords(JsonNode node, String key, int repeat) {
        if (node.has(key) && node.get(key).isArray()) {
            List<String> words = new ArrayList<>();
            for (JsonNode child : node.get(key)) words.add(child.path("name").asText(""));
            return String.join(" ", Collections.nCopies(repeat, String.join(" ", words)));
        }
        return "";
    }

    private String repeatTopCast(JsonNode node) {
        if (node.has("cast") && node.get("cast").isArray()) {
            List<String> cast = new ArrayList<>();
            for (JsonNode castNode : node.get("cast")) {
                if (cast.size() >= 5) break;
                cast.add(castNode.path("name").asText(""));
            }
            return String.join(" ", Collections.nCopies(10, String.join(" ", cast)));
        }
        return "";
    }

    private String repeatDirectors(JsonNode node) {
        if (node.has("crew") && node.get("crew").isArray()) {
            List<String> directors = new ArrayList<>();
            for (JsonNode crew : node.get("crew")) {
                if ("Director".equals(crew.path("job").asText(""))) {
                    directors.add(crew.path("name").asText(""));
                }
            }
            return String.join(" ", Collections.nCopies(15, String.join(" ", directors)));
        }
        return "";
    }
}