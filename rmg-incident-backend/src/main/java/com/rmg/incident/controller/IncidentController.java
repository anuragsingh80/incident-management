package com.rmg.incident.controller;

import com.rmg.incident.dto.*;
import com.rmg.incident.entity.*;
import com.rmg.incident.service.IncidentService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {
	private final IncidentService incidentService;

	@PostMapping
	public ResponseEntity<IncidentResponse> create(@Valid @RequestBody IncidentRequest r, Authentication a) {
		return ResponseEntity.status(HttpStatus.CREATED).body(incidentService.create(r, a.getName()));
	}

	@GetMapping
	public Page<IncidentResponse> list(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "20") int size, @RequestParam(required = false) IncidentStatus status,
			@RequestParam(required = false) Priority priority,Authentication a) {
		return incidentService.list(page, size, status, priority,a.getName());
	}
	
	 @GetMapping("/getAllIncident")
	    public ResponseEntity<List<IncidentResponse>>
	    getAllIncident(Authentication a ) {

	        return ResponseEntity.ok(
	        		incidentService.getAllIncident(a.getName())
	        );
	    }

	@GetMapping("/{id}")
	public IncidentResponse get(@PathVariable Long id) {
		return incidentService.get(id);
	}

	@PatchMapping("/{id}/status")
	public IncidentResponse status(@PathVariable Long id, @Valid @RequestBody UpdateStatusRequest r) {
		return incidentService.updateStatus(id, r);
	}

	@PatchMapping("/{id}/assign/{userId}")
	public IncidentResponse assign(@PathVariable Long id, @PathVariable Long userId) {
		return incidentService.assign(id, userId);
	}
	
	 /**
     * PUT incident
     *
     * PUT /api/incidents/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<IncidentResponse>
    updateIncident(
            @PathVariable Long id,

            @Valid
            @RequestBody
            UpdateIncidentRequest request) {

        IncidentResponse response =
            incidentService.updateIncident(
                id,
                request
            );

        return ResponseEntity.ok(response);
    }
}