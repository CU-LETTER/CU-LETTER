package com.culetter.api.controller;

import com.culetter.api.dto.MemberDto;
import com.culetter.api.service.MemberService;
import com.culetter.common.jwt.JwtFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<String> signupMember(@Valid @RequestBody MemberDto.SignupRequest signupRequest) {
        memberService.insertMember(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입에 성공했습니다.");
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String,String>> signinMember(@Valid @RequestBody MemberDto.SigninRequest signinRequest) {
        Map<String,String> map = memberService.authenticateMember(signinRequest.getEmail(), signinRequest.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + map.get("jwt"));
        map.remove("jwt");
        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(map);
    }

    @GetMapping
    public ResponseEntity<MemberDto.Response> getMember() {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.getMemberInfoByAuthentication());
    }

//    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity<String> modifyMember(@Valid @RequestPart(value = "info") MemberDto.InfoRequest infoRequest,
//                                               @RequestPart(value = "profileImage", required = false) MultipartFile multipartFile) {
//        log.debug("modifyMember - {}", multipartFile.isEmpty());
//        memberService.updateMember(infoRequest, multipartFile);
//        return ResponseEntity.status(HttpStatus.OK).body("회원정보 변경이 완료되었습니다.");
//    }

    @PutMapping("/info")
    public ResponseEntity<String> modifyMemberInfo(@Valid @RequestBody MemberDto.InfoRequest infoRequest){
        memberService.updateMemberInfo(infoRequest);
        return ResponseEntity.status(HttpStatus.OK).body("회원정보 변경이 완료되었습니다.");
    }

    @PutMapping("/profile")
    public ResponseEntity<String> modifyMemberProfile(@RequestPart(value="profileImage") MultipartFile multipartFile){
        memberService.updateMemberProfile(multipartFile);
        return ResponseEntity.status(HttpStatus.OK).body("회원정보 변경이 완료되었습니다.");
    }

    @PostMapping("/pwcheck")
    public ResponseEntity<String> verifyPassword(@Valid @RequestBody MemberDto.PasswordRequest passwordRequest) {
        memberService.checkPassword(passwordRequest.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body("비밀번호가 확인되었습니다.");
    }

    @PatchMapping("/password")
    public ResponseEntity<String> modifyPassword(@Valid @RequestBody MemberDto.PasswordRequest passwordRequest) {
        memberService.updatePassword(passwordRequest.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body("비밀번호 변경이 완료되었습니다.");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteMember() {
        memberService.deleteMember();
        return ResponseEntity.status(HttpStatus.OK).body("회원탈퇴가 완료되었습니다.");
    }
}
