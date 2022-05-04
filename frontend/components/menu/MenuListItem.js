import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";

const icons = [
  <HomeRoundedIcon />,
  <BorderColorRoundedIcon />,
  <MailIcon />,
  // <SendIcon />,
  <MarkunreadMailboxOutlinedIcon />,
  <SaveIcon />,
  <PeopleAltRoundedIcon />,
  <PersonIcon />,
  <LogoutIcon />,
];
const hrefs = [
  "/main",
  "/letter/select",
  "/mail/sent",
  "/mail/inbox",
  "/mail/storage",
  "/friends",
  "/profile",
  "/logout",
];

function MenuListItem({ text, index }) {
  return (
    <>
      <Link href={hrefs[index]}>
        <ListItem
          button
          key={index}
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>{icons[index]}</ListItemIcon>
          <ListItemText
            disableTypography
            sx={{ color: "white", fontFamily: "Gowun Batang" }}
            style={{ fontFamily: "Gowun Batang" }}
            primary={text}
          />
        </ListItem>
      </Link>
      {/* <hr style={{ margin: 0 }}></hr> */}
      <Divider></Divider>
    </>
  );
}

export default MenuListItem;
