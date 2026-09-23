package com.example.ent.service;

import com.example.ent.dto.QuestionResponseDto;
import com.example.ent.entity.Option;
import com.example.ent.entity.Question;
import com.example.ent.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getQuestions(Long subjectId, List<Long> topicIds, String difficulty, Pageable pageable) {

        List<Long> safeTopicIds = (topicIds != null && topicIds.isEmpty()) ? null : topicIds;

        Page<Question> questionsPage = questionRepository.findFilteredQuestions(
                subjectId,
                safeTopicIds,
                difficulty,
                pageable
        );

        return questionsPage.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public QuestionResponseDto updateQuestionPhotoUrl(Long questionId, String photoUrl) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Вопрос с ID " + questionId + " не найден"));

        question.setPhotoUrl(photoUrl);
        questionRepository.save(question);
        List<Option> options = question.getOptions();

        List<Long> optionIds = options.stream()
                .map(Option::getId)
                .toList();
        return new QuestionResponseDto(
                question.getId(),
                question.getTitle(),
                question.getExplanation(),
                String.valueOf(question.getType()),
                String.valueOf(question.getDifficulty()),
                question.getPhotoUrl(),
                optionIds
        );
    }

    private QuestionResponseDto mapToResponse(Question question) {
        List<Option> options = question.getOptions();

        List<Long> optionIds = options.stream()
                .map(Option::getId)
                .toList();
        return new QuestionResponseDto(question.getId(),
                question.getTitle(),
                question.getExplanation(),
                String.valueOf(question.getType()),
                String.valueOf(question.getDifficulty()),
                question.getPhotoUrl(),
                optionIds
        );
    }
}