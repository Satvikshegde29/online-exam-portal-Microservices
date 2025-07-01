package com.exam_portal.question_service.service.impl;

import com.exam_portal.question_service.model.Question;
import com.exam_portal.question_service.repository.QuestionRepository;
import com.exam_portal.question_service.service.QuestionService;
<<<<<<< HEAD
import com.examportal.common.dto.QuestionDTO;
=======
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
<<<<<<< HEAD
    @Autowired
    private QuestionRepository questionRepository;

    private QuestionDTO mapToDTO(Question question) {
        return new QuestionDTO(
            question.getQuestionId(),
            question.getText(),
            question.getCategory(),
            question.getDifficulty(),
            question.getCorrectAnswer()
        );
    }

    private Question mapToEntity(QuestionDTO dto) {
        return new Question(
            dto.getQuestionId(),
            dto.getText(),
            dto.getCategory(),
            dto.getDifficulty(),
            dto.getCorrectAnswer()
        );
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = mapToEntity(questionDTO);
        question.setQuestionId(null); // Ensure ID is not set
        return mapToDTO(questionRepository.save(question));
    }

    @Override
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        return questionRepository.findById(id)
            .map(existing -> {
                existing.setText(questionDTO.getText());
                existing.setCategory(questionDTO.getCategory());
                existing.setDifficulty(questionDTO.getDifficulty());
                existing.setCorrectAnswer(questionDTO.getCorrectAnswer());
                return mapToDTO(questionRepository.save(existing));
            })
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
=======

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
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
    }

    @Override
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    @Override
<<<<<<< HEAD
    public QuestionDTO getQuestionById(Long id) {
        return questionRepository.findById(id)
            .map(this::mapToDTO)
            .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    @Override
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream().map(this::mapToDTO).toList();
    }

    @Override
    public void importQuestions(List<QuestionDTO> questions) {
        List<Question> entities = questions.stream().map(this::mapToEntity).toList();
        questionRepository.saveAll(entities);
    }

    @Override
    public List<QuestionDTO> exportQuestions() {
        return questionRepository.findAll().stream().map(this::mapToDTO).toList();
=======
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
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
    }
}