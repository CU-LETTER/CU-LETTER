import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

export default function MenuButton({ OpenMenu, open }) {
  return (
    <IconButton
      aria-label="open menu"
      // component="span"
      sx={{ position: "absolute", right: "2vh", top: "3vh" }}
      onClick={() => {
        OpenMenu();
      }}
    >
      <MenuIcon></MenuIcon>
    </IconButton>
  );
}
