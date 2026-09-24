package com.example.ent.dto;

public record UserStatsDto(Long id,
                           Long userId,
                           Long totalTestsSolved,
                           Long totalQuestionsSolved,
                           Long correctAnswers,
                           Double overallSuccessRate) {
}
