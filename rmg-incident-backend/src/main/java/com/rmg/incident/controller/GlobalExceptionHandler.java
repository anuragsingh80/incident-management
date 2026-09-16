package com.rmg.incident.controller;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
	record ErrorResponse(LocalDateTime timestamp, int status, String message) {
	}
	
	
	 @ExceptionHandler(EntityNotFoundException.class)
	    public ResponseEntity<Map<String, Object>>
	    handleNotFound(
	            EntityNotFoundException ex) {

	        return ResponseEntity
	            .status(HttpStatus.NOT_FOUND)
	            .body(Map.of(
	                "status", 404,
	                "error", "NOT_FOUND",
	                "message", ex.getMessage()
	            ));
	    }
	 
	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<Map<String, Object>>
	    handleGeneric(Exception ex) {

	        ex.printStackTrace();

	        return ResponseEntity
	            .status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body(Map.of(
	                "status", 500,
	                "error", "INTERNAL_SERVER_ERROR",
	                "message",
	                ex.getMessage() != null
	                    ? ex.getMessage()
	                    : "Internal server error"
	            ));
	    }

	@ExceptionHandler(IllegalArgumentException.class)
	ResponseEntity<ErrorResponse> bad(IllegalArgumentException e) {
		return ResponseEntity.badRequest().body(new ErrorResponse(LocalDateTime.now(), 400, e.getMessage()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e) {
		String msg = e.getBindingResult().getFieldErrors().stream()
				.map(x -> x.getField() + ": " + x.getDefaultMessage()).collect(Collectors.joining(", "));
		return ResponseEntity.badRequest().body(new ErrorResponse(LocalDateTime.now(), 400, msg));
	}

	//@ExceptionHandler(Exception.class)
	//ResponseEntity<ErrorResponse> generic(Exception e) {
		//return ResponseEntity.status(500).body(new ErrorResponse(LocalDateTime.now(), 500, "Internal server error"));
	//}
}