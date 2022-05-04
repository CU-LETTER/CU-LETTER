package com.culetter.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class AuthEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authEmailId;
    private String email;
    private String code;

    @Builder
    public AuthEmail(String email, String code) {
        this.email = email;
        this.code = code;
    }
}
