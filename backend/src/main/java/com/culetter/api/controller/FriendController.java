package com.culetter.api.controller;

import com.culetter.api.dto.FriendDto;
import com.culetter.api.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/friends")
public class FriendController {

    private final FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @GetMapping("")
    public ResponseEntity<Map<String, List<FriendDto.FriendResponse>>> getFriendList() {
        Map<String, List<FriendDto.FriendResponse>> mfr = new HashMap<>();
        mfr.put("friends", friendService.selectFriendList());

        return ResponseEntity.status(HttpStatus.OK).body(mfr);
    }

    @GetMapping("/request")
    public ResponseEntity<Map<String,List<FriendDto.FriendResponse>>> getFriendRequestList() {
        Map<String, List<FriendDto.FriendResponse>> mreq = new HashMap<>();
        mreq.put("requests", friendService.selectGetRequestList());

        return ResponseEntity.status(HttpStatus.OK).body(mreq);
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String,List<FriendDto.FriendResponse>>> searchMemberList(
            @RequestBody Map<String,String> email){
        Map<String, List<FriendDto.FriendResponse>> muser = new HashMap<>();
        muser.put("users", friendService.selectMemberList(email.get("email")));

        return ResponseEntity.status(HttpStatus.OK).body(muser);
    }

    @PostMapping("/request")
    public ResponseEntity<String> sendFriendRequest(@RequestBody Map<String,Long> memberId) {
        friendService.requestFriend(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 추가 요청 성공");
    }

    @PostMapping("/request/cancel")
    public ResponseEntity<String> cancelFriendRequest(@RequestBody Map<String,Long> memberId) {
        friendService.cancelRequest(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 추가 취소 요청 성공");
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestBody Map<String,Long> memberId) {
        friendService.acceptRequest(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 추가 요청 수락 성공");
    }

    @PostMapping("/decline")
    public ResponseEntity<String> declineFriendRequest(@RequestBody Map<String,Long> memberId) {
        friendService.declineRequest(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 추가 요청 거절 성공");
    }

    @PostMapping("/favorite")
    public ResponseEntity<String> updateFriendFavorite(@RequestBody Map<String,Long> memberId) {
        friendService.updateFavoriteFriend(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 즐겨찾기 성공");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@RequestBody Map<String,Long> memberId) {
        friendService.deleteFriend(memberId.get("member_id"));

        return ResponseEntity.status(HttpStatus.OK).body("친구 삭제 성공");
    }
}
