package com.rmg.incident.repository;
import com.rmg.incident.entity.*;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface IncidentRepository extends JpaRepository<Incident,Long> {
 boolean existsByIncidentId(String incidentId);
 Page<Incident> findByStatusAndReportedBy(IncidentStatus status,User reportedBy, Pageable pageable);
 Page<Incident> findByPriorityAndReportedBy(Priority priority,User reportedBy, Pageable pageable);
 Page<Incident> findByReportedBy(User reportedBy, Pageable pageable);
 
 List<Incident> findByReportedBy(User reportedBy);
 
}