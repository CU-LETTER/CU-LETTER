package com.culetter.db.entity;

import com.culetter.common.util.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean isFavorite;
    private Byte status;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member")
    private Member fromMember;
    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member")
    private Member toMember;

    @Builder
    public Friend(Boolean isFavorite, Byte status, Member fromMember, Member toMember) {
        this.isFavorite = isFavorite;
        this.status = status;
        this.fromMember = fromMember;
        this.toMember = toMember;
    }

    public void updateFavorite(Boolean isFavorite){
        this.isFavorite = !isFavorite;
    }
}