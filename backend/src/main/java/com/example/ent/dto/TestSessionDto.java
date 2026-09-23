package com.example.ent.dto;

import com.example.ent.entity.Question;

import java.util.List;

public record TestSessionDto(Long attemptId, List<Question> questions) {

}
