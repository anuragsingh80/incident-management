package com.rmg.incident.security;

import com.rmg.incident.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
 private final UserRepository userRepository;
 @Override public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
   var u=userRepository.findByEmailIgnoreCase(email)
     .orElseThrow(() -> new UsernameNotFoundException("User not found"));
   return User.withUsername(u.getEmail()).password(u.getPassword())
     .roles(u.getRole().name()).disabled(!u.isEnabled()).build();
 }
}