package com.rmg.incident.dto;
import com.rmg.incident.entity.IncidentStatus;
import jakarta.validation.constraints.NotNull;
public record UpdateStatusRequest(@NotNull IncidentStatus status) {}