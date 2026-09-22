package com.example.ent.entity;

import com.example.ent.enums.SubjectCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "subjects")
@Getter
@Setter
@RequiredArgsConstructor
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Название предмета не может быть пустым")
    private String title;

    @Enumerated(value = EnumType.STRING)
    private SubjectCategory category;
}
