package com.example.ent.dto;

public record AnalyticsResponseDto(Long totalSolved, Double successRate, Double scoreGoal, Long userId, Long topicId) {
}
