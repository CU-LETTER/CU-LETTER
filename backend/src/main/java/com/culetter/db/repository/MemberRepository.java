package com.culetter.db.repository;

import com.culetter.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("select m from Member m where (m.status=1 or m.status=2) and m.email=:email and m.kakaoId is null")
    Optional<Member> findByEmail(@Param("email") String email);
    @Query("select m from Member m where m.status=1 and m.kakaoId=:kakaoId")
    Optional<Member> findByKakaoId(@Param("kakaoId") String kakaoId);
    List<Member> findByName(String name);
}
