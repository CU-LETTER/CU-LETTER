package com.culetter.db.repository;

import com.culetter.db.entity.UndoneMailbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UndoneMailboxRepository extends JpaRepository<UndoneMailbox, Long> {
    @Query("select u from UndoneMailbox u where u.mail.mailId=:mailId")
    Optional<UndoneMailbox> findByMailId(@Param("mailId") Long mailId);

    @Modifying
    Integer deleteByUndoneId(Long undoneId);

    @Query("select um from UndoneMailbox um where um.member.memberId=:owner")
    List<UndoneMailbox> findByOwner(@Param("owner") Long memberId);

    @Modifying
    @Query("delete from UndoneMailbox um where um.member.memberId=:owner and um.mail.mailId=:mailId")
    Integer deleteByOwnerAndMailId(@Param("owner") Long memberId, @Param("mailId") Long mailId);
}
