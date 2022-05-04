package com.culetter.db.repository;

import com.culetter.db.entity.AuthEmail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthEmailRepository extends JpaRepository<AuthEmail, Long> {
    Optional<AuthEmail> findFirstByEmailOrderByAuthEmailIdDesc(String email);
}
