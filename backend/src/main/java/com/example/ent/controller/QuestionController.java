package com.example.ent.controller;

import com.example.ent.dto.OptionResponseDto;
import com.example.ent.dto.QuestionResponseDto;
import com.example.ent.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@Slf4j
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public List<QuestionResponseDto> getQuestions(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) List<Long> topicIds,
            @RequestParam(required = false) String difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());

        List<QuestionResponseDto> response = questionService.getQuestions(
                subjectId,
                topicIds,
                difficulty
        );
        return response;
    }

    @PatchMapping("/{id}/explanation")
    public QuestionResponseDto explainOption(
            @PathVariable Long id,
            @RequestParam Long optionId,
            HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        String wrongAnswer = questionService.getAnswer(optionId);
        QuestionResponseDto updatedQuestion = questionService.generateAndSaveExplanation(id, wrongAnswer);
        return updatedQuestion;
    }

    @GetMapping("/{id}")
    public QuestionResponseDto getQuestion(@PathVariable Long id,
                                           HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return questionService.getQuestion(id);
    }

    @GetMapping("/{id}/")
    public List<OptionResponseDto> getOptions(@PathVariable Long id,
                                              HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return questionService.getOptions(id);
    }

    @GetMapping("/{id}/{optionId}")
    public OptionResponseDto getOption(@PathVariable Long id,
                                       @PathVariable Long optionId,
                                       HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return questionService.getOption(id, optionId);
    }

    @PatchMapping("/{id}/photo-url")
    public QuestionResponseDto updateQuestionPhotoUrl(
            @PathVariable Long id,
            @RequestBody QuestionResponseDto questionResponseDto,
            HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        String photoUrl = questionResponseDto.photoUrl();
        return questionService.updateQuestionPhotoUrl(id, photoUrl);
    }
}