package com.culetter.db.repository;

import com.culetter.db.entity.Friend;
import com.culetter.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    //친구 조회
    @Query("select f from Friend f where f.fromMember.memberId=:memberId and f.status=1")
    List<Friend> findByFriend(@Param("memberId") Long memberId);

    //친구 요청 조회
    @Query("select r from Friend r where r.toMember.memberId=:memberId and r.status=0")
    List<Friend> findByFriendRequest(@Param("memberId") Long memberId);

    //email로 사용자 검색
    @Query("select m from Member m where m.email like %:email% and m.status=1")
    List<Member> findByEmail(@Param("email") String email);

    //사용자가 친구 요청을 받거나 보냄
    @Query("select f from Friend f where f.fromMember.memberId=:a and f.toMember.memberId=:b")
    Optional<Friend> findByRequest(@Param("a") Long from, @Param("b") Long to);

    //사용자 검색
    @Query("select m from Member m where m.memberId=:memberId and m.status=1")
    Optional<Member> findByMemberId(@Param("memberId") Long memberId);

    //정보 변경
    @Modifying
    @Query("update Friend f set f.status=:status where f.friendId=:friendId")
    Integer updateByFriendId(@Param("friendId") Long friendId, @Param("status") Byte status);

    //친구 삭제 A to B
    @Modifying
    @Query("delete from Friend f where f.fromMember.memberId=:a and f.toMember.memberId=:b")
    Integer deleteByFromFriend(@Param("a") Long fromMemberId, @Param("b") Long toMemberId);

    //친구 삭제 B to A
    @Modifying
    @Query("delete from Friend f where f.fromMember.memberId=:a and f.toMember.memberId=:b")
    Integer deleteByToFriend(@Param("a") Long toMemberId, @Param("b") Long fromMemberId);
}
