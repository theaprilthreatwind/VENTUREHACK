package com.example.ent.service;

import com.example.ent.dto.CreateSessionRequest;
import com.example.ent.dto.TestResultDto;
import com.example.ent.dto.TestSessionDto;
import com.example.ent.entity.*;
import com.example.ent.enums.TestStatus;
import com.example.ent.exceptions.TestNotFoundException;
import com.example.ent.exceptions.UserNotFoundException;
import com.example.ent.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestAttemptRepository testAttemptRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserTopicStatsRepository statsRepository;
    private final UserRepository userRepository;
    private final DashboardService dashboardService;

    @Transactional
    public TestSessionDto startTest(Long userId, CreateSessionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Пользователь не найден"));

        TestAttempt attempt = new TestAttempt();
        attempt.setUser(user);
        attempt.setStatus(TestStatus.IN_PROGRESS);
        attempt.setStartedAt(LocalDateTime.now());
        attempt = testAttemptRepository.save(attempt);

        List<Question> questions = generateQuestionsForSession(userId, request);

        return new TestSessionDto(attempt.getId(), questions);
    }

    @Transactional
    public TestSessionDto startSmartAdaptiveTest(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Пользователь не найден"));

        List<Long> weakTopicIds = statsRepository.findTop3ByUserIdOrderBySuccessRateAsc(userId)
                .stream()
                .map(stats -> stats.getTopic().getId())
                .toList();

        if (weakTopicIds.isEmpty()) {
            throw new IllegalStateException("Недостаточно данных для умного теста. Решите хотя бы пару обычных тестов");
        }

        TestAttempt attempt = new TestAttempt();
        attempt.setUser(user);
        attempt.setStatus(TestStatus.IN_PROGRESS);
        attempt.setStartedAt(LocalDateTime.now());
        attempt = testAttemptRepository.save(attempt);

        List<Question> questions = questionRepository.findRandomByTopicIds(weakTopicIds, 20);

        return new TestSessionDto(attempt.getId(), questions);
    }

    @Transactional
    public UserAnswer submitAnswer(Long attemptId, Long questionId, Long optionId) {
        TestAttempt attempt = testAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Сессия не найдена"));

        if (attempt.getStatus() != TestStatus.IN_PROGRESS) {
            throw new IllegalStateException("Этот тест уже завершен!");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Вопрос не найден"));

        Option selectedOption = optionRepository.findById(optionId)
                .orElseThrow(() -> new IllegalArgumentException("Вариант ответа не найден"));

        boolean isCorrect = selectedOption.isCorrect();

        UserAnswer answer = new UserAnswer();
        answer.setTestAttempt(attempt);
        answer.setQuestion(question);
        answer.setOption(selectedOption);
        answer.setCorrect(isCorrect);
        userAnswerRepository.save(answer);

        Long userId = attempt.getUser().getId();
        Long topicId = question.getTopic().getId();

        dashboardService.incrementStatsAfterAnswer(userId, topicId, isCorrect);
        return userAnswerRepository.save(answer);
    }

    @Transactional
    public TestResultDto finishTest(Long attemptId) {
        TestAttempt attempt = testAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Сессия не найдена: " + attemptId));

        if (attempt.getStatus() == TestStatus.SUBMITTED) {
            List<UserAnswer> existingAnswers = userAnswerRepository.findByTestAttemptId(attemptId);
            long totalQ = existingAnswers.size();
            long correctA = existingAnswers.stream().filter(UserAnswer::isCorrect).count();
            return new TestResultDto(totalQ, correctA, attempt.getStartedAt(), attempt.getFinishedAt());
        }

        attempt.setStatus(TestStatus.SUBMITTED);
        attempt.setFinishedAt(LocalDateTime.now());
        testAttemptRepository.save(attempt);

        List<UserAnswer> answers = userAnswerRepository.findByTestAttemptId(attemptId);

        long totalQuestions = answers.size();
        long correctAnswers = answers.stream().filter(UserAnswer::isCorrect).count();

        User user = userRepository.findById(attempt.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("Пользователь не найден"));

        Map<Topic, List<UserAnswer>> answersByTopic = answers.stream()
                .collect(Collectors.groupingBy(a -> a.getQuestion().getTopic()));

        for (Map.Entry<Topic, List<UserAnswer>> entry : answersByTopic.entrySet()) {
            updateUserStats(user, entry.getKey(), entry.getValue());
        }

        return new TestResultDto(totalQuestions, correctAnswers, attempt.getStartedAt(), attempt.getFinishedAt());
    }


    private void updateUserStats(User user, Topic topic, List<UserAnswer> topicAnswers) {
        long topicTotal = topicAnswers.size();
        long topicCorrect = topicAnswers.stream().filter(UserAnswer::isCorrect).count();

        UserTopicStats stats = statsRepository.findByUserIdAndTopicId(user.getId(), topic.getId())
                .orElseGet(() -> {
                    UserTopicStats newStats = new UserTopicStats();
                    newStats.setUser(user);
                    newStats.setTopic(topic);
                    newStats.setTotalSolved(0L);
                    newStats.setCorrectAnswers(0L);
                    return newStats;
                });

        stats.setTotalSolved(stats.getTotalSolved() + topicTotal);
        stats.setCorrectAnswers(stats.getCorrectAnswers() + topicCorrect);

        double successRate = ((double) stats.getCorrectAnswers() / stats.getTotalSolved()) * 100;
        stats.setSuccessRate(Math.round(successRate * 100.0) / 100.0);

        statsRepository.save(stats);
    }
    private List<Question> generateQuestionsForSession(Long userId, CreateSessionRequest request) {
        List<Long> topicIds = request.topicIds();
        int count = request.questionsCount();

        List<String> difficultyStrings = null;
        if (request.difficulties() != null && !request.difficulties().isEmpty()) {
            difficultyStrings = request.difficulties().stream()
                    .map(Enum::name)
                    .collect(Collectors.toList());
        }

        return questionRepository.findQuestionsForSession(topicIds, difficultyStrings, count);
    }

    @Transactional
    public TestAttempt updateTestStatus(Long attemptId, String statusStr) {
        TestAttempt attempt = testAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new TestNotFoundException("Тестовая попытка с ID " + attemptId + " не найдена"));

        TestStatus newStatus = TestStatus.valueOf(statusStr.toUpperCase());
        attempt.setStatus(newStatus);

        if (newStatus == TestStatus.SUBMITTED || newStatus == TestStatus.CANCELLED) {
            attempt.setFinishedAt(LocalDateTime.now());
        }

        return testAttemptRepository.save(attempt);
    }
}
