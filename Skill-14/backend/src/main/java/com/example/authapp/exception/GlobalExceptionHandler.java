package com.example.authapp.exception;

import com.example.authapp.dto.ErrorResponse;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> validationErrors = new LinkedHashMap<>();

        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(error.getField(), error.getDefaultMessage());
        }

        ErrorResponse response = new ErrorResponse("Validation failed", validationErrors);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException exception) {
        ErrorResponse response = new ErrorResponse(exception.getMessage(), Collections.emptyMap());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException exception) {
        ErrorResponse response = new ErrorResponse(exception.getMessage(), Collections.emptyMap());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException exception) {
        ErrorResponse response = new ErrorResponse(exception.getMessage(), Collections.emptyMap());
        return ResponseEntity.badRequest().body(response);
    }
}

