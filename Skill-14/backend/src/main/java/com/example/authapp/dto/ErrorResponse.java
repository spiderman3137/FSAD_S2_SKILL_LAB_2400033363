package com.example.authapp.dto;

import java.util.Map;

public record ErrorResponse(
        String message,
        Map<String, String> validationErrors
) {
}

