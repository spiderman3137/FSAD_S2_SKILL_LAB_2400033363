package com.example.jwtauthdemo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @PostMapping("/add")
    public String addRecord() {
        return "Admin access: Successfully added an employee record.";
    }

    @PostMapping("/delete")
    public String deleteRecord() {
        return "Admin access: Successfully deleted an employee record.";
    }
}
