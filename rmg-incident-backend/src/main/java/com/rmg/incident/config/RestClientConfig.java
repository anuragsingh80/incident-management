package com.rmg.incident.config;
import org.springframework.context.annotation.*;
import org.springframework.web.client.RestClient;
@Configuration
public class RestClientConfig {
 @Bean RestClient restClient(RestClient.Builder builder){ return builder.build(); }
}