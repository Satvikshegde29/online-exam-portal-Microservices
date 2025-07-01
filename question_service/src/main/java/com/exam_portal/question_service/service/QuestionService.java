package com.exam_portal.question_service.service;

<<<<<<< HEAD
import com.examportal.common.dto.QuestionDTO;
=======
import com.exam_portal.question_service.model.Question;
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7

import java.util.List;

public interface QuestionService {
<<<<<<< HEAD
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO);
    void deleteQuestion(Long id);
    QuestionDTO getQuestionById(Long id);
    List<QuestionDTO> getAllQuestions();
    void importQuestions(List<QuestionDTO> questions);
    List<QuestionDTO> exportQuestions();
=======
    Question createQuestion(Question question);
    Question updateQuestion(Long id, Question questionDetails);
    void deleteQuestion(Long id);
    Question getQuestionById(Long id);
    List<Question> getAllQuestions();
    void importQuestions(List<Question> questions);
    List<Question> exportQuestions();
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
}