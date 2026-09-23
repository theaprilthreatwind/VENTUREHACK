package com.example.ent.repository;

import com.example.ent.entity.UserTopicStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserTopicStatsRepository extends JpaRepository<UserTopicStats, Long> {
    Optional<UserTopicStats> findByUserIdAndTopicId(Long userId, Long topicId);
    List<UserTopicStats> findTop3ByUserIdOrderBySuccessRateAsc(Long userId);
}
