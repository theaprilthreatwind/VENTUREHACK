package com.example.ent.dto;

public record OptionResponseDto(Long id,
                                String text,
                                boolean isCorrect,
                                String type,
                                Long questionId) {
}
