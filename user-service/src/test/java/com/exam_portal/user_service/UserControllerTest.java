import com.exam_portal.user_service.model.User;
import com.exam_portal.user_service.service.UserService;
import com.examportal.common.dto.LoginRequestDTO;
import com.examportal.common.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import java.util.Map;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;

// Java
package com.exam_portal.user_service;





@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO userDTO;
    private User user;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setEmail("test@example.com");
        userDTO.setRole("USER");

        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setRole("USER");
    }

    @Test
    void testRegisterUser() throws Exception {
        when(userService.registerUser(any(UserDTO.class))).thenReturn(userDTO);

        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    void testLoginUserSuccess() throws Exception {
        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");
        loginRequest.setId(1L);

        when(userService.loginUser(eq("test@example.com"), eq("password"), eq(1L))).thenReturn("jwt-token");
        when(userService.findByEmail("test@example.com")).thenReturn(user);

        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("Bearer jwt-token"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.message").value("Login successful"));
    }

    @Test
    void testLoginUserInvalid() throws Exception {
        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail("wrong@example.com");
        loginRequest.setPassword("wrong");
        loginRequest.setId(2L);

        when(userService.loginUser(anyString(), anyString(), anyLong())).thenReturn(null);
        when(userService.findByEmail(anyString())).thenReturn(null);

        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid credentials"));
    }

    @Test
    void testGetOwnProfile() throws Exception {
        when(userService.getEmailFromToken("jwt-token")).thenReturn("test@example.com");
        when(userService.getUserByEmail("test@example.com")).thenReturn(userDTO);

        mockMvc.perform(get("/api/users/profile")
                .header("Authorization", "Bearer jwt-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    void testUpdateOwnProfile() throws Exception {
        when(userService.updateUserProfile(eq("jwt-token"), any(UserDTO.class))).thenReturn(userDTO);

        mockMvc.perform(put("/api/users/profile")
                .header("Authorization", "Bearer jwt-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testGetAllUsers() throws Exception {
        when(userService.getAllUsers()).thenReturn(List.of(userDTO));

        mockMvc.perform(get("/api/users/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("test@example.com"));
    }

    @Test
    void testGetUserById() throws Exception {
        when(userService.getUserById(1L)).thenReturn(userDTO);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    void testAssignRole() throws Exception {
        UserDTO updatedUser = new UserDTO();
        updatedUser.setId(1L);
        updatedUser.setEmail("test@example.com");
        updatedUser.setRole("ADMIN");

        when(userService.assignRole(1L, "ADMIN")).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/1/role")
                .param("role", "ADMIN"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }
}