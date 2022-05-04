package com.culetter.api.controller;

import com.culetter.api.dto.MailBoxDto;
import com.culetter.api.service.MailBoxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/mailboxes")
public class MailBoxController {
    private final MailBoxService mailBoxService;

    public MailBoxController(MailBoxService mailBoxService) {
        this.mailBoxService = mailBoxService;
    }

    @GetMapping("/recv")
    public ResponseEntity<Map<String,List<Map<String,Object>>>> getRecvMemberList() {
        Map<String,List<Map<String,Object>>> mrml = new HashMap<>();
        mrml.put("result",mailBoxService.selectRecvMemberList());

        return ResponseEntity.status(HttpStatus.OK).body(mrml);
    }

    @GetMapping("/recv/{senderId}")
    public ResponseEntity<Map<String,List<MailBoxDto.recvMailInfo>>> getRecvMail(@PathVariable("senderId") Long senderId) {
        Map<String,List<MailBoxDto.recvMailInfo>> mrl = new HashMap<>();
        mrl.put("result",mailBoxService.selectRecvMail(senderId));

        return ResponseEntity.status(HttpStatus.OK).body(mrl);
    }

    @DeleteMapping("/recv")
    public ResponseEntity<String> deleteRecvMail(@RequestBody Map<String,Long> mailId) {
        mailBoxService.deleteRecvMail(mailId.get("mail_id"));

        return ResponseEntity.status(HttpStatus.OK).body("받은 편지 삭제 성공");
    }

    @GetMapping("/send")
    public ResponseEntity<Map<String,List<MailBoxDto.sendMailInfo>>> getSendMail() {
        Map<String,List<MailBoxDto.sendMailInfo>> msl = new HashMap<>();
        msl.put("result",mailBoxService.selectSendMail());

        return ResponseEntity.status(HttpStatus.OK).body(msl);
    }

    @DeleteMapping("/send")
    public ResponseEntity<String> deleteSendMail(@RequestBody Map<String,Long> mailId) {
        mailBoxService.deleteSendMail(mailId.get("mail_id"));

        return ResponseEntity.status(HttpStatus.OK).body("보낸 편지 삭제 성공");
    }

    @GetMapping("/undone")
    public ResponseEntity<Map<String,List<MailBoxDto.sendMailInfo>>> getUndoneMail() {
        Map<String,List<MailBoxDto.sendMailInfo>> mul = new HashMap<>();
        mul.put("result",mailBoxService.selectUndoneMail());

        return ResponseEntity.status(HttpStatus.OK).body(mul);
    }

    @DeleteMapping("/undone")
    public ResponseEntity<String> deleteUndoneMail(@RequestBody Map<String,Long> mailId) {
        mailBoxService.deleteUndoneMail(mailId.get("mail_id"));

        return ResponseEntity.status(HttpStatus.OK).body("작성 중 편지 삭제 성공");
    }
}
