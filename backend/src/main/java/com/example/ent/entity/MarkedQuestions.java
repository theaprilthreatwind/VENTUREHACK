package com.example.ent.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "marked_questions",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"topic_id", "question_id"})
        })
@Getter
@Setter
@RequiredArgsConstructor
public class MarkedQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;
}
