package com.exam_portal.admin_service.service;

import com.exam_portal.admin_service.model.Exam;
import com.exam_portal.admin_service.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @Override
    public Optional<Exam> getExamById(Long id) {
        return examRepository.findById(id);
    }

    @Override
    public Optional<Exam> updateExam(Long id, Exam examDetails) {
        return examRepository.findById(id).map(exam -> {
            exam.setTitle(examDetails.getTitle());
            exam.setDescription(examDetails.getDescription());
            exam.setDuration(examDetails.getDuration());
            exam.setTotalMarks(examDetails.getTotalMarks());
            // Set examiner/questions if needed
            return examRepository.save(exam);
        });
    }

    @Override
    public boolean deleteExam(Long id) {
        return examRepository.findById(id).map(exam -> {
            examRepository.delete(exam);
            return true;
        }).orElse(false);
    }
}
