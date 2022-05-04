package com.culetter.api.service;

public interface AuthEmailService {
    void sendAuthEmail(String email);
    boolean checkCode(String email, String code);
    void sendTempPassword(String email);
}
