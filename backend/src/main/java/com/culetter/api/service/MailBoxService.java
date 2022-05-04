package com.culetter.api.service;

import com.culetter.api.dto.MailBoxDto;

import java.util.List;
import java.util.Map;

public interface MailBoxService {
    List<Map<String,Object>> selectRecvMemberList();
    List<MailBoxDto.recvMailInfo> selectRecvMail(Long senderId);
    void deleteRecvMail(Long mailId);
    List<MailBoxDto.sendMailInfo> selectSendMail();
    void deleteSendMail(Long mailId);
    List<MailBoxDto.sendMailInfo> selectUndoneMail();
    void deleteUndoneMail(Long mailId);
}
