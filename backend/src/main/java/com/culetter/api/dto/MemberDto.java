package com.culetter.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

public class MemberDto {

    @Getter
    @NoArgsConstructor
    public static class SignupRequest {
        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;

        @NotBlank(message = "비밀번호 입력은 필수입니다.")
        @Size(min = 8, max = 16, message = "올바른 비밀번호 형식(8자이상 16자이하)이 아닙니다.")
        private String password;

        @NotBlank(message = "이름 입력은 필수입니다.")
        @Pattern(regexp = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$", message = "올바른 이름 형식(한글/영문/숫자를 포함할 수 있음)이 아닙니다.")
        @Size(min = 2, max = 12, message = "올바른 이름 형식(2자이상 12자이하)이 아닙니다.")
        private String name;
    }

    @Getter
    @NoArgsConstructor
    public static class SigninRequest {
        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;
        @NotBlank(message = "비밀번호 입력은 필수입니다.")
        @Size(min = 8, max = 16, message = "올바른 비밀번호 형식(8자이상 16자이하)이 아닙니다.")
        private String password;
    }

    @Getter
    @NoArgsConstructor
    public static class InfoRequest {
        @NotBlank(message = "이름 입력은 필수입니다.")
        @Pattern(regexp = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$", message = "올바른 이름 형식(한글/영문/숫자를 포함할 수 있음)이 아닙니다.")
        @Size(min = 2, max = 12, message = "올바른 이름 형식(2자이상 12자이하)이 아닙니다.")
        private String name;
    }

    @Getter
    @NoArgsConstructor
    public static class PasswordRequest {
        @NotBlank(message = "비밀번호 입력은 필수입니다.")
        @Size(min = 8, max = 16, message = "올바른 비밀번호 형식(8자이상 16자이하)이 아닙니다.")
        private String password;
    }

    @Getter
    @NoArgsConstructor
    public static class PasswordResetRequest {
        @NotBlank(message = "이메일 입력은 필수입니다.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private String email;
        private String name;
        private String profileImage;
    }

}
