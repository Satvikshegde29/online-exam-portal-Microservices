package com.exam_portal.user_service.service;

import com.examportal.common.dto.UserDTO;

import java.util.List;


public interface UserService {
    UserDTO registerUser(UserDTO userDTO);
    String loginUser(String email, String password, Long id);
    UserDTO getUserProfileFromToken(String token);
    UserDTO updateUserProfile(String token, UserDTO updatedUser);
    UserDTO getUserByEmail(String email);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO assignRole(Long id, String role);
}

