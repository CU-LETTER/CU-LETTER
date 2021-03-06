package com.culetter.api.service;

import com.culetter.api.dto.FriendDto;
import com.culetter.db.entity.Friend;
import com.culetter.db.entity.Member;
import com.culetter.db.repository.FriendRepository;
import com.culetter.exception.member.ChangeNotMadeException;
import com.culetter.exception.member.ValueNotExistException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final MemberService memberService;

    public FriendServiceImpl(FriendRepository friendRepository, MemberService memberService) {
        this.friendRepository = friendRepository;
        this.memberService = memberService;
    }

    @Override
    public List<FriendDto.FriendResponse> selectFriendList() {
        Member cur_member = memberService.getMemberByAuthentication();

        List<FriendDto.FriendResponse> friendResponse = new ArrayList<>();

        for(Friend f : friendRepository.findByFriend(cur_member.getMemberId())) {
            friendResponse.add(new FriendDto.FriendResponse(
                    f.getToMember().getMemberId(),
                    f.getToMember().getEmail(),
                    f.getToMember().getName(),
                    f.getToMember().getProfileImage(),
                    f.getIsFavorite(),
                    (byte) 3
            ));
        }

        return friendResponse;
    }

    @Override
    public List<FriendDto.FriendResponse> selectGetRequestList() {
        Member cur_member = memberService.getMemberByAuthentication();

        List<FriendDto.FriendResponse> requestResponse = new ArrayList<>();

        for(Friend req : friendRepository.findByFriendRequest(cur_member.getMemberId())) {
            requestResponse.add(new FriendDto.FriendResponse(
                    req.getFromMember().getMemberId(),
                    req.getFromMember().getEmail(),
                    req.getFromMember().getName(),
                    req.getFromMember().getProfileImage(),
                    req.getIsFavorite(),
                    (byte) 2
            ));
        }
        return requestResponse;
    }

    @Override
    public List<FriendDto.FriendResponse> selectMemberList(String email) {
        List<FriendDto.FriendResponse> memberResponse = new ArrayList<>();

        Member cur_member = memberService.getMemberByAuthentication();

        for(Member m : friendRepository.findByEmail(email)) {
            if(cur_member.getMemberId().equals(m.getMemberId())) continue;

            boolean favorite = false;
            byte friend_status = 0;

            //?????? ???????????? ?????? ????????? ????????????
            Optional<Friend> relation = friendRepository.findByRequest(cur_member.getMemberId(), m.getMemberId());

            if(relation.isPresent()){
                favorite = relation.get().getIsFavorite();

                //?????? ?????? ?????? ???????????? ????????? ????????? ?????????
                if(relation.get().getStatus() == 0) friend_status = 1;
                //?????? ?????????
                else friend_status = 3;
            }
            //?????? ?????? ????????? ??????
            else {
                //?????? ???????????? ?????? ????????? ????????????
                relation = friendRepository.findByRequest(m.getMemberId(),cur_member.getMemberId());
                //?????? ?????? ?????? ????????????
                if (relation.isPresent()) {
                    favorite = relation.get().getIsFavorite();
                    friend_status = 2;
                }
            }

            memberResponse.add(new FriendDto.FriendResponse(
                    m.getMemberId(),
                    m.getEmail(),
                    m.getName(),
                    m.getProfileImage(),
                    favorite,
                    friend_status
            ));
        }

        return memberResponse;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void requestFriend(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("???????????? ?????? ??????????????????."));

        Optional<Friend> existCurReq = friendRepository.findByRequest(cur_member.getMemberId(),req_member.getMemberId());
        Optional<Friend> existReqCur = friendRepository.findByRequest(req_member.getMemberId(),cur_member.getMemberId());

        if(!existCurReq.isPresent() && !existReqCur.isPresent()){
            friendRepository.save(Friend.builder()
                    .isFavorite(false)
                    .status((byte) 0)
                    .fromMember(cur_member)
                    .toMember(req_member)
                    .build());
        }
        else{
            validateChangeMade(0,"?????? ??????");
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void cancelRequest(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("???????????? ?????? ??????????????????."));

        Optional<Friend> existCurReq = friendRepository.findByRequest(cur_member.getMemberId(),req_member.getMemberId());

        if(existCurReq.isPresent()){
            int res = friendRepository.deleteByFromFriend(cur_member.getMemberId(),req_member.getMemberId());

            validateChangeMade(res,"?????? ?????? ??????");
        }
        else {
            throw new ValueNotExistException("???????????? ?????? ???????????????.");
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void acceptRequest(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("???????????? ?????? ??????????????????."));

        Friend cur_stat = friendRepository.findByRequest(req_member.getMemberId(),cur_member.getMemberId())
                .orElseThrow(() -> new ValueNotExistException("???????????? ?????? ?????? ???????????????."));
        int res = friendRepository.updateByFriendId(cur_stat.getFriendId(), (byte) 1);

        validateChangeMade(res,"?????? ?????? ??????");

        if(!friendRepository.findByRequest(cur_member.getMemberId(),req_member.getMemberId()).isPresent()){
            friendRepository.save(Friend.builder()
                    .isFavorite(false)
                    .status((byte) 1)
                    .fromMember(cur_member)
                    .toMember(req_member)
                    .build()
            );
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void declineRequest(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("???????????? ?????? ??????????????????."));

        int res = friendRepository.deleteByFromFriend(req_member.getMemberId(), cur_member.getMemberId());

        validateChangeMade(res,"?????? ?????? ??????");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateFavoriteFriend(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Friend friend = friendRepository.findByRequest(cur_member.getMemberId(),memberId)
                .orElseThrow(()-> new ValueNotExistException("???????????? ?????? ??????????????????."));

        friend.updateFavorite(friend.getIsFavorite());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteFriend(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("???????????? ?????? ??????????????????."));

        int res1 = friendRepository.deleteByFromFriend(cur_member.getMemberId(), req_member.getMemberId());
        int res2 = friendRepository.deleteByToFriend(req_member.getMemberId(), cur_member.getMemberId());

        validateChangeMade(res1,"?????? ??????");
        validateChangeMade(res2,"?????? ??????");
    }

    private void validateChangeMade(int res, String func) {
        if(res == 0) {
            throw new ChangeNotMadeException(func + " ????????? ???????????? ???????????????.");
        }
    }
}
