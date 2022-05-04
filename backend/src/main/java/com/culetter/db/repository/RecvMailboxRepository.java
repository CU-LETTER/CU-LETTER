package com.culetter.db.repository;

import com.culetter.db.entity.Member;
import com.culetter.db.entity.RecvMailbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface RecvMailboxRepository extends JpaRepository<RecvMailbox, Long> {

    @Query("select new map (rm.mail.senderEmail as email, count(rm.mail.senderEmail) as count)" +
            "from RecvMailbox rm where rm.member.memberId=:owner group by rm.mail.senderEmail")
    List<Map<String,Object>> countByOwnerAndSenderEmail(@Param("owner") Long memberId);

    @Query("select rm from RecvMailbox rm where rm.member.memberId=:owner and rm.mail.senderId=:senderId")
    List<RecvMailbox> findByOwnerAndSenderId(@Param("owner") Long memberId, @Param("senderId") Long senderId);

    @Modifying
    @Query("delete from RecvMailbox rm where rm.member.memberId=:owner and rm.mail.mailId=:mailId")
    Integer deleteByOwnerAndMailId(@Param("owner") Long memberId, @Param("mailId") Long mailId);
}
