package com.rmg.incident.controller;

import com.rmg.incident.dto.*;
import com.rmg.incident.entity.User;
import com.rmg.incident.security.JwtService;
import com.rmg.incident.service.AuthService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	private final JwtService tokenProvider;

	@PostMapping("/register")
	public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest r) {
		authService.register(r);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserDetail(@PathVariable Long userId) {
		
            
            authService.getUserDetail(userId);
    		return ResponseEntity.status(HttpStatus.OK).build();
        }
        
        
		
	

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody LoginRequest r) {
		return authService.login(r);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<Void> forgot(@Valid @RequestBody ForgotPasswordRequest r) {
		authService.forgotPassword(r);
		return ResponseEntity.accepted().build();
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Void> reset(@Valid @RequestBody ResetPasswordRequest r) {
		authService.resetPassword(r);
		return ResponseEntity.noContent().build();
	}
}