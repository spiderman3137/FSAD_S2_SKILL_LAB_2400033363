package com.example.jwtauthdemo.controller;

import com.example.jwtauthdemo.dto.AuthRequest;
import com.example.jwtauthdemo.dto.AuthResponse;
import com.example.jwtauthdemo.security.CustomUserDetails;
import com.example.jwtauthdemo.security.CustomUserDetailsService;
import com.example.jwtauthdemo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Incorrect username or password");
        }

        final CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(authRequest.getUsername());
        
        final String role = userDetails.getUser().getRole().name();
        final String jwt = jwtUtil.generateToken(userDetails, role);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}
