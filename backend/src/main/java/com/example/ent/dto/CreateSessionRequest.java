package com.example.ent.dto;

import com.example.ent.enums.Difficulty;

import java.util.List;

public record CreateSessionRequest(
        List<Long> topicIds,
        int questionsCount,
        List<Difficulty> difficulties,
        String answerStatus,
        boolean isRepetition) {
}