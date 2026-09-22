package com.example.ent.controller;

import com.example.ent.dto.SubjectOverviewDto;
import com.example.ent.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping("/overview")
    public List<SubjectOverviewDto> getOverview() {
        return subjectService.getSubjectsOverview();
    }
}