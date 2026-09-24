package com.example.ent.controller;

import com.example.ent.dto.TargetScoreDto;
import com.example.ent.dto.UserStatsDto;
import com.example.ent.service.DashboardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {
    private final DashboardService dashboardService;

    @PutMapping("/{userId}/topics/{topicId}/target-score")
    public void setTargetScore(@PathVariable Long userId,
                               @PathVariable Long topicId,
                               @RequestBody TargetScoreDto targetScore,
                               HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        dashboardService.updateTargetScore(userId, topicId, targetScore.scoreGoal());
    }

    @GetMapping("/{userId}/stats")
    public UserStatsDto getStats(@PathVariable Long userId,
                                 HttpServletRequest request) {
        log.info("Выполнен запрос по эндпоинту: '{} {}', Строка параметров запроса: '{}'", request.getMethod(), request.getRequestURI(), request.getQueryString());
        return dashboardService.getUserStats(userId);
    }

    @GetMapping("/study-plan")
    public String generatePlan(
            @RequestParam Long userId,
            @RequestParam(required = false) Long daysUntilExam) {

        String aiResponse = dashboardService.getStudyPlanForUser(userId, daysUntilExam);

        return aiResponse;
    }
}