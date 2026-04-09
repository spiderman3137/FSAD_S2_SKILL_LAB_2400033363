package com.example.authapp.dto;

import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String fullName,
        String username,
        String email,
        String phone,
        LocalDateTime createdAt
) {
}

