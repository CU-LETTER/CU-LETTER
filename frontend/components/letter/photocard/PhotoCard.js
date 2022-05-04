import React, { useEffect, useState, useContext } from "react";
import Draggable from "react-draggable";
import { Box, Button, Typography } from "@mui/material";
import { landingBoxStyle } from "../../../pages/index";
import Emojipalette from "./EmojiPalette";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircleIcon from "@mui/icons-material/Circle";
import StarBorderPurple500RoundedIcon from "@mui/icons-material/StarBorderPurple500Rounded";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import FilterVintageRoundedIcon from "@mui/icons-material/FilterVintageRounded";
import Palette from "../Palette";
import { colors } from "../../../components/Variables";
import LetterContext from "../../../contexts/LetterContext";
export const emojis = [
  { icon: StarRoundedIcon, color: "#FFD93D", idx: 0 },
  { icon: FavoriteRoundedIcon, color: "#FD5D5D", idx: 1 },
  { icon: DarkModeRoundedIcon, color: "#FFD93D", idx: 2 },
  { icon: FavoriteBorderIcon, color: "#E4AEC5", idx: 3 },
  { icon: EmojiEmotionsIcon, color: "#C84B31", idx: 4 },
  { icon: QuestionMarkRoundedIcon, color: "#700B97", idx: 5 },
  { icon: SentimentVeryDissatisfiedIcon, color: "#A12568", idx: 6 },
  { icon: CircleIcon, color: "#FF8080", idx: 7 },
  { icon: StarBorderPurple500RoundedIcon, color: "#FFD93D", idx: 8 },
  { icon: LocalFloristRoundedIcon, color: "#4D96FF", idx: 9 },
  { icon: FilterVintageRoundedIcon, color: "#83142C", idx: 10 },
];

function PhotoCard({ props }) {
  const { setStickersPos, setBgcolor, stickersPos, setFontColor } =
    useContext(LetterContext);

  const [count, setCount] = useState(0);
  const [stickers, updateStickers] = useState([]);
  const [isfixed, setIsfixed] = useState(false);
  const [text, setText] = useState({});
  const [title, setTitle] = useState({});
  const [backgroundColor, setBackgroundColor] = useState(1);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setBgcolor(backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const uploadedText = {
      idx: 999,
      type: "text",
      content: props.text,
      position: { x: 0, y: 0 },
      disabled: false,
    };
    const uploadedTitle = {
      idx: 998,
      type: "title",
      content: props.title,
      position: { x: 0, y: 0 },
      disabled: false,
    };
    setText(uploadedText);
    setTitle(uploadedTitle);
    updateStickers([uploadedText, uploadedTitle]);
  }, []);

  useEffect(() => {
    setStickersPos(stickers);
  }, [stickers]);

  useEffect(() => {}, []);

  useEffect(() => {
    const boolean = stickers.length
      ? !stickers.some((sticker) => {
          return sticker.disabled === false;
        })
      : true;
    setIsMoving(boolean && props.showDots);
  }, [stickers, props.showDots]);

  const trackPosition = (obj, data) => {
    const updatedSticker = {
      idx: obj.idx,
      type: obj.type,
      content: obj.content,
      position: { x: data.x, y: data.y },
      disabled: obj.disabled,
    };
    const updatedStickers = stickers.map((sticker) =>
      sticker.idx === obj.idx ? updatedSticker : sticker
    );

    updateStickers(updatedStickers);
  };

  const handleClickEmoji = (idx) => {
    updateStickers((old) => [
      ...old,
      {
        idx: count,
        type: "sticker",
        content: emojis[idx],
        position: { x: 0, y: 0 },
        disabled: false,
      },
    ]);
    setCount(count + 1);
  };

  return (
    <Box
      sx={{
        ...landingBoxStyle,
        width: 420,
        justifyContent: "start",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 420,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          // justifyContent: "start",
          // alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#ffffff",
            my: "1rem",
            alignSelf: "center",
            borderRadius: "2rem",
            bgcolor: colors[backgroundColor],
            position: "relative",
            overflowX: "hidden",
          }}
        >
          <Draggable
            axis="both"
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            onDrag={(e, data) =>
              trackPosition(
                {
                  idx: 998,
                  type: "title",
                  content: title.content,
                  position: { x: 0, y: 0 },
                  disabled: false,
                },
                data
              )
            }
            disabled={isfixed}
            key={998}
          >
            <Typography
              sx={{
                border: !isfixed ? "1px dashed black" : "1px hidden black",
                position: "absolute",
                whiteSpace: "pre-line",
                fontFamily: props.fontFamily,
                color: props.color,
                textAlign: props.textAlign,
                fontSize: props.fontSize,
                fontWeight: props.bold ? "bold" : "normal",
                "&:hover": {
                  cursor: !isfixed ? "grab" : "auto",
                },
                zIndex: 999,
              }}
              id="title"
            >
              {title.content}
            </Typography>
          </Draggable>
          <Draggable
            axis="both"
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            onDrag={(e, data) =>
              trackPosition(
                {
                  idx: 999,
                  type: "text",
                  content: text.content,
                  position: { x: 0, y: 0 },
                  disabled: false,
                },
                data
              )
            }
            disabled={isfixed}
            key={999}
          >
            <Typography
              sx={{
                border: !isfixed ? "1px dashed black" : "1px hidden black",
                whiteSpace: "pre-line",
                fontFamily: props.fontFamily,
                position: "absolute",
                color: props.color,
                textAlign: props.textAlign,
                fontSize: props.fontSize,
                fontWeight: props.bold ? "bold" : "normal",
                "&:hover": {
                  cursor: !isfixed ? "grab" : "auto",
                },
                zIndex: 998,
              }}
              id="text"
            >
              {text.content}
            </Typography>
          </Draggable>

          {stickers.map((Sticker, idx) =>
            Sticker.type === "sticker" ? (
              <Draggable
                axis="both"
                bounds="parent"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={(e, data) => trackPosition(Sticker, data)}
                disabled={Sticker.disabled}
                key={idx}
              >
                <Box
                  className="handle"
                  sx={{ position: "absolute", zIndex: 1000 }}
                >
                  <Sticker.content.icon
                    sx={{
                      color: Sticker.content.color,
                      position: "absolute",
                      border: !Sticker.disabled
                        ? "1px dashed black"
                        : "1px hidden black",
                      "&:hover": {
                        cursor: !Sticker.disabled ? "grab" : "no-drop",
                      },
                    }}
                    fontSize="large"
                  />
                </Box>
              </Draggable>
            ) : null
          )}
        </Box>
        <Box>
          <Emojipalette
            handleClickEmoji={handleClickEmoji}
            emojis={emojis}
            isColorOpen={isMoving}
          />
          <Palette
            colors={colors}
            isColorOpen={isMoving}
            clickedColor={backgroundColor}
            setClickedColor={setBackgroundColor}
            size="half"
          />
        </Box>

        {!stickers.every((sticker) => {
          return sticker.disabled;
        }) ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsfixed(true);
              updateStickers((stickers) =>
                stickers.map((sticker) => {
                  return { ...sticker, disabled: true };
                })
              );
              setStickersPos(stickers);
            }}
            variant="contained"
            sx={{
              alignSelf: "center",
              bgcolor: "#D3504A",
              "&:hover": {
                bgcolor: "#FF8176",
              },
              fontFamily: "Gowun Batang",
            }}
          >
            확인
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

export default PhotoCard;
