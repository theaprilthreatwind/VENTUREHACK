package com.example.ent.dto;

import com.example.ent.enums.SubjectCategory;

import java.util.List;

public record SubjectOverviewDto(
        Long id,
        String title,
        SubjectCategory subject,
        long totalQuestions,
        List<TopicOverviewDto> topics
) {}