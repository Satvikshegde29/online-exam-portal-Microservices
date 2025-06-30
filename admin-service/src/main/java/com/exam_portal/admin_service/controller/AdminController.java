package com.exam_portal.admin_service.controller;

import com.exam_portal.admin_service.client.AdminClient;
import com.exam_portal.admin_service.model.Exam;
import com.exam_portal.admin_service.repository.ExamRepository;
import com.examportal.common.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ExamRepository examRepository;
    private final AdminClient adminClient;

    // --- User Management ---

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers(HttpServletRequest request) {
        System.out.println("AdminController received: " + request.getHeader("Authorization"));
        return ResponseEntity.ok(adminClient.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> assignRole(@PathVariable Long id, @RequestParam String role) {
        return ResponseEntity.ok(adminClient.assignRole(id, role));
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(adminClient.getUserProfile(userId));
    }

    // --- Exam CRUD (local) ---

    @PostMapping("/exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam saved = examRepository.save(exam);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examRepository.findAll());
    }

    @GetMapping("/exams/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return examRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/exams/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        return examRepository.findById(id)
                .map(exam -> {
                    exam.setTitle(examDetails.getTitle());
                    exam.setDescription(examDetails.getDescription());
                    exam.setDuration(examDetails.getDuration());
                    exam.setTotalMarks(examDetails.getTotalMarks());
                    // Set examiner/questions if needed
                    return ResponseEntity.ok(examRepository.save(exam));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/exams/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        if (!examRepository.existsById(id)) return ResponseEntity.notFound().build();
        examRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
