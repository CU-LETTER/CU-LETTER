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

            //현재 사용자가 친구 요청을 보냈는가
            Optional<Friend> relation = friendRepository.findByRequest(cur_member.getMemberId(), m.getMemberId());

            if(relation.isPresent()){
                favorite = relation.get().getIsFavorite();

                //친구 요청 보낸 상태이다 하지만 수락은 못받음
                if(relation.get().getStatus() == 0) friend_status = 1;
                //이미 친구다
                else friend_status = 3;
            }
            //친구 요청 한적이 없다
            else {
                //현재 사용자가 친구 요청을 받았는가
                relation = friendRepository.findByRequest(m.getMemberId(),cur_member.getMemberId());
                //친구 요청 받은 상태이다
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
                () -> new ValueNotExistException("존재하지 않는 사용자입니다."));

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
            validateChangeMade(0,"친구 추가");
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void cancelRequest(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("존재하지 않는 사용자입니다."));

        Optional<Friend> existCurReq = friendRepository.findByRequest(cur_member.getMemberId(),req_member.getMemberId());

        if(existCurReq.isPresent()){
            int res = friendRepository.deleteByFromFriend(cur_member.getMemberId(),req_member.getMemberId());

            validateChangeMade(res,"친구 추가 신청");
        }
        else {
            throw new ValueNotExistException("존재하지 않는 관계입니다.");
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void acceptRequest(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("존재하지 않는 사용자입니다."));

        Friend cur_stat = friendRepository.findByRequest(req_member.getMemberId(),cur_member.getMemberId())
                .orElseThrow(() -> new ValueNotExistException("존재하지 않는 친구 요청입니다."));
        int res = friendRepository.updateByFriendId(cur_stat.getFriendId(), (byte) 1);

        validateChangeMade(res,"친구 추가 수락");

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
                () -> new ValueNotExistException("존재하지 않는 사용자입니다."));

        int res = friendRepository.deleteByFromFriend(req_member.getMemberId(), cur_member.getMemberId());

        validateChangeMade(res,"친구 추가 거절");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateFavoriteFriend(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Friend friend = friendRepository.findByRequest(cur_member.getMemberId(),memberId)
                .orElseThrow(()-> new ValueNotExistException("존재하지 않는 사용자입니다."));

        friend.updateFavorite(friend.getIsFavorite());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteFriend(Long memberId) {
        Member cur_member = memberService.getMemberByAuthentication();
        Member req_member = friendRepository.findByMemberId(memberId).orElseThrow(
                () -> new ValueNotExistException("존재하지 않는 사용자입니다."));

        int res1 = friendRepository.deleteByFromFriend(cur_member.getMemberId(), req_member.getMemberId());
        int res2 = friendRepository.deleteByToFriend(req_member.getMemberId(), cur_member.getMemberId());

        validateChangeMade(res1,"친구 삭제");
        validateChangeMade(res2,"친구 삭제");
    }

    private void validateChangeMade(int res, String func) {
        if(res == 0) {
            throw new ChangeNotMadeException(func + " 요청이 처리되지 않았습니다.");
        }
    }
}
