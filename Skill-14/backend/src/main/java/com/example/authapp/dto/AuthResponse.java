package com.example.authapp.dto;

public record AuthResponse(
        Long userId,
        String username,
        String fullName,
        String message
) {
}

