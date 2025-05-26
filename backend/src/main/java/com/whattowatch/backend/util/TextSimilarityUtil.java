package com.whattowatch.backend.util;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.en.EnglishAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;

import java.io.IOException;
import java.io.StringReader;
import java.util.*;

public class TextSimilarityUtil {

    private static final Analyzer ANALYZER = new EnglishAnalyzer();

    private static List<String> preprocess(String text) {
        List<String> tokens = new ArrayList<>();
        if (text == null || text.isEmpty()) return tokens;

        try (TokenStream tokenStream = ANALYZER.tokenStream(null, new StringReader(text))) {
            CharTermAttribute attr = tokenStream.addAttribute(CharTermAttribute.class);
            tokenStream.reset();

            while (tokenStream.incrementToken()) {
                tokens.add(attr.toString());
            }
            tokenStream.end();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return tokens;
    }

    public static Map<String, Double> tf(String document) {
        List<String> tokens = preprocess(document);
        Map<String, Double> termCounts = new HashMap<>();

        for (String token : tokens) {
            termCounts.put(token, termCounts.getOrDefault(token, 0.0) + 1.0);
        }

        int totalTokens = tokens.isEmpty() ? 1 : tokens.size();
        termCounts.replaceAll((term, count) -> count / totalTokens);

        return termCounts;
    }

    public static Map<String, Double> idf(List<String> documents) {
        Map<String, Integer> docFreq = new HashMap<>();
        int totalDocs = documents.size();

        for (String doc : documents) {
            Set<String> uniqueTerms = new HashSet<>(preprocess(doc));
            for (String term : uniqueTerms) {
                docFreq.put(term, docFreq.getOrDefault(term, 0) + 1);
            }
        }

        Map<String, Double> idfMap = new HashMap<>();
        for (Map.Entry<String, Integer> entry : docFreq.entrySet()) {
            double idfValue = Math.log(1.0 + ((double) totalDocs) / (1.0 + entry.getValue()));
            idfMap.put(entry.getKey(), idfValue);
        }

        return idfMap;
    }

    public static Map<String, Double> tfIdf(String document, Map<String, Double> idfMap) {
        Map<String, Double> tfMap = tf(document);
        Map<String, Double> tfIdfMap = new HashMap<>();

        double defaultIdf = Math.log(1.0 + idfMap.size() + 1);

        for (Map.Entry<String, Double> entry : tfMap.entrySet()) {
            String term = entry.getKey();
            double tf = entry.getValue();
            double idf = idfMap.getOrDefault(term, defaultIdf);
            double tfIdfScore = tf * idf;

            if (tfIdfScore > 1e-6) {
                tfIdfMap.put(term, tfIdfScore);
            }
        }

        return tfIdfMap;
    }

    public static double cosineSimilarity(Map<String, Double> vec1, Map<String, Double> vec2) {
        if (vec1 == null || vec2 == null || vec1.isEmpty() || vec2.isEmpty()) {
            return 0.0;
        }

        double dotProduct = 0.0;
        double normVec1 = 0.0;
        double normVec2;

        Map<String, Double> smaller = vec1.size() < vec2.size() ? vec1 : vec2;
        Map<String, Double> larger = smaller == vec1 ? vec2 : vec1;

        for (Map.Entry<String, Double> entry : smaller.entrySet()) {
            String term = entry.getKey();
            double val1 = entry.getValue();
            double val2 = larger.getOrDefault(term, 0.0);

            dotProduct += val1 * val2;
            normVec1 += val1 * val1;
        }

        normVec2 = larger.values().stream().mapToDouble(v -> v * v).sum();

        if (normVec1 == 0.0 || normVec2 == 0.0) return 0.0;

        return dotProduct / (Math.sqrt(normVec1) * Math.sqrt(normVec2));
    }
}