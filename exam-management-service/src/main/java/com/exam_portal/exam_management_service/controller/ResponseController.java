package com.exam_portal.exam_management_service.controller;

import com.exam_portal.exam_management_service.model.Response;
import com.exam_portal.exam_management_service.service.ResponseService;
import com.examportal.common.dto.QuestionDTO;
import com.examportal.common.dto.ResultDTO;
import com.exam_portal.exam_management_service.model.Result;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.examportal.common.dto.ExamDTO;
import com.exam_portal.exam_management_service.client.ExamClient;
import com.examportal.common.security.JwtUtil;
import com.examportal.common.exception.ResourceNotFoundException;
import com.exam_portal.exam_management_service.client.QuestionClient;
import com.exam_portal.exam_management_service.repository.ResultRepository;
import com.exam_portal.exam_management_service.repository.ResponseRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/responses")
@RequiredArgsConstructor
public class ResponseController {

    private final ResponseService responseService;
    private final ExamClient examClient;
    private final JwtUtil jwtUtil;
    private final QuestionClient questionClient;
    private final ResultRepository resultRepository;
    private final ResponseRepository responseRepository;

    
    @GetMapping("/exams")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'EXAMINER')")
    public ResponseEntity<List<ExamDTO>> getAllExams() {
        return ResponseEntity.ok(examClient.getAllExams());
    }

    @GetMapping("/exams/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'EXAMINER')")
    public ResponseEntity<ExamDTO> getExamById(@PathVariable("id") Long examId) {
        ExamDTO exam = examClient.getExamById(examId);
        return ResponseEntity.ok(exam);
    }

    @PostMapping("/save-response")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'EXAMINER')")
    public ResponseEntity<Response> saveResponse(
            @RequestBody Response response,
            @RequestHeader("Authorization") String tokenHeader
    ) {
        // Extract the token from the Authorization header
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7) : tokenHeader;

        // Extract userId from the token
        Long userId = jwtUtil.extractUserId(token);

        if (userId == null) {
            throw new IllegalStateException("User ID could not be extracted from the token.");
        }

        // Validate examId
        ExamDTO exam = examClient.getExamById(response.getExamId());
        if (exam == null) {
            throw new ResourceNotFoundException("Exam with ID " + response.getExamId() + " not found.");
        }

        // Validate questionId
        QuestionDTO question = questionClient.getQuestionById(response.getQuestionId());
        if (question == null) {
            throw new ResourceNotFoundException("Question with ID " + response.getQuestionId() + " not found.");
        }

        // Set the userId in the response
        response.setUserId(userId);

        // Save the response
        Response savedResponse = responseService.saveResponse(response);

        return ResponseEntity.ok(savedResponse);
    }

    @PostMapping("/submit-exam/{examId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'EXAMINER')")
    public ResponseEntity<Result> submitExam(
            @PathVariable Long examId,
            @RequestHeader("Authorization") String tokenHeader
    ) {
        // Extract the token from the Authorization header
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7) : tokenHeader;

        // Extract userId from the token
        Long userId = jwtUtil.extractUserId(token);

        if (userId == null) {
            throw new IllegalStateException("User ID could not be extracted from the token.");
        }

        // Check if the user has already submitted this exam
        Optional<Result> existingResult = resultRepository.findByExamIdAndUserId(examId, userId);
        if (existingResult.isPresent()) {
            throw new IllegalStateException("You have already submitted this exam.");
        }

        // Fetch all responses for the user and exam
        List<Response> responses = responseRepository.findByExamIdAndUserId(examId, userId);

        if (responses.isEmpty()) {
            throw new IllegalStateException("No responses found for this exam.");
        }

        // Calculate total marks obtained
        double totalMarksObtained = responses.stream()
                .mapToDouble(Response::getMarksObtained)
                .sum();

        // Fetch total marks for the exam
        ExamDTO exam = examClient.getExamById(examId);
        double totalMarks = exam.getTotalMarks();

        // Save the result
        Result result = new Result();
        result.setExamId(examId);
        result.setUserId(userId);
        result.setTotalMarks(totalMarks);
        result.setMarksObtained(totalMarksObtained);
        resultRepository.save(result);

        // Mark all responses as submitted
        responses.forEach(response -> response.setSubmitted(true));
        responseRepository.saveAll(responses);

        return ResponseEntity.ok(result);
    }
}
