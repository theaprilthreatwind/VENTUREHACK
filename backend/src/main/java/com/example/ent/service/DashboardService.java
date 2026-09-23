package com.example.ent.service;

import com.example.ent.entity.Topic;
import com.example.ent.entity.User;
import com.example.ent.entity.UserTopicStats;
import com.example.ent.repository.TopicRepository;
import com.example.ent.repository.UserRepository;
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
}