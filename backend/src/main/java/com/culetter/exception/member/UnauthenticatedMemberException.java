package com.culetter.exception.member;

public class UnauthenticatedMemberException extends RuntimeException {
    public UnauthenticatedMemberException(String message) {
        super(message);
    }
}
