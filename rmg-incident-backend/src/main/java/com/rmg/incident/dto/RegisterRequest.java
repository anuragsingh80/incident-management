package com.rmg.incident.dto;
import jakarta.validation.constraints.*;
public record RegisterRequest(
 @NotBlank String firstName,
 String lastName,
 String state,
 String address,
 String city,
 String country,
 @NotBlank
 @Pattern(regexp = "^[0-9]{6}$")
 String pincode,
 String countryCode,
 String faxNo,
 String phoneNo,
 @NotBlank @Email String email,
 @NotBlank @Size(min=8,max=100) String password,
 @NotBlank String mobile) {}