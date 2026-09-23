package com.example.ent.repository;

import com.example.ent.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    // Eager fetch question + topic за один запрос — избегаем LazyInitializationException
    @Query("SELECT ua FROM UserAnswer ua " +
           "JOIN FETCH ua.question q " +
           "JOIN FETCH q.topic " +
           "WHERE ua.testAttempt.id = :attemptId")
    List<UserAnswer> findByTestAttemptId(@Param("attemptId") Long attemptId);
}
