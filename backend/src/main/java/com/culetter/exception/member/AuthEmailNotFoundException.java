package com.culetter.exception.member;

public class AuthEmailNotFoundException extends RuntimeException {
    public AuthEmailNotFoundException(String message) {
        super(message);
    }
}
