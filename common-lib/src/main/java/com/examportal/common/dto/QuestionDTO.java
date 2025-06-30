package com.examportal.common.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
    private Long questionId;
    private String text;
    private String category; // Represents the exam created by the admin
    private String difficulty;
    private String correctAnswer;
}
