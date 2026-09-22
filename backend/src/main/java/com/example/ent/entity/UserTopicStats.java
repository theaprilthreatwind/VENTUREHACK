package com.example.ent.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "user_topic_stats",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "topic_id"})
        })
@Getter
@Setter
@RequiredArgsConstructor
public class UserTopicStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @PositiveOrZero
    @NotNull(message = "Amount of total solved questions on this topic can't be null")
    private Long totalSolved = 0L;

    @PositiveOrZero
    @NotNull(message = "Amount of correct answers on this topic can't be null")
    private Long correctAnswers = 0L;

    @PositiveOrZero
    @Max(100)
    @NotNull(message = "Success rate can't be null")
    private Double successRate = 0.0;

    @PositiveOrZero
    @Max(100)
    private Double scoreGoal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;
}
