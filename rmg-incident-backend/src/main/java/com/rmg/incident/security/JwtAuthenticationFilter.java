package com.rmg.incident.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component @RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
 private final JwtService jwtService;
 private final CustomUserDetailsService userDetailsService;

 @Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)
 throws ServletException,IOException {
   String header=req.getHeader("Authorization");
   if(header!=null && header.startsWith("Bearer ")) {
     String token=header.substring(7);
     if(jwtService.isValid(token)) {
       String email=jwtService.extractUsername(token);
       UserDetails user=userDetailsService.loadUserByUsername(email);
       var auth=new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
       SecurityContextHolder.getContext().setAuthentication(auth);
     }
   }
   chain.doFilter(req,res);
 }
}