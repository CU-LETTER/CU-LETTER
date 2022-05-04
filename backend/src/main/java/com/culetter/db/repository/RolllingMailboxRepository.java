package com.culetter.db.repository;

import com.culetter.db.entity.ShortMail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolllingMailboxRepository extends JpaRepository<ShortMail, Long> {

}
