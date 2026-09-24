package com.example.ent.controller;

import com.example.ent.dto.AnswerSubmitDto;
import com.example.ent.dto.CreateSessionRequest;
import com.example.ent.dto.TestResultDto;
import com.example.ent.dto.TestSessionDto;
import com.example.ent.entity.*;
import com.example.ent.service.DashboardService;
import com.example.ent.service.TestService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practice-page")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    private final TestService testService;
    private final DashboardService dashboardService;

    @PostMapping("/start")
    public TestSessionDto startTest(@RequestParam Long userId,
                                    @RequestBody CreateSessionRequest sessionRequest,
                                    HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.startTest(userId, sessionRequest);
    }

    @PostMapping("/start/adaptive")
    public TestSessionDto startAdaptiveTest(@RequestParam Long userId,
                                            HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.startSmartAdaptiveTest(userId);
    }

    @PostMapping("/{attemptId}/answers")
    public UserAnswer submitAnswer(@PathVariable Long attemptId,
                                   @RequestBody AnswerSubmitDto answerRequest,
                                   HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.submitAnswer(attemptId, answerRequest.questionId(), answerRequest.optionId());
    }

    @PostMapping("/{attemptId}/finish")
    public TestResultDto finishTest(@PathVariable Long attemptId,
                                    HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return testService.finishTest(attemptId);
    }

    @PatchMapping("/{id}/status")
    public TestAttempt updateTestStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return testService.updateTestStatus(id, status);
    }
}
