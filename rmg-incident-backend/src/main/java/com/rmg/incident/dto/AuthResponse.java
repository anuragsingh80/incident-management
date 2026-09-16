package com.rmg.incident.dto;
public record AuthResponse(String accessToken, String tokenType, Long userId, String email, String role) {}