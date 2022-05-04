package com.culetter.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class FriendDto {

    @Getter
    @AllArgsConstructor
    public static class FriendResponse {
        private Long member_id;
        private String email;
        private String name;
        private String profile_image;
        private Boolean favorite;
        private Byte friend_status;
    }

}
