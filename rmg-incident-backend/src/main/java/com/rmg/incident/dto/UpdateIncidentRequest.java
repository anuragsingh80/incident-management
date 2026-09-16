package com.rmg.incident.dto;



import com.rmg.incident.entity.IncidentStatus;
import com.rmg.incident.entity.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateIncidentRequest {

    @NotBlank(message = "Title is required")
    @Size(
        min = 5,
        max = 200,
        message = "Title must be between 5 and 200 characters"
    )
    private String title;

    @NotBlank(message = "Description is required")
    @Size(
        min = 10,
        max = 5000,
        message = "Description must be between 10 and 5000 characters"
    )
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Priority is required")
    private String priority;

    @NotBlank(message = "Status is required")
    private String status;

    

    private String assignedTo;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    

    

   
   

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }
}
