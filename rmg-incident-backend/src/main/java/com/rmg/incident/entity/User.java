package com.rmg.incident.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String firstName;
	private String lastName;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	private String mobile;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	private boolean enabled = true;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private String address;
	private String state;
	private String city;
	private String country;
	private String pincode;
	private String countryCode;
	private String faxNo;
	private String phoneNo;
	
	

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