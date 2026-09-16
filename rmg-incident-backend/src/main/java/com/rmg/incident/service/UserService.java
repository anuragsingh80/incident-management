package com.rmg.incident.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rmg.incident.entity.User;
import com.rmg.incident.repository.PasswordResetTokenRepository;
import com.rmg.incident.repository.UserRepository;
import com.rmg.incident.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	public User getUserDetail(Long userId) {
		 User user=userRepository.findById(userId).orElseThrow();
		 return user;
		
	}
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		
		return userRepository.findAll();
	}

}
