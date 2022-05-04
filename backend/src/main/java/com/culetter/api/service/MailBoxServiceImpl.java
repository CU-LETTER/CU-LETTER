package com.culetter.api.service;

import com.culetter.api.dto.MailBoxDto;
import com.culetter.db.entity.*;
import com.culetter.db.repository.MailRepository;
import com.culetter.db.repository.RecvMailboxRepository;
import com.culetter.db.repository.SendMailboxRepository;
import com.culetter.db.repository.UndoneMailboxRepository;
import com.culetter.exception.member.ChangeNotMadeException;
import com.culetter.exception.member.ValueNotExistException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
public class MailBoxServiceImpl implements MailBoxService {

    private final MemberService memberService;
    private final MailRepository mailRepository;
    private final RecvMailboxRepository recvMailboxRepository;
    private final SendMailboxRepository sendMailboxRepository;
    private final UndoneMailboxRepository undoneMailboxRepository;


    public MailBoxServiceImpl(MemberService memberService,
                              MailRepository mailRepository,
                              RecvMailboxRepository recvMailboxRepository,
                              SendMailboxRepository sendMailboxRepository,
                              UndoneMailboxRepository undoneMailboxRepository) {
        this.memberService = memberService;
        this.mailRepository = mailRepository;
        this.recvMailboxRepository = recvMailboxRepository;
        this.sendMailboxRepository = sendMailboxRepository;
        this.undoneMailboxRepository = undoneMailboxRepository;
    }

    @Override
    public List<Map<String,Object>> selectRecvMemberList() {
        Member cur_member = memberService.getMemberByAuthentication();

        List<Map<String,Object>> senders = recvMailboxRepository.countByOwnerAndSenderEmail(cur_member.getMemberId());

        for(Map<String,Object> sender : senders) {
            Member member = memberService.findMemberByEmail((String)sender.get("email"));
            sender.remove("email");
            sender.put("name", member.getName());
            sender.put("sender_id", member.getMemberId());
        }

        return senders;
    }

    @Override
    public List<MailBoxDto.recvMailInfo> selectRecvMail(Long senderId) {
        Member cur_member = memberService.getMemberByAuthentication();

        List<RecvMailbox> rmb = recvMailboxRepository.findByOwnerAndSenderId(cur_member.getMemberId(),senderId);
        List<MailBoxDto.recvMailInfo> mailInfos = new ArrayList<>();

        for(RecvMailbox mail : rmb) {
            mailInfos.add(new MailBoxDto.recvMailInfo(
                    mail.getMail().getMailId(),
                    mail.getMail().getSenderName(),
                    mail.getMail().getSenderEmail(),
                    mail.getMail().getCreatedDate(),
                    mail.getMail().getTitle(),
                    mail.getMail().getMailType(),
                    mail.getMail().getStyleUrl()
            ));
        }

        return mailInfos;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRecvMail(Long mailId) {
        Member cur_member = memberService.getMemberByAuthentication();

        int res1 = recvMailboxRepository.deleteByOwnerAndMailId(cur_member.getMemberId(),mailId);
        validateChangeMade(res1, "받은 메일 삭제");

        Mail mail = mailRepository.findByMailId(mailId)
                .orElseThrow(()-> new ValueNotExistException("편지가 존재하지 않습니다."));

        if(mail.getExistCnt() == (byte) 2) {
            mail.updateExistCnt((byte) 1);
        }
        else {
            int res2 = mailRepository.deleteByMailId(mail.getMailId());
            validateChangeMade(res2, "메일 삭제");
        }
    }

    @Override
    public List<MailBoxDto.sendMailInfo> selectSendMail() {
        Member cur_member = memberService.getMemberByAuthentication();

        List<SendMailbox> smb = sendMailboxRepository.findByOwner(cur_member.getMemberId());
        List<MailBoxDto.sendMailInfo> mailInfo = new ArrayList<>();

        for(SendMailbox mail : smb) {
            mailInfo.add(new MailBoxDto.sendMailInfo(
                    mail.getMail().getMailId(),
                    mail.getMail().getReceiverName(),
                    mail.getMail().getReceiverEmail(),
                    mail.getMail().getCreatedDate(),
                    mail.getMail().getTitle(),
                    mail.getMail().getMailType(),
                    mail.getMail().getStyleUrl()
            ));
        }

        return mailInfo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteSendMail(Long mailId) {
        Member cur_member = memberService.getMemberByAuthentication();

        int res1 = sendMailboxRepository.deleteByOwnerAndMailId(cur_member.getMemberId(),mailId);
        validateChangeMade(res1, "보낸 메일 삭제");

        Mail mail = mailRepository.findByMailId(mailId)
                .orElseThrow(()-> new ValueNotExistException("편지가 존재하지 않습니다."));

        if(mail.getExistCnt() == (byte) 2) {
            mail.updateExistCnt((byte) 1);
        }
        else {
            int res2 = mailRepository.deleteByMailId(mail.getMailId());
            validateChangeMade(res2, "메일 삭제");
        }
    }

    @Override
    public List<MailBoxDto.sendMailInfo> selectUndoneMail() {
        Member cur_member = memberService.getMemberByAuthentication();

        List<UndoneMailbox> smb = undoneMailboxRepository.findByOwner(cur_member.getMemberId());
        List<MailBoxDto.sendMailInfo> mailInfo = new ArrayList<>();

        for(UndoneMailbox mail : smb) {
            mailInfo.add(new MailBoxDto.sendMailInfo(
                    mail.getMail().getMailId(),
                    mail.getMail().getReceiverName(),
                    mail.getMail().getReceiverEmail(),
                    mail.getMail().getCreatedDate(),
                    mail.getMail().getTitle(),
                    mail.getMail().getMailType(),
                    mail.getMail().getStyleUrl()
            ));
        }

        return mailInfo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteUndoneMail(Long mailId) {
        Member cur_member = memberService.getMemberByAuthentication();

        int res1 = undoneMailboxRepository.deleteByOwnerAndMailId(cur_member.getMemberId(),mailId);
        validateChangeMade(res1, "임시 메일 삭제");

        int res2 = mailRepository.deleteByMailId(mailId);
        validateChangeMade(res2, "메일 삭제");
    }

    private void validateChangeMade(int res, String func) {
        if(res == 0) {
            throw new ChangeNotMadeException(func + " 요청이 처리되지 않았습니다.");
        }
    }
}
