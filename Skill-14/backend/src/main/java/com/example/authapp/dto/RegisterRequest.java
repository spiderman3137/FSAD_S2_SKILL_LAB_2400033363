package com.example.authapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Full name is required")
        String fullName,

        @NotBlank(message = "Username is required")
        String username,

        @Email(message = "Enter a valid email")
        @NotBlank(message = "Email is required")
        String email,

        @NotBlank(message = "Phone number is required")
        @Size(min = 10, max = 15, message = "Phone number should be 10 to 15 characters")
        String phone,

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must contain at least 6 characters")
        String password
) {
}

