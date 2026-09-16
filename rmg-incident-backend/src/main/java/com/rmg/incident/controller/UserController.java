package com.rmg.incident.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rmg.incident.entity.User;
import com.rmg.incident.security.JwtService;
import com.rmg.incident.service.AuthService;
import com.rmg.incident.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	
	@GetMapping("/{userId}")
	public ResponseEntity<User> getUserDetail(@PathVariable("userId") Long userId) {
		
            
		  User user=  userService.getUserDetail(userId);
    		return ResponseEntity.status(HttpStatus.OK).body(user);
        }
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> c() {
		
            
		  List<User> user=  userService.getUsers();
    		return ResponseEntity.status(HttpStatus.OK).body(user);
        }
	
	

}
