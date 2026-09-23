package com.example.ent.dto;

import java.util.List;

public record QuestionResponseDto(Long questionId, String description, String explanation, String type, String difficulty, List<Long> optionIds) {
}