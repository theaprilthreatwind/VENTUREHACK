package com.example.ent.dto;

import java.time.LocalDateTime;

public record TestResultDto(long totalQuestions, long correctAnswers, LocalDateTime startedAt, LocalDateTime finishedAt) {
}
