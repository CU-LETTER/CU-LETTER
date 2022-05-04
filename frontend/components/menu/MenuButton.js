import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";

export default function MenuButton({ HandleMenu, open }) {
  return (
    <>
      <Box
        sx={{
          width: open ? 1 : 0,
          height: 1,
          bgcolor: "rgba(0,0,0,0.2)",
          position: "absolute",
          top: 0,
          zIndex: 1,
        }}
        onClick={HandleMenu}
      ></Box>
      <IconButton
        aria-label="open menu"
        // component="span"
        sx={{ position: "absolute", right: "2vh", top: "2vh" }}
        onClick={() => {
          HandleMenu();
        }}
      >
        <MenuIcon></MenuIcon>
      </IconButton>
    </>
  );
}
