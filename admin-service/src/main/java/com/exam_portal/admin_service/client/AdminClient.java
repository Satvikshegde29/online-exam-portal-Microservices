package com.exam_portal.admin_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.examportal.common.dto.UserDTO;

@FeignClient(
    name = "user-service",
    configuration = com.exam_portal.admin_service.config.FeignConfig.class
)
public interface AdminClient {
    @GetMapping("/api/users/all")
    List<UserDTO> getAllUsers();

    @PutMapping("/api/users/{id}/role")
    UserDTO assignRole(@PathVariable("id") Long id, @RequestParam("role") String role);

    @GetMapping("/api/users/{userId}")
    UserDTO getUserProfile(@PathVariable("userId") Long userId);

    // Question-service endpoints (example, update URLs as needed)
    @GetMapping("${question.service.url:/api/questions}")
    Object getAllQuestions();

    @PostMapping("${question.service.url:/api/questions}")
    Object createQuestion(@RequestBody Object question);

    @GetMapping("${question.service.url:/api/questions}/{id}")
    Object getQuestionById(@PathVariable("id") Long id);

    // Add more question-service endpoints as needed
}