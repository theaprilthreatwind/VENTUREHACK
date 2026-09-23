package com.example.ent.service;

import com.example.ent.dto.QuestionResponseDto;
import com.example.ent.entity.Option;
import com.example.ent.entity.Question;
import com.example.ent.repository.OptionRepository;
import com.example.ent.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AiAdvisorService advisorService;
    private final OptionRepository optionRepository;

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getQuestions(Long subjectId, List topicIds, String difficulty) {
        List<Long> safeTopicIds = (topicIds != null && topicIds.isEmpty()) ? null : topicIds;
        List<Question> questions = questionRepository.findFilteredQuestions(subjectId, safeTopicIds, difficulty);
        return questions.stream().map(QuestionService::mapToResponse).toList();
    }

    @Transactional
    public QuestionResponseDto updateQuestionPhotoUrl(Long questionId, String photoUrl) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Вопрос с ID " + questionId + " не найден"));

        question.setPhotoUrl(photoUrl);
        return mapToResponse(question);
    }

    @Transactional
    public QuestionResponseDto generateAndSaveExplanation(Long questionId, String userWrongAnswer) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Вопрос с ID " + questionId + " не найден"));

        String explanation = advisorService.explainMistake(question, userWrongAnswer);
        question.setExplanation(explanation);

        return mapToResponse(question);
    }

    public String getAnswer(Long optionId) {
        return optionRepository.findById(optionId).get().getText();
    }

    private static QuestionResponseDto mapToResponse(Question question) {
        List<Long> optionIds = question.getOptions().stream()
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
}