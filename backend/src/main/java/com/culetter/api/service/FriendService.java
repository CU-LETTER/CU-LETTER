package com.culetter.api.service;

import com.culetter.api.dto.FriendDto;

import java.util.List;

public interface FriendService {
    List<FriendDto.FriendResponse> selectFriendList();
    List<FriendDto.FriendResponse> selectGetRequestList();
    List<FriendDto.FriendResponse> selectMemberList(String email);
    void requestFriend(Long memberId);
    void cancelRequest(Long memberId);
    void acceptRequest(Long memberId);
    void declineRequest(Long memberId);
    void updateFavoriteFriend(Long memberId);
    void deleteFriend(Long memberId);
}
