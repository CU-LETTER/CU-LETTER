package com.culetter.api.service;

import com.culetter.api.dto.MemberDto;
import com.culetter.db.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface MemberService {
    void insertMember(MemberDto.SignupRequest signupRequest);
    Map<String,String> authenticateMember(String email, String password);
    Member getMemberByAuthentication();
    MemberDto.Response getMemberInfoByAuthentication();
    Member findMemberByEmail(String email);
    void updateMember(MemberDto.InfoRequest infoRequest, MultipartFile multipartFile);
    void updateMemberInfo(MemberDto.InfoRequest infoRequest);
    void updateMemberProfile(MultipartFile multipartFile);
    void checkPassword(String password);
    void updatePassword(String password);
    void deleteMember();
}
