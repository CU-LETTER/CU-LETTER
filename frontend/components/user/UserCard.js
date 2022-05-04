import React, { useContext, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import {
  requestFriend,
  requestCancelFriend,
  acceptFriend,
  declineFriend,
  getFriends,
  lookUpRequest,
  searchUsers,
  deleteFriend,
  setfavoriteFriend,
} from "../../components/apis/user";
import LetterContext from "../../contexts/LetterContext";
import Router from "next/router";

export default function UserCard(props) {
  const { memberId, setMemberId, setReceiverName, setReceiverEmail } =
    useContext(LetterContext);

  const HandleFriendAcceptClick = (e, obj) => {
    e.preventDefault();
    acceptFriend(obj.member_id).then((res) => {
      if (res.status === 200) {
        getFriends().then((res) => {
          props.setUserFriends(res.data.friends);
        });
        lookUpRequest().then((res) => {
          props.setIncomingFriends(res.data.requests);
        });
        searchUsers(props.searchMemberId).then((res) => {
          props.setSearchedMembers(res.data.users);
        });
      }
    });
  };

  const HandleFriendRejectClick = (e, obj) => {
    e.preventDefault();
    declineFriend(obj.member_id).then((res) => {
      if (res.status === 200) {
        lookUpRequest().then((res) => {
          props.setIncomingFriends(res.data.requests);
        });
        searchUsers(props.searchMemberId).then((res) => {
          props.setSearchedMembers(res.data.users);
        });
      }
    });
  };

  const handleMailClick = (e, obj) => {
    e.preventDefault();
    setMemberId(obj.member_id);
    setReceiverName(obj.name);
    setReceiverEmail(obj.email);
    Router.push("/letter/type");
  };

  const handleFriendFavoriteClick = (e, obj) => {
    e.preventDefault();
    // 그거 부분
    setfavoriteFriend(obj.member_id).then((res) => {
      if (res.status === 200) {
        getFriends().then((res) => {
          props.setUserFriends(res.data.friends);
        });
        lookUpRequest().then((res) => {
          props.setIncomingFriends(res.data.requests);
        });
        searchUsers(props.searchMemberId).then((res) => {
          props.setSearchedMembers(res.data.users);
        });
      }
    });
  };

  const handleFriendDeleteClick = (e, obj) => {
    e.preventDefault();
    deleteFriend(obj.member_id).then((res) => {
      if (res.status === 200) {
        getFriends().then((res) => {
          props.setUserFriends(res.data.friends);
        });
        searchUsers(props.searchMemberId).then((res) => {
          props.setSearchedMembers(res.data.users);
        });
      }
    });
  };

  const HandleFriendRequestClick = (e, obj) => {
    requestFriend(obj.member_id)
      .then((res) => {
        if (res.status === 200) {
          const updatedMember = {
            member_id: obj.member_id,
            email: obj.email,
            name: obj.name,
            favorite: obj.favorite,
            friend_status: 1,
            profile_image: obj.profile_image,
          };
          props.setSearchedMembers((searchedMembers) =>
            searchedMembers.map((member) =>
              member.member_id === obj.member_id ? updatedMember : member
            )
          );
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const HandleFriendCancelClick = (e, obj) => {
    requestCancelFriend(obj.member_id).then((res) => {
      if (res.status === 200) {
        const updatedMember = {
          member_id: obj.member_id,
          email: obj.email,
          name: obj.name,
          favorite: obj.favorite,
          friend_status: 0,
          profile_image: obj.profile_image,
        };
        props.setSearchedMembers((searchedMembers) =>
          searchedMembers.map((member) =>
            member.member_id === obj.member_id ? updatedMember : member
          )
        );
      }
    });
  };
  const responsiveButton = (user) => {
    switch (user.friend_status) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              mx: "auto",
              width: 0.4,
              minWidth: 142,
            }}
          >
            <Button
              sx={{
                fontSize: 10,
                borderRadius: 3,
                height: 25,
                mr: "0.5rem",
                fontFamily: "Gowun Batang",
              }}
              variant="contained"
              color="error"
              size="small"
              startIcon={<PersonIcon />}
              onClick={(e) => HandleFriendRequestClick(e, props.obj)}
            >
              친구 요청
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              mx: "auto",
              minWidth: 142,
              width: 0.4,
            }}
          >
            <Button
              sx={{
                fontSize: 10,
                borderRadius: 3,

                height: 25,
                mr: "0.5rem",
                fontFamily: "Gowun Batang",
              }}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => HandleFriendCancelClick(e, props.obj)}
            >
              요청 취소
            </Button>
          </Box>
        );
        break;
      case 2:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mx: "auto",
            }}
          >
            <Button
              sx={{
                fontSize: 10,
                borderRadius: 3,
                height: 25,
                mr: "0.5rem",
                fontFamily: "Gowun Batang",
              }}
              variant="contained"
              color="error"
              size="small"
              startIcon={<PersonIcon />}
              onClick={(e) => HandleFriendAcceptClick(e, props.obj)}
            >
              수락
            </Button>
            <Button
              sx={{
                fontSize: 10,
                borderRadius: 3,
                height: 25,
                fontFamily: "Gowun Batang",
              }}
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => HandleFriendRejectClick(e, props.obj)}
            >
              거절
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              ml: "1rem",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "end",

              width: 0.4,
            }}
          >
            <IconButton size="" onClick={(e) => handleMailClick(e, props.obj)}>
              <MailIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size=""
              onClick={(e) => handleFriendFavoriteClick(e, props.obj)}
              color={props.obj.favorite ? "warning" : "default"}
            >
              <StarIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size=""
              onClick={(e) => handleFriendDeleteClick(e, props.obj)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        );
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: "1rem",
        }}
      >
        {props.obj.profile_image ? (
          <Box
            sx={{
              width: 37,
              height: 35,
              mx: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: "2px",
            }}
          >
            <img
              src={props.obj.profile_image}
              style={{
                display: "block",
                width: 29,
                height: 29,
                borderRadius: "50%",
                border: "1px solid black",
                textAlign: "center",
              }}
            />
          </Box>
        ) : (
          <AccountCircleIcon
            sx={{ mx: "1rem", alignSelf: "center", fontSize: 35 }}
          />
        )}
        <Box
          sx={{
            width: 170,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontFamily: "Gowun Batang" }}>
            {props.obj.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              textDecoration: "underline",
              fontFamily: "Gowun Batang",
            }}
          >
            {props.obj.email}
          </Typography>
        </Box>
        {responsiveButton(props.obj)}
      </Box>
    </>
  );
}
