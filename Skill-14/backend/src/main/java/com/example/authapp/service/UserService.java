package com.example.authapp.service;

import com.example.authapp.dto.AuthResponse;
import com.example.authapp.dto.LoginRequest;
import com.example.authapp.dto.RegisterRequest;
import com.example.authapp.dto.UserProfileResponse;
import com.example.authapp.entity.User;
import com.example.authapp.exception.ApiException;
import com.example.authapp.exception.ResourceNotFoundException;
import com.example.authapp.repository.UserRepository;
import java.util.Locale;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String username = normalizeUsername(request.username());
        String email = normalizeEmail(request.email());

        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new ApiException("Username is already registered");
        }

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setUsername(username);
        user.setEmail(email);
        user.setPhone(request.phone().trim());
        user.setPassword(passwordEncoder.encode(request.password().trim()));

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getFullName(),
                "Registration successful. Please log in."
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String username = normalizeUsername(request.username());

        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new ApiException("Invalid username or password"));

        if (!passwordEncoder.matches(request.password().trim(), user.getPassword())) {
            throw new ApiException("Invalid username or password");
        }

        return new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                "Login successful"
        );
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(Long userId, String username) {
        if (userId == null && (username == null || username.isBlank())) {
            throw new IllegalArgumentException("Provide userId or username to fetch a profile");
        }

        User user = userId != null
                ? userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"))
                : userRepository.findByUsernameIgnoreCase(normalizeUsername(username))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getCreatedAt()
        );
    }

    private String normalizeUsername(String username) {
        return username.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}

