package com.rmg.incident.dto;
import com.rmg.incident.entity.IncidentStatus;
import com.rmg.incident.entity.Priority;
import jakarta.validation.constraints.*;
public record IncidentRequest(
 @NotBlank String title,
 @NotBlank String description,
 @NotBlank String category,
 @NotNull Priority priority
 
 ) {}