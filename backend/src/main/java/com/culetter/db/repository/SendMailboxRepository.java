package com.culetter.db.repository;

import com.culetter.db.entity.SendMailbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SendMailboxRepository extends JpaRepository<SendMailbox, Long> {

    @Query("select sm from SendMailbox sm where sm.member.memberId=:owner")
    List<SendMailbox> findByOwner(@Param("owner") Long memberId);

    @Modifying
    @Query("delete from SendMailbox sm where sm.member.memberId=:owner and sm.mail.mailId=:mailId")
    Integer deleteByOwnerAndMailId(@Param("owner") Long memberId, @Param("mailId") Long mailId);
}
