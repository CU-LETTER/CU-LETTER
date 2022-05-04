import { React, useState, useEffect } from "react";
import { Box, Typography, Divider, IconButton, Button } from "@mui/material";

import { landingBoxStyle } from "./index";
import MenuList from "../components/menu/MenuList";
import SearchBox from "../components/user/SearchBox";
import UserCard from "../components/user/UserCard";
import StarIcon from "@mui/icons-material/Star";
import { motion, AnimateSharedLayout } from "framer-motion";
import {
  lookUpRequest,
  getFriends,
  searchUsers,
} from "../components/apis/user";
import { authentication } from "../components/apis/auth";
import Header from "../components/Header";
import Router from "next/router";
function friends() {
  const [incomingFriends, setIncomingFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [searchFriendId, setSearchFriendId] = useState("");
  const [searchMemberId, setSearchMemberId] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    authentication();
    lookUpRequest()
      .then((res) => {
        setIncomingFriends(res.data.requests);
      })
      .catch((err) => {
        // console.log(err);
      });

    getFriends()
      .then((res) => {
        setUserFriends(res.data.friends);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(userFriends);
  // }, [userFriends]);
  const handlePrevClick = () => {
    if (addOpen) {
      setAddOpen(!addOpen);
    } else {
      Router.back();
    }
  };
  const handleAddFriendClick = (e) => {
    e.preventDefault();
    setSearchFriendId("");
    setSearchMemberId("");
    setAddOpen(!addOpen);
  };

  const handleShowFavoriteClick = (e) => {
    e.preventDefault();
    setFilterFavorite(!filterFavorite);
  };

  const handleSearchMemberClick = (e) => {
    e.preventDefault();
    searchUsers(searchMemberId).then((res) => {
      setSearchedMembers(res.data.users);
    });
  };

  return (
    <AnimateSharedLayout layout>
      <Box sx={{ width: 420, mx: "auto" }}>
        <Box
          sx={{
            ...landingBoxStyle,
            justifyContent: "start",
            alignItems: "start",
            height: 1,
            m: 0,
            minHeight: "100vh",
          }}
        >
          <Header
            title={addOpen ? "친구 추가" : "친구 목록"}
            handlePrevClick={handlePrevClick}
          />
          <MenuList />

          <Divider />
          {addOpen ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: 1,
              }}
            >
              <SearchBox
                id="searchMemberIdInput"
                label="아이디"
                width={225}
                onChange={(e) => setSearchMemberId(e)}
                searchMemberId={searchMemberId}
              />
              <Button
                sx={{ fontSize: 10, borderRadius: 2, height: 25, mr: "2rem" }}
                variant="contained"
                color="error"
                size="small"
                onClick={handleSearchMemberClick}
              >
                검색
              </Button>
            </Box>
          ) : (
            <SearchBox
              id="searchFriendIdInput"
              label="아이디 또는 이름"
              width={300}
              onChange={(e) => setSearchFriendId(e)}
              searchMemberId={searchFriendId}
            />
          )}

          <br />
          <Box sx={{ display: "flex", flexDirection: "column", mx: "1rem" }}>
            <Typography variant="span" sx={{ fontFamily: "Gowun Dodum" }}>
              {addOpen ? "" : "들어온 친구 요청"}
            </Typography>

            {!addOpen ? (
              <>
                {incomingFriends
                  .filter((obj) => {
                    return (
                      obj.name.includes(searchFriendId) ||
                      obj.email.includes(searchFriendId)
                    );
                  })
                  .map((obj, idx) => (
                    <UserCard
                      obj={obj}
                      idx={idx}
                      key={idx}
                      searchMemberId={searchMemberId}
                      searchedMembers={searchedMembers}
                      setSearchedMembers={setSearchedMembers}
                      userFriends={userFriends}
                      setUserFriends={setUserFriends}
                      incomingFriends={incomingFriends}
                      setIncomingFriends={setIncomingFriends}
                    />
                  ))}
                <Divider sx={{ mt: "1rem", width: 370 }} />
              </>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "content-box",
              mx: "1rem",

              width: 0.9,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {addOpen ? null : (
                <IconButton
                  size="small"
                  onClick={(e) => handleShowFavoriteClick(e)}
                  color={filterFavorite ? "warning" : "default"}
                >
                  <StarIcon fontSize="inherit" />
                  <Typography sx={{ fontFamily: "Gowun Batang" }}>
                    즐겨찾기
                  </Typography>
                </IconButton>
              )}
            </Box>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 1,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 2,
                  transition: {
                    delay: 0.25,
                  },
                },
              }}
              layoutId="underline"
            >
              <IconButton onClick={(e) => handleAddFriendClick(e)}>
                <Typography sx={{ fontFamily: "Gowun Batang" }}>
                  {addOpen ? "친구 목록" : "친구 추가"}
                </Typography>
              </IconButton>
            </motion.div>
          </Box>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 1,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 2,
                transition: {
                  delay: 0.25,
                },
              },
            }}
            layout
          >
            <Box sx={{ display: "flex", flexDirection: "column", mx: "1rem" }}>
              {!addOpen
                ? userFriends
                    .filter((obj) => {
                      if (filterFavorite) {
                        return (
                          obj.favorite &&
                          (obj.name.includes(searchFriendId) ||
                            obj.email.includes(searchFriendId))
                        );
                      } else {
                        return (
                          obj.name.includes(searchFriendId) ||
                          obj.email.includes(searchFriendId)
                        );
                      }
                    })
                    .map((obj, idx) => (
                      <UserCard
                        obj={obj}
                        idx={idx}
                        key={idx}
                        searchMemberId={searchMemberId}
                        searchedMembers={searchedMembers}
                        setSearchedMembers={setSearchedMembers}
                        userFriends={userFriends}
                        setUserFriends={setUserFriends}
                        incomingFriends={incomingFriends}
                        setIncomingFriends={setIncomingFriends}
                      />
                    ))
                : searchedMembers
                    .filter((obj) => {
                      return obj.email.includes(searchMemberId);
                    })
                    .map((obj, idx) => (
                      <UserCard
                        obj={obj}
                        idx={idx}
                        key={idx}
                        searchMemberId={searchMemberId}
                        searchedMembers={searchedMembers}
                        setSearchedMembers={setSearchedMembers}
                        userFriends={userFriends}
                        setUserFriends={setUserFriends}
                        incomingFriends={incomingFriends}
                        setIncomingFriends={setIncomingFriends}
                      />
                    ))}

              <Divider sx={{ mt: "2rem" }} />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </AnimateSharedLayout>
  );
}

export default friends;
