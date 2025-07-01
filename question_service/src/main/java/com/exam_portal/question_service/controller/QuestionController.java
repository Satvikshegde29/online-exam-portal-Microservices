package com.exam_portal.question_service.controller;

import com.exam_portal.question_service.model.Question;
import com.exam_portal.question_service.service.QuestionService;
<<<<<<< HEAD
import com.examportal.common.dto.QuestionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
<<<<<<< HEAD
@PreAuthorize("hasRole('ADMIN')") // All endpoints require admin
=======
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Create a new question
    @PostMapping
<<<<<<< HEAD
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.ok(questionService.createQuestion(questionDTO));
=======
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
    }

    // Get all questions
    @GetMapping
<<<<<<< HEAD
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
=======
    public ResponseEntity<List<Question>> getAllQuestions() {
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // Get a question by ID
    @GetMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
=======
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
        try {
            return ResponseEntity.ok(questionService.getQuestionById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a question by ID
    @PutMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        try {
            return ResponseEntity.ok(questionService.updateQuestion(id, questionDTO));
=======
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question questionDetails) {
        try {
            return ResponseEntity.ok(questionService.updateQuestion(id, questionDetails));
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a question by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Import questions in bulk
    @PostMapping("/import")
<<<<<<< HEAD
    public ResponseEntity<Void> importQuestions(@RequestBody List<QuestionDTO> questions) {
=======
    public ResponseEntity<Void> importQuestions(@RequestBody List<Question> questions) {
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
        questionService.importQuestions(questions);
        return ResponseEntity.ok().build();
    }

    // Export questions in bulk
    @GetMapping("/export")
<<<<<<< HEAD
    public ResponseEntity<List<QuestionDTO>> exportQuestions() {
=======
    public ResponseEntity<List<Question>> exportQuestions() {
>>>>>>> cd9d10376ca8453da5f74067d8fdee8b04454de7
        return ResponseEntity.ok(questionService.exportQuestions());
    }
}