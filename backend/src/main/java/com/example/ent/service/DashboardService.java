package com.example.ent.service;

import com.example.ent.dto.AnalyticsResponseDto;
import com.example.ent.dto.UserStatsDto;
import com.example.ent.entity.Topic;
import com.example.ent.entity.User;
import com.example.ent.entity.UserStats;
import com.example.ent.entity.UserTopicStats;
import com.example.ent.exceptions.UserNotFoundException;
import com.example.ent.repository.TopicRepository;
import com.example.ent.repository.UserRepository;
import com.example.ent.repository.UserStatsRepository;
import com.example.ent.repository.UserTopicStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserTopicStatsRepository statsRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final UserStatsRepository userStatsRepository;

    @Transactional
    public void updateTargetScore(Long userId, Long topicId, Double newScoreGoal) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Пользователь не найден"));

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Тема не найдена"));

        UserTopicStats stats = statsRepository.findByUserIdAndTopicId(userId, topicId)
                .orElseGet(() -> {
                    UserTopicStats newStats = new UserTopicStats();
                    newStats.setUser(user);
                    newStats.setTopic(topic);
                    newStats.setTotalSolved(0L);
                    newStats.setCorrectAnswers(0L);
                    newStats.setSuccessRate(0.0);
                    return newStats;
                });

        stats.setScoreGoal(newScoreGoal);
        statsRepository.save(stats);
    }

    @Transactional(readOnly = true)
    public UserStatsDto getUserStats(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("Пользователь с ID " + userId + " не найден");
        }

        UserStats userStats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserStats stats = new UserStats();
                    stats.setUser(userRepository.getReferenceById(userId));
                    return stats;
                });
        return new UserStatsDto(
                userStats.getId(),
                userStats.getUser().getId(),
                userStats.getTotalTestsSolved(),
                userStats.getTotalQuestionsSolved(),
                userStats.getCorrectAnswers(),
                userStats.getOverallSuccessRate()
        );
    }

    @Transactional
    public void incrementStatsAfterAnswer(Long userId, Long topicId, boolean isCorrect) {

        UserStats userStats = userStatsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserStats stats = new UserStats();
                    stats.setUser(userRepository.getReferenceById(userId)); // getReferenceById не делает лишний SELECT
                    return stats;
                });

        userStats.setTotalQuestionsSolved(userStats.getTotalQuestionsSolved() + 1);
        if (isCorrect) {
            userStats.setCorrectAnswers(userStats.getCorrectAnswers() + 1);
        }
        userStats.setOverallSuccessRate(calculatePercentage(userStats.getCorrectAnswers(), userStats.getTotalQuestionsSolved()));
        userStatsRepository.save(userStats);

        UserTopicStats topicStats = statsRepository.findByUserIdAndTopicId(userId, topicId)
                .orElseGet(() -> {
                    UserTopicStats stats = new UserTopicStats();
                    stats.setUser(userRepository.getReferenceById(userId));
                    stats.setTopic(topicRepository.getReferenceById(topicId));
                    return stats;
                });

        topicStats.setTotalSolved(topicStats.getTotalSolved() + 1);
        if (isCorrect) {
            topicStats.setCorrectAnswers(topicStats.getCorrectAnswers() + 1);
        }
        topicStats.setSuccessRate(calculatePercentage(topicStats.getCorrectAnswers(), topicStats.getTotalSolved()));
        statsRepository.save(topicStats);
    }

    private Double calculatePercentage(Long correct, Long total) {
        if (total == null || total == 0) return 0.0;
        double rate = ((double) correct / total) * 100.0;
        return Math.round(rate * 100.0) / 100.0;
    }
}