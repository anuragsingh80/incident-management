package com.rmg.incident.config;

import com.rmg.incident.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration @RequiredArgsConstructor
public class SecurityConfig {
 private final JwtAuthenticationFilter jwtFilter;

 @Bean SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
   http.csrf(csrf->csrf.disable())
     .cors(cors->cors.configurationSource(corsConfigurationSource()))
     .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
     .authorizeHttpRequests(a->a
       .requestMatchers("/api/auth/**","/api/location/**","/swagger-ui/**","/v3/api-docs/**").permitAll()
       .requestMatchers("/api/incidents/**", "/api/user/**").authenticated()
       .anyRequest().authenticated())
     .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
   return http.build();
 }
 @Bean PasswordEncoder passwordEncoder(){ return new BCryptPasswordEncoder(); }
 @Bean AuthenticationManager authenticationManager(AuthenticationConfiguration c) throws Exception { return c.getAuthenticationManager(); }

 @Bean CorsConfigurationSource corsConfigurationSource(){
   CorsConfiguration c=new CorsConfiguration();
   c.setAllowedOrigins(List.of("http://localhost:4200"));
   c.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
   c.setAllowedHeaders(List.of("*"));
   c.setAllowCredentials(true);
   UrlBasedCorsConfigurationSource s=new UrlBasedCorsConfigurationSource();
   s.registerCorsConfiguration("/**",c); return s;
 }
}