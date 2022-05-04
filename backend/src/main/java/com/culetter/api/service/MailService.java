package com.culetter.api.service;

import com.culetter.api.dto.MailDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MailService {
    MailDto.Mail selectMailById(Long mailId);
    MailDto.Mail selectMailByCode(String code);
    List<String> styleRecommendation(MailDto.EmotionRequest emotionRequest);
    List<Map<String,String>> musicRecommendation(MailDto.EmotionRequest emotionRequest);
    String insertPostcardImage(MultipartFile multipartFile);
    String insertMail(MailDto.Mail mail);
    Long saveTempMail(Long mailId, MailDto.Mail mail);
    String sendTempMail(MailDto.Mail mail, Long mailId);
    void saveInRecvMailbox(String code);
    MailDto.EmotionResponse analyzeResult(String content) throws JsonProcessingException;
}
