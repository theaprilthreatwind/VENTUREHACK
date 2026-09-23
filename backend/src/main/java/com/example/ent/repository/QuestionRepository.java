package com.example.ent.repository;

import com.example.ent.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTopicId(Long topicId);
    long countByTopicId(Long topicId);
    long countByTopicSubjectId(Long subjectId);

    @Query(value = "select * from questions where topic_id = :topicId order by random() limit :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByTopic(@Param("topicId") Long topicId, @Param("limit") int limit);

    @Query(value = "select * from questions q " +
            "where q.topic_id in (:topicIds) " +
            "and (:difficulties is null or q.difficulty in (:difficulties)) " +
            "order by RANDOM() limit :limit", nativeQuery = true)
    List<Question> findQuestionsForSession(@Param("topicIds") List<Long> topicIds,
                                 @Param("difficulties") List<String> difficulties,
                                 @Param("limit") int limit);

    @Query("select q FROM Question q where " +
            "(:subjectId is null or q.topic.subject.id = :subjectId) and " +
            "(:difficulty is null or q.difficulty = :difficulty) and " +
            "(COALESCE(:topicIds, null) is null or q.topic.id in :topicIds)")
    Page findFilteredQuestions(
            @Param("subjectId") Long subjectId,
            @Param("topicIds") List<Long> topicIds,
            @Param("difficulty") String difficulty,
            Pageable pageable
    );
}