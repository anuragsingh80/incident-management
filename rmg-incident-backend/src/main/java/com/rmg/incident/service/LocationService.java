package com.rmg.incident.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.rmg.incident.dto.LocationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service @RequiredArgsConstructor
public class LocationService {
 private final RestClient restClient;

 public LocationResponse findByPin(String pin){
   JsonNode root=restClient.get()
     .uri("https://api.postalpincode.in/pincode/{pin}",pin)
     .retrieve().body(JsonNode.class);
   if(root==null || !root.isArray() || root.isEmpty() ||
      !"Success".equalsIgnoreCase(root.get(0).path("Status").asText()))
     throw new IllegalArgumentException("Invalid PIN code: "+pin);

   JsonNode posts=root.get(0).path("PostOffice");
   if(!posts.isArray() || posts.isEmpty())
     throw new IllegalArgumentException("No location found for PIN: "+pin);

   JsonNode p=posts.get(0);
   String district=p.path("District").asText();
   String state=p.path("State").asText();
   // The API does not expose a single universal "city" field. District is
   // used as the application City value; State is retained as district/state context.
   return new LocationResponse(pin,district,"India");
 }
}