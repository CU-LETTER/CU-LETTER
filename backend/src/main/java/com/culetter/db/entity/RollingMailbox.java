package com.culetter.db.entity;

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
public class RollingMailbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rollingId;
    private String code;
    @CreatedDate
    private LocalDateTime createdDate;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "owner")
    private Member member;
    @ManyToOne(targetEntity = ShortMail.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "short_id")
    private ShortMail shortMail;

    @Builder
    public RollingMailbox(String code, LocalDateTime createdDate, Member member, ShortMail shortMail) {
        this.code = code;
        this.createdDate = createdDate;
        this.member = member;
        this.shortMail = shortMail;
    }
}
