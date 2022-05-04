package com.culetter.api.service;

import com.culetter.common.util.MailUtil;
import com.culetter.db.entity.AuthEmail;
import com.culetter.db.entity.Member;
import com.culetter.db.repository.AuthEmailRepository;
import com.culetter.db.repository.MemberRepository;
import com.culetter.exception.member.AuthEmailNotFoundException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AuthEmailServiceImpl implements AuthEmailService {

    private final AuthEmailRepository authEmailRepository;
    private final MemberRepository memberRepository;
    private final MailUtil mailUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthEmailServiceImpl(AuthEmailRepository authEmailRepository,
                                MemberRepository memberRepository,
                                MailUtil mailUtil,
                                PasswordEncoder passwordEncoder
    ) {
        this.authEmailRepository = authEmailRepository;
        this.memberRepository = memberRepository;
        this.mailUtil = mailUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void sendAuthEmail(String email) {
        String code = generateCode(8);
        AuthEmail authEmail = AuthEmail.builder()
                .email(email)
                .code(code)
                .build();
        mailUtil.sendEmail(email, "[CU;LETTER] 이메일 인증코드 발송",
                "<div class=\"container\" style=\"text-align: center; max-width: 500px; margin-top: 50px; font-family: 'Noto Sans KR';\n" +
                        "    font-size: 14px; font-weight: 500;\">\n" +
                        "      <hr style=\"background-color: #334666; width: 90%; height: 3px; border: none;\">\n" +
                        "      <img src=\"https://ifh.cc/g/vXsW61.png\" alt=\"\" \n" +
                        "      style=\"width:100px; margin-top: 40px; margin-bottom: 20px;\">\n" +
                        "      <p>CU;LETTER 회원가입을 환영합니다. \uD83D\uDC99</p>\n" +
                        "      <p\">아래의 인증코드를 입력한 후, 회원가입 절차를 진행해주세요!</p>\n" +
                        "      <div style=\"background-color: #dce1e9; width: 50%; display: inline-block; border-radius: 10px; margin: 20px;\">\n" +
                        "        <p style=\"font-size: 16px; font-weight: 700;\">" + code + "</p>\n" +
                        "      </div>\n" +
                        "      <p>CU;LETTER를 이용해주셔서 감사합니다.</p>\n" +
                        "      <hr style=\"background-color: #334666; height: 3px; border: none; margin-top: 40px;\">\n" +
                        "    </div>");
        authEmailRepository.save(authEmail);
    }

    @Override
    public boolean checkCode(String email, String code) {
        AuthEmail authEmail = authEmailRepository.findFirstByEmailOrderByAuthEmailIdDesc(email)
                .orElseThrow(() -> new AuthEmailNotFoundException("인증 요청을 보내지 않은 이메일입니다."));
        return authEmail.getCode().equals(code);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void sendTempPassword(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email + "은(는) 존재하지 않는 회원입니다."));
        String tempPassword = generateCode(12);
        mailUtil.sendEmail(email, "[CU;LETTER] 임시 비밀번호 발송",
                "<div class=\"container\" style=\"text-align: center; width: 100%; max-width: 500px; margin-top: 50px; font-family: 'Noto Sans KR';\n" +
                        "    font-size: 14px; font-weight: 500;\">\n" +
                        "      <hr style=\"background-color: #334666;  height: 3px; border: none;\">\n" +
                        "      <img src=\"https://ifh.cc/g/vXsW61.png\" alt=\"\" \n" +
                        "      style=\"width:100px; margin-top: 40px; margin-bottom: 20px;\">\n" +
                        "      <p>안녕하세요. CU;LETTER 임시 비밀번호 안내 이메일입니다. \uD83D\uDC99</p>\n" +
                        "      <p\">아래의 임시 비밀번호로 로그인 후, 비밀번호를 변경해 주시길 바랍니다.</p>\n" +
                        "      <div style=\"background-color: #dce1e9; width: 50%; display: inline-block; border-radius: 10px; margin: 20px;\">\n" +
                        "        <p style=\"font-size: 16px; font-weight: 700;\">" + tempPassword + "</p>\n" +
                        "      </div>\n" +
                        "      <p>CU;LETTER를 이용해주셔서 감사합니다.</p>\n" +
                        "      <hr style=\"background-color: #334666; height: 3px; border: none; margin-top: 40px;\">\n" +
                        "    </div>");
        member.updatePassword(passwordEncoder.encode(tempPassword));
    }

    private String generateCode(int size) {
        return RandomStringUtils.randomAlphanumeric(size);
    }
}
