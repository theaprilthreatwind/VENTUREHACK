package com.example.ent.repository;

import com.example.ent.entity.MarkedQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MarkedQuestionRepository extends JpaRepository<MarkedQuestion, Long> {
    Optional<MarkedQuestion> findByUserIdAndTopicId(Long userId, Long topicId);
    List<MarkedQuestion> findByUserId(Long userId);
}
