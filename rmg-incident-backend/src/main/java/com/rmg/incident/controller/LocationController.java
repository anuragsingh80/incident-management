package com.rmg.incident.controller;

import com.rmg.incident.dto.LocationResponse;
import com.rmg.incident.service.LocationService;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/location") @RequiredArgsConstructor @Validated
public class LocationController {
 private final LocationService locationService;
 @GetMapping("/pincode/{pin}")
 public LocationResponse get(@PathVariable @Pattern(regexp="\\d{6}") String pin){
   return locationService.findByPin(pin);
 }
}