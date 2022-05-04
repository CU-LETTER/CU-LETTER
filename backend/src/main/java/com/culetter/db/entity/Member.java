package com.culetter.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String kakaoId;
    private Byte status;
    private String name;
    private String profileImage;
    @CreatedDate
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime updatedDate;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Builder
    public Member(String email, String kakaoId, Byte status, String name, String profileImage,
                  LocalDateTime createdDate, LocalDateTime updatedDate, String password) {
        this.email = email;
        this.kakaoId = kakaoId;
        this.status = status;   // 비회원: 0, 회원: 1, 관리자: 2
        this.name = name;
        this.profileImage = profileImage;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.password = password;
    }

    @OneToMany(mappedBy = "member")
    List<RecvMailbox> recvMailboxList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<SendMailbox> sendMailboxList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<UndoneMailbox> undoneMailboxList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<TimeMailbox> timeMailboxList = new ArrayList<>();
    @OneToMany(mappedBy = "fromMember")
    List<Friend> fromFriendList = new ArrayList<>();
    @OneToMany(mappedBy = "toMember")
    List<Friend> toFriendList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<ShortMail> shortMailList = new ArrayList<>();

    public void argsNullSetter() {
        this.email = null;
        this.kakaoId = null;
        this.status = null;
        this.name = null;
        this.profileImage = null;
        this.createdDate = null;
        this.updatedDate = null;
        this.password = null;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateName(String name) { this.name = name; }

    public void updateProfileImage(String profileImage) { this.profileImage = profileImage; }
}
