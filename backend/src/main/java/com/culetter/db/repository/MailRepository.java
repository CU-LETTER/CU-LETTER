package com.culetter.db.repository;

import com.culetter.db.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MailRepository extends JpaRepository<Mail, Long> {
    Optional<Mail> findByMailId(Long mailId);
    Optional<Mail> findByCode(String code);

    @Modifying
    @Query("delete from Mail m where m.mailId=:mailId")
    Integer deleteByMailId(@Param("mailId") Long mailId);
}
