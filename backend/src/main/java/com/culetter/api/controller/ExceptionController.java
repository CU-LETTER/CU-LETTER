package com.culetter.api.controller;

import com.culetter.exception.member.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> NullPointerExceptionHandler(NullPointerException e) {
        log.error("NullPointerException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        List<String> allErrors = e.getBindingResult()
                .getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
        log.error("MethodArgumentNotValidException - {}", allErrors);
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(allErrors);
    }

    @ExceptionHandler(DuplicateMemberException.class)
    public ResponseEntity<String> DuplicateMemberExceptionHandler(DuplicateMemberException e) {
        log.error("DuplicateMemberException - {}", e.getMessage());
        // 409
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(UnauthenticatedMemberException.class)
    public ResponseEntity<String> UnauthenticatedMemberExceptionHandler(UnauthenticatedMemberException e) {
        log.error("UnauthenticatedMemberException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> BadCredentialsExceptionHandler(BadCredentialsException e) {
        log.error("BadCredentialsException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<String> MalformedJwtExceptionHandler(MalformedJwtException e) {
        log.error("MalformedJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> ExpiredJwtExceptionHandler(ExpiredJwtException e) {
        log.error("ExpiredJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    public ResponseEntity<String> UnsupportedJwtExceptionHandler(UnsupportedJwtException e) {
        log.error("UnsupportedJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> UsernameNotFoundExceptionHandler(UsernameNotFoundException e) {
        log.error("UsernameNotFoundException - {}", e.getMessage());
        // 404
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AuthEmailNotFoundException.class)
    public ResponseEntity<String> AuthEmailNotFoundExceptionHandler(AuthEmailNotFoundException e) {
        log.error("AuthEmailNotFoundException - {}", e.getMessage());
        // 404
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(AuthEmailMessagingException.class)
    public ResponseEntity<String> AuthEmailMessagingExceptionHandler(AuthEmailMessagingException e) {
        log.error("AuthEmailMessagingException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(ValueNotExistException.class)
    public ResponseEntity<String> ValueNotExistExceptionHandler(ValueNotExistException e) {
        log.error("ValueNotExistException - {}", e.getMessage());
        //404
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(ChangeNotMadeException.class)
    public ResponseEntity<String> ChangeNotMadeExceptionHandler(ChangeNotMadeException e) {
        log.error("ChangeNotMadeException - {}", e.getMessage());
        //400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> IllegalArgumentExceptionHandler(IllegalArgumentException e) {
        log.error("IllegalArgumentException - {}", e.getMessage());
        //400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<String> JsonProcessingExceptionHandler(JsonProcessingException e) {
        log.error("JsonProcessingException - {}", "JSON 처리 에러");
        //500
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
