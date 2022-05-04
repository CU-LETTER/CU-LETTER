package com.culetter.api.controller;

import com.culetter.api.dto.MailDto;
import com.culetter.api.service.MailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/mails")
public class MailController {
    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/id/{mailId}")
    public ResponseEntity<MailDto.Mail> getMailWithId(@PathVariable("mailId") Long mailId) {
        return ResponseEntity.status(HttpStatus.OK).body(mailService.selectMailById(mailId));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<MailDto.Mail> getMailWithCode(@PathVariable("code") String code) {
        return ResponseEntity.status(HttpStatus.OK).body(mailService.selectMailByCode(code));
    }

    @PostMapping("/analyze")
    public ResponseEntity<MailDto.EmotionResponse> analyzeContent(@RequestBody Map<String,String> contentRequest)
            throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(mailService.analyzeResult(contentRequest.get("content")));
    }

    @PostMapping("/style")
    public ResponseEntity<Map<String, List<String>>> recommendStyle(@RequestBody MailDto.EmotionRequest emotionRequest){
        Map<String,List<String>> mrs = new HashMap<>();
        mrs.put("style_list", mailService.styleRecommendation(emotionRequest));

        return ResponseEntity.status(HttpStatus.OK).body(mrs);
    }

    @PostMapping("/music")
    public ResponseEntity<Map<String,List<Map<String,String>>>> recommendMusic(@RequestBody MailDto.EmotionRequest emotionRequest){
        Map<String,List<Map<String,String>>> mrm = new HashMap<>();
        mrm.put("music_list", mailService.musicRecommendation(emotionRequest));

        return ResponseEntity.status(HttpStatus.OK).body(mrm);
    }

    @PostMapping("/postcard")
    public ResponseEntity<Map<String,String>> uploadPostcardImage(@RequestPart(value="postcard_image")MultipartFile multipartFile) {
        Map<String,String> murl = new HashMap<>();
        murl.put("image_url", mailService.insertPostcardImage(multipartFile));

        return ResponseEntity.status(HttpStatus.OK).body(murl);
    }

    @PostMapping("/write")
    public ResponseEntity<Map<String,String>> writeMail(@RequestBody MailDto.Mail mail){
        Map<String,String> mcode = new HashMap<>();
        mcode.put("code", mailService.insertMail(mail));

        return ResponseEntity.status(HttpStatus.OK).body(mcode);
   }

    @PostMapping("/tempsave/{mailId}")
    public ResponseEntity<Map<String,Long>> tempSaveMail(
            @RequestBody MailDto.Mail mail, @PathVariable("mailId") Long mailId) {
        Map<String,Long> mid = new HashMap<>();
        mid.put("mail_id", mailService.saveTempMail(mailId, mail));

        return ResponseEntity.status(HttpStatus.OK).body(mid);
    }

    @PostMapping("/tempsave/write/{mailId}")
    public ResponseEntity<Map<String,String>> sendTempSaveMail(
            @RequestBody MailDto.Mail mail, @PathVariable("mailId") Long mailId){
        Map<String,String> mcode = new HashMap<>();
        mcode.put("code", mailService.sendTempMail(mail,mailId));

        return ResponseEntity.status(HttpStatus.OK).body(mcode);
    }

    @PostMapping("/recvsave/{code}")
    public ResponseEntity<String> saveRecvMail(@PathVariable("code") String code){
        mailService.saveInRecvMailbox(code);

        return ResponseEntity.status(HttpStatus.OK).body("받은 편지 저장 성공");
    }
}
