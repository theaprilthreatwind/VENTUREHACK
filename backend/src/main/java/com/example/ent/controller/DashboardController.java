package com.example.ent.controller;

import com.example.ent.dto.AnalyticsResponseDto;
import com.example.ent.dto.TargetScoreDto;
import com.example.ent.entity.UserStats;
import com.example.ent.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @PutMapping("/{userId}/topics/{topicId}/target-score")
    public void setTargetScore(@PathVariable Long userId,
                               @PathVariable Long topicId,
                               @RequestBody TargetScoreDto request) {
        dashboardService.updateTargetScore(userId, topicId, request.scoreGoal());
    }

    @GetMapping("/{userId}/stats")
    public UserStats getStats(@PathVariable Long userId) {
        UserStats stats = dashboardService.getUserStats(userId);
        return stats;
    }
}