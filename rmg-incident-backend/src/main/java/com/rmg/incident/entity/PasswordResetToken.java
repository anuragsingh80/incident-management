package com.rmg.incident.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="password_reset_tokens")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PasswordResetToken {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false, unique=true) private String token;
 @ManyToOne(fetch=FetchType.LAZY, optional=false) private User user;
 @Column(nullable=false) private LocalDateTime expiryDate;
 @Column(nullable=false) private boolean used=false;
}