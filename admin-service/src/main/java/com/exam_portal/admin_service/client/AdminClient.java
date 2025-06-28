package com.exam_portal.admin_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "admin-client")
public interface AdminClient {

    // User-service endpoints
    @GetMapping("${user.service.url:/api/users}")
    Object getAllUsers();

    @PutMapping("${user.service.url:/api/users}/{id}/role")
    Object assignRole(@PathVariable("id") Long id, @RequestParam("role") String role);

    @GetMapping("${user.service.url:/api/users}/{userId}")
    Object getUserProfile(@PathVariable("userId") Long userId);

    // Question-service endpoints (example, update URLs as needed)
    @GetMapping("${question.service.url:/api/questions}")
    Object getAllQuestions();

    @PostMapping("${question.service.url:/api/questions}")
    Object createQuestion(@RequestBody Object question);

    @GetMapping("${question.service.url:/api/questions}/{id}")
    Object getQuestionById(@PathVariable("id") Long id);

    // Add more question-service endpoints as needed
}