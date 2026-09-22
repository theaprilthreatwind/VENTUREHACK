package com.example.ent.repository;

import com.example.ent.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTopicId(Long topicId);

    @Query(value = "select * from questions where topic_id = :topicId order by random() limit :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByTopic(@Param("topicId") Long topicId, @Param("limit") int limit);
}