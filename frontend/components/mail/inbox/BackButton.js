import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Link from "next/link";

export default function BackButton({ onClick }) {
  return (
    <IconButton
      aria-label="go back"
      sx={{ position: "" }}
      onClick={() => onClick(true)}
    >
      <ArrowBackIosRoundedIcon></ArrowBackIosRoundedIcon>
    </IconButton>
  );
}
