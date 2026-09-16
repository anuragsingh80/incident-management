package com.rmg.incident.service;

import com.rmg.incident.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.Year;

@Service @RequiredArgsConstructor
public class IncidentIdService {
 private final IncidentRepository repository;
 private final SecureRandom random=new SecureRandom();

 public String generate(){
   for(int i=0;i<20;i++){
     int n=random.nextInt(90000)+10000;
     String id="RMG"+n+Year.now().getValue();
     if(!repository.existsByIncidentId(id)) return id;
   }
   throw new IllegalStateException("Could not generate unique incident ID");
 }
}