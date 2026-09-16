package com.rmg.incident.service;

import com.rmg.incident.dto.*;
import com.rmg.incident.entity.*;
import com.rmg.incident.repository.*;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class IncidentService {
 private final IncidentRepository incidentRepository;
 private final UserRepository userRepository;
 private final IncidentIdService idService;
 private final LocationService locationService;

 @Transactional
 public IncidentResponse create(IncidentRequest r,String email){
   User reporter=userRepository.findByEmailIgnoreCase(email).orElseThrow();
   //LocationResponse loc=locationService.findByPin(r.pinCode());
   Incident i=Incident.builder().incidentId(idService.generate()).title(r.title())
     .description(r.description()).category(r.category()).priority(r.priority())
     .status(IncidentStatus.OPEN)
     .reportedBy(reporter).build();
   return map(incidentRepository.save(i));
 }

 @Transactional(readOnly=true)
 public Page<IncidentResponse> list(int page,int size,IncidentStatus status,Priority priority,String email){
	 User user=userRepository.findByEmailIgnoreCase(email).orElseThrow();
   Pageable pageable=PageRequest.of(Math.max(page,0),Math.min(size,100),Sort.by(Sort.Direction.DESC,"createdAt"));
   Page<Incident> p;
   if(status!=null && user!=null) p=incidentRepository.findByStatusAndReportedBy(status,user,pageable);
   else if(priority!=null && user!=null) p=incidentRepository.findByPriorityAndReportedBy(priority,user,pageable);
   else p=incidentRepository.findByReportedBy(user,pageable);
   return p.map(this::map);
 }
 
 
 @Transactional(readOnly=true)
 public Page<IncidentResponse> getAll(int page,int size,IncidentStatus status,Priority priority,String email){
	 User user=userRepository.findByEmailIgnoreCase(email).orElseThrow();
   Pageable pageable=PageRequest.of(Math.max(page,0),Math.min(size,100),Sort.by(Sort.Direction.DESC,"createdAt"));
   Page<Incident> p;
   if(status!=null && user!=null) p=incidentRepository.findByStatusAndReportedBy(status,user,pageable);
   else if(priority!=null && user!=null) p=incidentRepository.findByPriorityAndReportedBy(priority,user,pageable);
   else p=incidentRepository.findByReportedBy(user,pageable);
   return p.map(this::map);
 }

 @Transactional(readOnly=true)
 public IncidentResponse get(Long id){ return map(incidentRepository.findById(id)
   .orElseThrow(()->new IllegalArgumentException("Incident not found: "+id))); }

 @Transactional
 public IncidentResponse updateStatus(Long id,UpdateStatusRequest r){
   Incident i=incidentRepository.findById(id)
     .orElseThrow(()->new IllegalArgumentException("Incident not found: "+id));
   i.setStatus(r.status()); return map(incidentRepository.save(i));
 }

 @Transactional
 public IncidentResponse assign(Long id,Long userId){
   Incident i=incidentRepository.findById(id)
     .orElseThrow(()->new IllegalArgumentException("Incident not found: "+id));
   User u=userRepository.findById(userId)
     .orElseThrow(()->new IllegalArgumentException("Assignee not found: "+userId));
   i.setAssignedTo(u);
   if(i.getStatus()==IncidentStatus.OPEN) i.setStatus(IncidentStatus.ASSIGNED);
   return map(incidentRepository.save(i));
 }
 
 /**
  * Update incident
  */
 @Transactional
 public IncidentResponse updateIncident(
         Long id,
         UpdateIncidentRequest request) {

     Incident incident =
         incidentRepository
             .findById(id)
             .orElseThrow(() ->
                 new EntityNotFoundException(
                     "Incident not found with id: " + id
                 )
             );
     
     // CLOSED incident cannot be edited
     if ("CLOSED".equalsIgnoreCase(
             incident.getStatus().toString())) {

         throw new IllegalStateException(
             "Closed incident cannot be edited."
         );
     }

    
     incident.setTitle(
         request.getTitle()
     );

     incident.setDescription(
         request.getDescription()
     );

     incident.setCategory(
         request.getCategory()
     );

     incident.setPriority(Priority.valueOf(request.getPriority())
    	        
    	    );

     incident.setStatus(IncidentStatus.valueOf( request.getStatus())
        
     );

 
     

     Incident saved =
         incidentRepository.save(incident);

     return map(saved);
 }

 private IncidentResponse map(Incident i){
   return new IncidentResponse(i.getId(),i.getIncidentId(),i.getTitle(),i.getDescription(),
     i.getCategory(),i.getPriority().name(),i.getStatus().name(),
     i.getReportedBy()==null?null:i.getReportedBy().getId(),
     i.getAssignedTo()==null?null:i.getAssignedTo().getId(),
     i.getCreatedAt(),i.getUpdatedAt());
 }

 public List<IncidentResponse> getAllIncident(String email) {
	 User user=userRepository.findByEmailIgnoreCase(email).orElseThrow();
	 List<Incident> incidents = incidentRepository.findByReportedBy(user);
	 List<IncidentResponse> res= new ArrayList<IncidentResponse>();
	 for (Incident incident : incidents) {
		 res.add(map(incident));
		  
	  }
	 return res;
	 
 }
}