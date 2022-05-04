import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import LetterContext from "../../contexts/LetterContext";
import "react-toastify/dist/ReactToastify.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PauseIcon from "@mui/icons-material/Pause";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authentication } from "../../components/apis/auth";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import RecommendApi from "../../components/apis/RecommendApi";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  width: "75%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#D3504A",
  },
}));

const music = () => {
  const [title, setTitle] = useState("제목");
  const [playStatus, setPlayStatus] = useState("stop");
  const [currentTime, setCurrentTime] = useState();
  const [endTime, setEndTime] = useState();
  const [musicList, setMusicList] = useState([
    { music_url: "", music_name: "" },
  ]);
  const { getRecommendMusic } = RecommendApi;

  const lpImgList = ["/img/lpImg1.png", "/img/lpImg2.png", "/img/lpImg3.png"];
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState("");
  const {
    musicUrl,
    setMusicUrl,
    emotion,
    setMusicName,
    musicName,
    receiverName,
  } = useContext(LetterContext);
  const [progress, setProgress] = useState(0);

  const playerIcon = {
    fontSize: "2.3rem",
    margin: "1rem",
    color: "#333333",
  };

  const player = useRef();

  const formatDuration = (duration) => {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  };

  const handleToggle = (item) => () => {
    //선택 해제
    // console.log(item);
    if (item.music_name === checked) {
      setChecked("");
      setMusicName("제목");
      setMusicUrl("");
      //선택
    } else {
      setChecked(item.music_name);
      setMusicName(item.music_name);
      setMusicUrl(item.music_url);
    }
  };

  const handlePreviousMusic = () => {};
  const handleMusicStart = () => {
    player.current.play();
    setPlayStatus("play");
  };
  const handleMusicStop = () => {
    player.current.pause();
    setPlayStatus("stop");
  };
  const handleNextMusic = () => {};

  useEffect(() => {
    authentication();
    let index = Math.floor(Math.random() * 3);
    setIndex(index);
    handleMusicList();
    setEndTime(player.current.duration);
    setCurrentTime(player.current.currentTime);
    // console.log(receiverName);
  }, []);

  useEffect(() => {
    if (checked !== "") {
      handleMusicStop();
    } else {
      setMusicUrl("");
    }
  }, [checked]);

  useEffect(() => {
    setMusicName(musicList[0].music_name);
    setChecked(musicList[0].music_name);
    setMusicUrl(musicList[0].music_url);
  }, [musicList]);

  const handleMusicList = async () => {
    const body = {
      type: "music",
      ...emotion,
    };
    try {
      const response = await getRecommendMusic(body);
      setMusicList(response.data.music_list.slice(0, 10));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleProgress = () => {
    setCurrentTime(player.current.currentTime);
    setProgress((player.current.currentTime / player.current.duration) * 100);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (checked != "") {
      Router.push("/letter/edit");
    } else {
      toast.error(
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "Gowun Batang",
            }}
          >
            노래를 선택해주세요🎧
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          role: "alert",
        }
      );
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    Router.push("/letter/recommended");
  };

  const timeStyle = {
    fontFamily: "Gowun Batang",
    fontSize: "0.9rem",
    fontWeight: "bold",
  };

  return (
    <Box
      component="div"
      sx={{
        width: 420,
        height: "100vh",
        mx: "auto",
        bgcolor: "#FCFAEF",
      }}
    >
      <Header
        handlePrevClick={handlePrevClick}
        title="노래 선택"
        handleNextClick={handleNextClick}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          component="div"
          vatiant="p"
          sx={{
            fontSize: "1.5rem",
            mb: "2rem",
            mt: "1rem",
            fontFamily: "Gowun Dodum",
          }}
        >
          {musicName}
        </Typography>
        <Box
          className={"lp " + (playStatus === "play" ? "lpRotate" : null)}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            width="200px"
            height="200px"
            src={lpImgList[index]}
            style={{
              borderRadius: "50%",
              transformOrigin: " 50% 50%",
            }}
          ></img>
          <Box
            sx={{
              width: "50px",
              height: "50px",
              backgroundColor: "#333333",
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              // top: "40%",
              // left: "35%",
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                position: "absolute",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>

      <audio
        src={musicUrl}
        // controls
        ref={player}
        // onPause={handleMusicStop}
        // onPlay={handleMusicStart}
        onTimeUpdate={handleProgress}
      ></audio>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "1.3rem",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* <Typography style={timeStyle}>{formatDuration(currentTime)}</Typography> */}
        <BorderLinearProgress variant="determinate" value={progress} sx={{}} />
        {/* <Typography style={timeStyle}>{formatDuration(endTime)}</Typography> */}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* <Button onClick={handlePreviousMusic}>
          <SkipPreviousSharpIcon style={playerIcon} />
        </Button> */}
        {playStatus === "stop" ? (
          <Button onClick={handleMusicStart}>
            <PlayCircleFilledSharpIcon style={playerIcon} />
          </Button>
        ) : (
          <Button onClick={handleMusicStop}>
            <PauseIcon style={playerIcon} />
          </Button>
        )}
        {/* <Button onClick={handleNextMusic}>
          <SkipNextSharpIcon style={playerIcon} />
        </Button> */}
      </Box>
      <Typography
        sx={{
          fontSize: "13px",
          textAlign: "center",
          fontFamily: "Gowun Dodum",
        }}
      >
        추천된 곡들 중 하나를 선택하고 다음을 눌러주세요.
      </Typography>
      <Box
        sx={{
          width: "380px",
          height: "305px",
          backgroundColor: "#f0c8bf",
          margin: "auto",
          mt: "0.8rem",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            borderBottom: 2,
            borderColor: "#FCFAEF",
            padding: "0.3rem",
            fontFamily: "Gowun Dodum",
          }}
        >
          <Typography variant="p" sx={{ fontFamily: "Gowun Dodum" }}>
            추천 곡 리스트
          </Typography>
        </Box>
        <Box sx={{ width: "380px", height: "230px", overflow: "auto" }}>
          <List sx={{ width: "100%", fontFamily: "Gowun Dodum" }}>
            {musicList.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={handleToggle(item)} dense>
                  <ListItemIcon>
                    <Checkbox
                      value={item.music_name}
                      edge="start"
                      disableRipple
                      checked={checked === item.music_name}
                      inputProps={{ "aria-labelledby": item }}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                      style={{ color: "#FCFAEF" }}
                    />
                  </ListItemIcon>
                  <Grid container>
                    <Grid item xs={8}>
                      <ListItemText
                        id={index}
                        primary={item.music_name}
                        primaryTypographyProps={{
                          style: {
                            fontFamily: "Gowun Batang",
                          },
                        }}
                        sx={{ fontFamily: "Gowun Batang" }}
                      />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default music;
