package com.culetter.db.entity;

import com.culetter.common.util.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailId;
    private String code;
    private Long senderId;
    private String senderEmail;
    private String senderName;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean isRead;
    private String receiverEmail;
    private String receiverName;
    private Byte existCnt;
    private String mailType;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String styleUrl;
    private String musicTitle;
    private String musicUrl;
    private String image;
    private String contentPosition;
    @Column(columnDefinition = "TEXT")
    private String stickers;
    private String fontOrder;
    private String fontType;
    private Byte fontColor;
    private Byte fontSize;
    private Byte backgroundColor;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean isFontBold;
    private Byte underlineColor;
    private String handwriteImage;

    @CreatedDate
    private LocalDateTime createdDate;

    @Builder
    public Mail(String code, Long senderId, String senderEmail, String senderName, Boolean isRead, String receiverEmail,
                String receiverName, Byte existCnt, String mailType, String title, String content, String styleUrl,
                String musicTitle, String musicUrl, String image, String contentPosition,
                String stickers, String fontOrder, String fontType, Byte fontColor, Byte fontSize,
                Byte backgroundColor, Boolean isFontBold, Byte underlineColor, String handwriteImage, LocalDateTime createdDate) {
        this.code = code;
        this.senderId = senderId;
        this.senderEmail = senderEmail;
        this.senderName = senderName;
        this.isRead = isRead;
        this.receiverEmail = receiverEmail;
        this.receiverName = receiverName;
        this.existCnt = existCnt;
        this.mailType = mailType;
        this.title = title;
        this.content = content;
        this.styleUrl = styleUrl;
        this.musicTitle = musicTitle;
        this.musicUrl = musicUrl;
        this.image = image;
        this.contentPosition = contentPosition;
        this.stickers = stickers;
        this.fontOrder = fontOrder;
        this.fontType = fontType;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
        this.backgroundColor = backgroundColor;
        this.isFontBold = isFontBold;
        this.underlineColor = underlineColor;
        this.handwriteImage = handwriteImage;
        this.createdDate = createdDate;
    }

    public void updateIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public void updateExistCnt(Byte existCnt) {
        this.existCnt = existCnt;
    }

    public void updateTempMail(String receiverEmail, String receiverName, String title,
                               String mailType, String mailStyle, String content,
                               String musicTitle, String musicUrl,
                               String image, String contentPosition, String stickers,
                               String fontOrder, String fontType, Byte fontColor, Byte fontSize,
                               Byte backgroundColor, Boolean isFontBold,
                               Byte underlineColor, String handwriteImage){
        this.receiverEmail = receiverEmail;
        this.receiverName = receiverName;
        this.title = title;
        this.mailType = mailType;
        this.styleUrl = mailStyle;
        this.content = content;
        this.musicTitle = musicTitle;
        this.musicUrl = musicUrl;
        this.image = image;
        this.contentPosition = contentPosition;
        this.stickers = stickers;
        this.fontOrder = fontOrder;
        this.fontType = fontType;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
        this.backgroundColor = backgroundColor;
        this.isFontBold = isFontBold;
        this.underlineColor = underlineColor;
        this.handwriteImage = handwriteImage;
    }

//    @OneToOne(mappedBy = "mail")
//    RecvMailbox recvMailbox;
//    @OneToOne(mappedBy = "mail")
//    SendMailbox sendMailbox;
//    @OneToOne(mappedBy = "mail")
//    UndoneMailbox undoneMailbox;
//    @OneToOne(mappedBy = "mail")
//    TimeMailbox timeMailbox;
}