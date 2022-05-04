package com.culetter.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ShortMail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shortId;
    private String senderName;
    @Column(columnDefinition = "TEXT")
    private String content;
    private String mailStyle;
    private String fontType;
    @CreatedDate
    private LocalDateTime createdDate;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Member member;

    @Builder
    public ShortMail(String senderName, String content, String mailStyle, String fontType, LocalDateTime createdDate,
                     Member member) {
        this.senderName = senderName;
        this.content = content;
        this.mailStyle = mailStyle;
        this.fontType = fontType;
        this.createdDate = createdDate;
        this.member = member;
    }

    @OneToMany(mappedBy = "shortMail")
    List<RollingMailbox> rollingMailboxList = new ArrayList<>();
}
