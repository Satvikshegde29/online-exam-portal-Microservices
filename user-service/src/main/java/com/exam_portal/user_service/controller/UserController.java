package com.exam_portal.user_service.controller;

import com.exam_portal.user_service.dto.UserDTO;
import com.exam_portal.user_service.dto.LoginRequestDTO;
// import com.exam_portal.user_service.model.User;
import com.exam_portal.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
// import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO registeredUser = userService.registerUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        String token = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (token != null) {
            return ResponseEntity.ok("Bearer " + token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // View Own Profile (no admin required)
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getOwnProfile(@RequestHeader("Authorization") String token) {
        UserDTO user = userService.getUserProfileFromToken(token);
        return ResponseEntity.ok(user);
    }

    // Update Own Profile
    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateOwnProfile(@RequestHeader("Authorization") String token, @RequestBody UserDTO updatedUser) {
        UserDTO user = userService.updateUserProfile(token, updatedUser);
        return ResponseEntity.ok(user);
    }

}

