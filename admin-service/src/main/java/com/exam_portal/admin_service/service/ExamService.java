package com.exam_portal.admin_service.service;

import com.exam_portal.admin_service.model.Exam;

import java.util.List;
import java.util.Optional;

public interface ExamService {
    Exam createExam(Exam exam);
    List<Exam> getAllExams();
    Optional<Exam> getExamById(Long id);
    Optional<Exam> updateExam(Long id, Exam examDetails);
    boolean deleteExam(Long id);
}
