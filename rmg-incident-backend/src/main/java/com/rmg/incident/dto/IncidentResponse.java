package com.rmg.incident.dto;

import java.time.LocalDateTime;

public record IncidentResponse(Long id, String incidentId, String title, String description, String category,
		String priority, String status,  Long reportedBy, Long assignedTo,
		LocalDateTime createdAt, LocalDateTime updatedAt) {
}