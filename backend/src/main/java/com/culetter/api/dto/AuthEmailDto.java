package com.culetter.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AuthEmailDto {

    @Getter
    @NoArgsConstructor
    public static class EmailRequest {
        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;
    }

    @Getter
    @NoArgsConstructor
    public static class AuthEmailRequest {
        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;
        @NotBlank(message = "인증코드를 입력해주세요.(null 또는 공백X)")
        private String code;
    }

}
