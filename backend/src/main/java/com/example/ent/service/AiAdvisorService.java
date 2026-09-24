package com.example.ent.service;

import com.example.ent.entity.Option;
import com.example.ent.entity.Question;
import com.example.ent.entity.Topic;
import com.example.ent.entity.UserStats;
import com.example.ent.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiAdvisorService {

    private final TopicRepository topicRepository;
    private final ChatClient chatClient;

    public String explainMistake(Question question, String userWrongAnswer) {
        String promptTemplate = """
                Ты — опытный репетитор по предмету "{subject}".
                Ученик ошибся в вопросе: "{questionText}"
                Он выбрал ответ: "{wrongAnswer}"
                Правильный ответ: "{correctAnswer}"
                
                Кратко, в 2-3 предложениях, объясни, почему его ответ неверный и в чем логика правильного ответа. 
                Не ругай ученика, будь поддерживающим. Если ученик не дал ответ, просто раскрой логику правильного.
                Максимум - 250 символов.
                """;

        String correctAnswerText = question.getOptions().stream()
                .filter(Option::isCorrect)
                .findFirst()
                .map(Option::getText)
                .orElse("Неизвестно");

        String safeWrongAnswer = (userWrongAnswer != null && !userWrongAnswer.isBlank())
                ? userWrongAnswer
                : "Ответ не предоставлен";

        return chatClient.prompt()
                .system("Ты доброжелательный ИИ-репетитор ЕНТ.")
                .user(u -> u.text(promptTemplate)
                        .param("subject", question.getTopic().getSubject().getTitle())
                        .param("questionText", question.getTitle())
                        .param("wrongAnswer", safeWrongAnswer)
                        .param("correctAnswer", correctAnswerText))
                .call()
                .content();
    }

    public String generateStudyPlan(UserStats stats, Long daysUntilExam, List<Long> weakTopics) {
        List<String> topics = weakTopics
                .stream()
                .map(id -> topicRepository.findById(id).map(Topic::getTitle).orElse("Неизвестная тема"))
                .toList();

        String promptTemplate = """
                Составь краткий персональный план подготовки к экзамену.
                Вводные данные:
                - До экзамена осталось дней: {days}
                - Всего решено вопросов: {totalSolved}
                - Текущий процент успеха: {successRate}%
                - Слабые темы ученика: {weakTopics}
                
                Дай 3 конкретных совета на ближайшую неделю в формате маркированного списка.
                Максимум 250 символов. 
                Будь лаконичным, пиши без лишних вступлений.
                """;

        return chatClient.prompt()
                .user(u -> u.text(promptTemplate)
                        .param("days", daysUntilExam != null ? daysUntilExam : "Неизвестно")
                        .param("totalSolved", stats.getTotalQuestionsSolved())
                        .param("successRate", stats.getOverallSuccessRate())
                        .param("weakTopics", String.join(", ", topics)))
                .call()
                .content();
    }
}