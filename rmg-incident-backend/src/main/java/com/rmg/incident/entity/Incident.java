package com.rmg.incident.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents", indexes = { @Index(name = "idx_incident_status", columnList = "status"),
		@Index(name = "idx_incident_priority", columnList = "priority") })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true, length = 20)
	private String incidentId;
	@Column(nullable = false)
	private String title;
	@Column(columnDefinition = "TEXT")
	private String description;
	private String category;
	@Enumerated(EnumType.STRING)
	private Priority priority;
	@Enumerated(EnumType.STRING)
	private IncidentStatus status;

	@ManyToOne(fetch = FetchType.LAZY)
	private User reportedBy;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User assignedTo;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	@PrePersist
	void prePersist() {
		createdAt = LocalDateTime.now();
		updatedAt = createdAt;
	}

	@PreUpdate
	void preUpdate() {
		updatedAt = LocalDateTime.now();
	}
}