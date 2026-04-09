package com.example.authapp.controller;

import com.example.authapp.dto.UserProfileResponse;
import com.example.authapp.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserProfileResponse getProfile(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String username
    ) {
        return userService.getProfile(userId, username);
    }
}

