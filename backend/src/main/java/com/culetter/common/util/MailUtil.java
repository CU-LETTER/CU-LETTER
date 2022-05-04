package com.culetter.common.util;

import com.culetter.exception.member.AuthEmailMessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Component
public class MailUtil {

    private final JavaMailSender javaMailSender;
    private final String address;

    public MailUtil(JavaMailSender javaMailSender, @Value("${spring.mail.username}") String address) {
        this.javaMailSender = javaMailSender;
        this.address = address;
    }

    @Async
    public void sendEmail(String email, String subject, String htmlContent) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            message.setSubject(subject, "UTF-8");
            message.setText(htmlContent, "UTF-8", "html");
            message.setFrom(new InternetAddress(address));
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            javaMailSender.send(message);
        } catch (MessagingException | MailException e) {
            throw new AuthEmailMessagingException("인증 요청 메일 전송에 실패하였습니다.");
        }
    }

}
