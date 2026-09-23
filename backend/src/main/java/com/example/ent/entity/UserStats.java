package com.example.ent.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_stats")
@Getter
@Setter
@RequiredArgsConstructor
public class UserStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @PositiveOrZero
    private Long totalTestsSolved = 0L;

    @PositiveOrZero
    private Long totalQuestionsSolved = 0L;

    @PositiveOrZero
    private Long correctAnswers = 0L;

    @PositiveOrZero
    private Double overallSuccessRate = 0.0;
}