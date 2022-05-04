package com.culetter.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class MailBoxDto {

    @Getter
    @AllArgsConstructor
    public static class recvMailBoxDto {
        private Long recv_id;
        private String owner;
        private Long mail_id;
    }

    @Getter
    @AllArgsConstructor
    public static class sendMailBoxDto {
        private Long send_id;
        private String owner;
        private Long mail_id;
    }

    @Getter
    @AllArgsConstructor
    public static class unDoneMailBoxDto {
        private Long undone_id;
        private String owner;
        private Long mail_id;
    }

    @Getter
    @AllArgsConstructor
    public static class recvMailInfo {
        private Long mail_id;
        private String sender_name;
        private String sender_email;
        private LocalDateTime created_date;
        private String title;
        private String mail_type;
        private String style_url;
    }

    @Getter
    @AllArgsConstructor
    public static class sendMailInfo {
        private Long mail_id;
        private String receiver_name;
        private String receiver_email;
        private LocalDateTime created_date;
        private String title;
        private String mail_type;
        private String style_url;
    }

    @Getter
    @AllArgsConstructor
    public static class rollingMailBoxDto {
        private Long rolling_id;
        private String code;
        private LocalDateTime created_date;
        private Long short_id;
        private String owner;
    }

    @Getter
    @AllArgsConstructor
    public static class timeMailBoxDto {
        private Long time_id;
        private LocalDateTime unlock_date;
        private Long mail_id;
        private String owner;
    }

}
