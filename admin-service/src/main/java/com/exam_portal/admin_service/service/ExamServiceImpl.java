package com.exam_portal.admin_service.service;

import com.exam_portal.admin_service.model.Exam;
import com.exam_portal.admin_service.repository.ExamRepository;
import com.exam_portal.admin_service.client.AdminClient;
import com.examportal.common.dto.ExamDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.examportal.common.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;
    private final AdminClient adminClient; // AdminClient for validating admin users

    @Override
    public ExamDTO createExam(ExamDTO examDTO) {
        // Mock question validation
        examDTO.getQuestionIds().forEach(questionId -> {
            if (!isValidQuestionId(questionId)) {
                throw new ResourceNotFoundException("Invalid question ID: " + questionId);
            }
        });

        // Validate admin user
        if (adminClient.getUserByEmail(examDTO.getCreatedBy()) == null) {
            throw new ResourceNotFoundException("Invalid admin email: " + examDTO.getCreatedBy());
        }

        // Save exam
        Exam exam = new Exam();
        exam.setTitle(examDTO.getTitle());
        exam.setDescription(examDTO.getDescription());
        exam.setDuration(examDTO.getDuration());
        exam.setTotalMarks(examDTO.getTotalMarks());
        exam.setQuestionIds(examDTO.getQuestionIds());
        exam.setCreatedBy(examDTO.getCreatedBy());
        exam = examRepository.save(exam);

        return mapToDTO(exam);
    }

    private boolean isValidQuestionId(Long questionId) {
        // Mock validation logic
        return questionId != null && questionId > 0;
    }

    @Override
    public List<ExamDTO> getAllExams() {
        return examRepository.findAll().stream().map(this::mapToDTO).toList();
    }

    @Override
    public Optional<ExamDTO> getExamById(Long id) {
        return examRepository.findById(id).map(this::mapToDTO);
    }

    @Override
    public Optional<ExamDTO> updateExam(Long id, ExamDTO examDTO) {
        return examRepository.findById(id).map(exam -> {
            exam.setTitle(examDTO.getTitle());
            exam.setDescription(examDTO.getDescription());
            exam.setDuration(examDTO.getDuration());
            exam.setTotalMarks(examDTO.getTotalMarks());
            exam.setQuestionIds(examDTO.getQuestionIds());
            exam.setCreatedBy(examDTO.getCreatedBy());
            return mapToDTO(examRepository.save(exam));
        });
    }

    @Override
    public boolean deleteExam(Long id) {
        return examRepository.findById(id).map(exam -> {
            examRepository.delete(exam);
            return true;
        }).orElse(false);
    }

    private ExamDTO mapToDTO(Exam exam) {
        return new ExamDTO(
                exam.getExamId(),
                exam.getTitle(),
                exam.getDescription(),
                exam.getDuration(),
                exam.getTotalMarks(),
                exam.getQuestionIds(),
                exam.getCreatedBy()
        );
    }
}
