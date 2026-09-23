package com.example.ent.service;

import com.example.ent.dto.SubjectOverviewDto;
import com.example.ent.dto.TopicOverviewDto;
import com.example.ent.entity.Subject;
import com.example.ent.entity.Topic;
import com.example.ent.repository.QuestionRepository;
import com.example.ent.repository.SubjectRepository;
import com.example.ent.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final QuestionRepository questionRepository;
    private final TopicRepository topicRepository;

    @Transactional(readOnly = true)
    public List<SubjectOverviewDto> getSubjectsOverview() {
        List<Subject> subjects = subjectRepository.findAll();

        return subjects.stream().map(subject -> {
            long totalSubjectQuestions = questionRepository.countByTopicSubjectId(subject.getId());

            List<TopicOverviewDto> topics = topicRepository.findBySubjectId(subject.getId()).stream()
                    .map(topic -> new TopicOverviewDto(
                            topic.getId(),
                            topic.getTitle(),
                            questionRepository.countByTopicId(topic.getId())
                    ))
                    .collect(Collectors.toList());

            return new SubjectOverviewDto(
                    subject.getId(),
                    subject.getTitle(),
                    subject.getCategory(),
                    totalSubjectQuestions,
                    topics
            );
        }).collect(Collectors.toList());
    }
}