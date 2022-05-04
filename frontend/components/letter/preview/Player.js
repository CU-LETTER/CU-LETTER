import { Grid, Box, Typography, Stack, Slider } from "@mui/material";
import { useState, useRef, useContext, useEffect } from "react";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/Pause";
import AlbumIcon from "@mui/icons-material/Album";
import LetterContext from "../../../contexts/LetterContext";
import Marquee from "react-fast-marquee";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeDown from "@mui/icons-material/VolumeDown";

export default function Player(props) {
  const { music, inboxMusicName } = props;
  // const { musicSelected } = useContext(ContentsContext);
  const { musicName, musicUrl, setMusicUrl } = useContext(LetterContext);
  const audioPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playStatus, setPlayStatus] = useState("stop");
  const [volume, setVolume] = useState(0.5);
  const [openVolumeController, setOpenVolumeController] = useState(false);
  const handleMusicStart = () => {
    audioPlayer.current.play();
    setPlayStatus("play");
  };
  const handleMusicStop = () => {
    audioPlayer.current.pause();
    setPlayStatus("stop");
  };
  const stop = () => {
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  };
  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
    // (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100 ===
    // 100
    //   ? setIsPlaying(true)
    //   : null;
  };

  const handleVolumeControl = () => {
    setOpenVolumeController((prev) => !prev);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const preventHorizontalKeyboardNavigation = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (music !== undefined) {
      setMusicUrl(music);
    } else {
      setMusicUrl(musicUrl);
    }
  }, []);

  return (
    <>
      <audio
        src={music === undefined ? musicUrl : music}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
        volume={volume}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <Grid
        container
        sx={{
          backgroundColor: "#E7A69E",
          borderRadius: 30,
          py: "2px",
          px: "4px",
          display: "flex",
          color: "white",
          width: "70%",
          mx: "auto",
          // mb: 10,
          alignItems: "center",
        }}
      >
        <Grid item xs={1} sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AlbumIcon
              className={playStatus === "play" ? "playAlbum" : null}
              fontSize="small"
            ></AlbumIcon>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Marquee
            component="div"
            play={playStatus === "play"}
            direction="right"
            gradient={false}
          >
            <Typography>
              {inboxMusicName ? inboxMusicName : musicName}
            </Typography>
          </Marquee>
        </Grid>
        <Grid item xs={1}>
          {playStatus === "stop" ? (
            <PlayArrowRoundedIcon
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => {
                handleMusicStart();
                // setIsPlaying(true);
              }}
            ></PlayArrowRoundedIcon>
          ) : (
            <PauseIcon
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => {
                handleMusicStop();
                // setIsPlaying(false);
              }}
            ></PauseIcon>
          )}
        </Grid>
        {/* <Box>
          <VolumeUp sx={{ color: "#eee" }} onClick={handleVolumeControl} />
          <Box className={"volumeController"}>
            {openVolumeController ? (
              <Box sx={{ height: 100 }}>
                <Slider
                  sx={{
                    '& input[type="range"]': {
                      WebkitAppearance: "slider-vertical",
                    },
                  }}
                  orientation="vertical"
                  // defaultValue={volume}
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  onKeyDown={preventHorizontalKeyboardNavigation}
                />
              </Box>
            ) : null}
          </Box>
        </Box> */}
      </Grid>
    </>
  );
}
