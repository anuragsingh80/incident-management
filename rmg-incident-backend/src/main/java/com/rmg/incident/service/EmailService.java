package com.rmg.incident.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class EmailService {
 private final JavaMailSender mailSender;
 public void sendResetEmail(String to,String link){
   SimpleMailMessage m=new SimpleMailMessage();
   m.setTo(to); m.setSubject("RMG Incident - Password Reset");
   m.setText("Use this link to reset your password. It expires in 30 minutes:\n"+link);
   try { mailSender.send(m); } catch(Exception e) {
     // In production, log this and use a retry/dead-letter mechanism.
   }
 }
}