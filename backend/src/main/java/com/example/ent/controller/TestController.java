package com.example.ent.controller;

import com.example.ent.dto.TestResultDto;
import com.example.ent.dto.TestSessionDto;
import com.example.ent.entity.*;
import com.example.ent.service.TestService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/practice_page")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    private final TestService testService;

    @PostMapping("/{userId}/{topicId}/")
    public TestSessionDto startTest(@PathVariable Long userId, @PathVariable Long topicId, @RequestParam int questionsCount, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.startTest(userId, topicId, questionsCount);
    }

    @PostMapping("/{attemptId}/{questionId}/{optionId}")
    public UserAnswer submitAnswer(@PathVariable Long attemptId, @PathVariable Long questionId, @PathVariable Long optionId, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.submitAnswer(attemptId, questionId, optionId);
    }

    @PostMapping("/finish/{attemptId}")
    public TestResultDto finishTest(@PathVariable Long attemptId, HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.finishTest(attemptId);
    }
}
