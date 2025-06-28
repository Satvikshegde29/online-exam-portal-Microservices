package com.exam_portal.admin_service.controller;

import com.exam_portal.admin_service.client.AdminClient;
import com.exam_portal.admin_service.model.Exam;
import com.exam_portal.admin_service.repository.ExamRepository;
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

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(adminClient.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignRole(@PathVariable Long id, @RequestParam String role) {
        return ResponseEntity.ok(adminClient.assignRole(id, role));
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(adminClient.getUserProfile(userId));
    }

    // Create Exam (local)
    @PostMapping("/exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam saved = examRepository.save(exam);
        return ResponseEntity.ok(saved);
    }

    // Update Exam (local)
    @PutMapping("/exams/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        return examRepository.findById(id)
                .map(exam -> {
                    exam.setTitle(examDetails.getTitle());
                    exam.setDescription(examDetails.getDescription());
                    exam.setDuration(examDetails.getDuration());
                    exam.setTotalMarks(examDetails.getTotalMarks());
                    return ResponseEntity.ok(examRepository.save(exam));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Exam (local)
    @DeleteMapping("/exams/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        if (!examRepository.existsById(id)) return ResponseEntity.notFound().build();
        examRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Get all Exams (local)
    @GetMapping("/exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examRepository.findAll());
    }

    // TODO: For questions, after you implement question-service, use similar REST calls.

}
