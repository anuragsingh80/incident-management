package com.rmg.incident.service;

import com.rmg.incident.dto.*;
import com.rmg.incident.entity.*;
import com.rmg.incident.repository.*;
import com.rmg.incident.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepository;
	private final PasswordResetTokenRepository tokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final EmailService emailService;

	@Value("${app.reset-password.expiration-minutes}")
	private long resetMinutes;
	@Value("${app.frontend-url}")
	private String frontendUrl;

	@Transactional
	public void register(RegisterRequest r) {
		if (userRepository.existsByEmailIgnoreCase(r.email()))
			throw new IllegalArgumentException("Email already registered");
		userRepository.save(User.builder().firstName(r.firstName()).lastName(r.lastName())
				 .pincode(r.pincode())
				.state(r.state())
				.city(r.city())
				.country(r.country())
				.phoneNo(r.phoneNo())
				.faxNo(r.faxNo())
				.countryCode(r.countryCode())
				.address(r.address())
				.email(r.email().toLowerCase()).password(passwordEncoder.encode(r.password())).mobile(r.mobile())
				.role(Role.USER).enabled(true).build());
	}

	public AuthResponse login(LoginRequest r) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(r.email(), r.password()));
		User u = userRepository.findByEmailIgnoreCase(r.email()).orElseThrow();
		return new AuthResponse(jwtService.generateToken(u.getEmail()), "Bearer", u.getId(), u.getEmail(),
				u.getRole().name());
	}

	@Transactional
	public void forgotPassword(ForgotPasswordRequest r) {
		userRepository.findByEmailIgnoreCase(r.email()).ifPresent(u -> {
			tokenRepository.deleteByUserId(u.getId());
			String token = UUID.randomUUID().toString();
			tokenRepository.save(PasswordResetToken.builder().token(token).user(u)
					.expiryDate(LocalDateTime.now().plusMinutes(resetMinutes)).used(false).build());
			emailService.sendResetEmail(u.getEmail(), frontendUrl + "/reset-password?token=" + token);
		});
	}

	@Transactional
	public void resetPassword(ResetPasswordRequest r) {
		PasswordResetToken t = tokenRepository.findByToken(r.token())
				.orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));
		if (t.isUsed() || t.getExpiryDate().isBefore(LocalDateTime.now()))
			throw new IllegalArgumentException("Reset token expired or already used");
		t.getUser().setPassword(passwordEncoder.encode(r.newPassword()));
		t.setUsed(true);
		userRepository.save(t.getUser());
		tokenRepository.save(t);
	}

	public User getUserDetail(Long userId) {
		 User user=userRepository.findById(userId).orElseThrow();
		 return user;
		
	}
}