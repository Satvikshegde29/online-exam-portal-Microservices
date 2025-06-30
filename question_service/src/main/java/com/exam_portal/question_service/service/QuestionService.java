package com.exam_portal.question_service.service;

import com.exam_portal.question_service.model.Question;

import java.util.List;

public interface QuestionService {
    Question createQuestion(Question question);
    Question updateQuestion(Long id, Question questionDetails);
    void deleteQuestion(Long id);
    Question getQuestionById(Long id);
    List<Question> getAllQuestions();
    void importQuestions(List<Question> questions);
    List<Question> exportQuestions();
}