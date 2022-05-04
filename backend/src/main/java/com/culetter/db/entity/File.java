package com.culetter.db.entity;

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
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;
    private String type;
    private String name;
    private String url;
    private Float happy;
    private Float angry;
    private Float sad;
    private Float panic;

    @Builder
    public File(String type, String name, String url, Float happy, Float angry, Float sad, Float panic) {
        this.type = type;
        this.name = name;
        this.url = url;
        this.happy = happy;
        this.angry = angry;
        this.sad = sad;
        this.panic = panic;
    }
}
