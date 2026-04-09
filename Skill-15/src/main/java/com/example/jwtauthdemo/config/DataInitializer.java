package com.example.jwtauthdemo.config;

import com.example.jwtauthdemo.entity.Role;
import com.example.jwtauthdemo.entity.User;
import com.example.jwtauthdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User("admin", passwordEncoder.encode("admin_pass"), Role.ROLE_ADMIN);
            User employee = new User("employee", passwordEncoder.encode("employee_pass"), Role.ROLE_EMPLOYEE);
            
            userRepository.save(admin);
            userRepository.save(employee);
            
            System.out.println("Default users injected into database.");
        }
    }
}
