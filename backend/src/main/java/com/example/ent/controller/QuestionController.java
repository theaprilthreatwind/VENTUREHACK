package com.example.ent.controller;

import com.example.ent.dto.QuestionResponseDto;
import com.example.ent.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public List<QuestionResponseDto> getQuestions(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) List<Long> topicIds,
            @RequestParam(required = false) String difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        List<QuestionResponseDto> response = questionService.getQuestions(
                subjectId,
                topicIds,
                difficulty,
                PageRequest.of(page, size)
        );
        return response;
    }

    @PatchMapping("/{id}/photo-url")
    public QuestionResponseDto updateQuestionPhotoUrl(
            @PathVariable Long id,
            @RequestBody QuestionResponseDto questionResponseDto) {

        String photoUrl = questionResponseDto.photoUrl();
        return questionService.updateQuestionPhotoUrl(id, photoUrl);
    }
}