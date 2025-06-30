package com.exam_portal.question_service.service.impl;

import com.exam_portal.question_service.model.Question;
import com.exam_portal.question_service.repository.QuestionRepository;
import com.exam_portal.question_service.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long id, Question questionDetails) {
        return questionRepository.findById(id)
                .map(question -> {
                    question.setText(questionDetails.getText());
                    question.setCategory(questionDetails.getCategory());
                    question.setDifficulty(questionDetails.getDifficulty());
                    question.setCorrectAnswer(questionDetails.getCorrectAnswer());
                    return questionRepository.save(question);
                })
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    @Override
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public void importQuestions(List<Question> questions) {
        questionRepository.saveAll(questions);
    }

    @Override
    public List<Question> exportQuestions() {
        return questionRepository.findAll();
    }
}