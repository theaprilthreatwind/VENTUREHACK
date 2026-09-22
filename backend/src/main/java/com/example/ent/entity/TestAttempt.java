package com.example.ent.entity;

import com.example.ent.enums.TestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "test_attempts")
@Getter
@Setter
@RequiredArgsConstructor
public class TestAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long duration;

    @DateTimeFormat(pattern = "YYYY.MM.dd")
    private LocalDateTime startedAt;

    @@DateTimeFormat(pattern = "YYYY.MM.dd")
    private LocalDateTime finishedAt;

    @Enumerated(value = EnumType.STRING)
    private TestStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
