import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getMail } from "../../apis/letter";
import { deleteRecvMail, deleteSendMail } from "../../apis/mailbox";
import Player from "../../letter/preview/Player";
import { fonts, colors } from "../../Variables";
import ReadMailPhotoCard from "./ReadMailPhotoCard";
import Spinner from "../../Spinner";
import { motion } from "framer-motion";
import { getRecvMailsBySender } from "../../apis/mailbox";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReadMail({
  selectedMail,
  setIsMail,
  senderId,
  sent,
  setIsRead,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMail = async () => {
    setLoading(true);
    try {
      const res = await getMail(selectedMail);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMailSend = async () => {
    try {
      await deleteSendMail(selectedMail);
      setIsRead(true);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteMail = async () => {
    try {
      await deleteRecvMail(selectedMail);
      toast.success(
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "Gowun Batang",
            }}
          >
            삭제 성공🎉
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          role: "alert",
        }
      );
      setTimeout(() => {
        setIsMail(true);
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMail();
  }, []);

  if (loading) {
    return <Spinner mt="30vh"></Spinner>;
  }
  return (
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
            delay: 0.1,
          },
        },
      }}
      layoutId="underline"
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* 포토카드 */}

        {data.mail_type === "PHOTOCARD" ? (
          <ReadMailPhotoCard data={data}></ReadMailPhotoCard>
        ) : (
          <></>
        )}
        {/* <General data={data} />  */}
        {data.mail_type === "GENERAL" ? (
          <Box
            sx={{
              position: "relative",
              width: 420,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              src={data.style_url}
              width={420}
              style={{ position: "absolute" }}
            />
            <Box
              sx={{
                position: "relative",
                m: "2rem",
                width: "90%",
              }}
            >
              <Typography
                className="text-area"
                component="div"
                sx={{
                  fontFamily: fonts[parseInt(data.font_type)].fontfamily,
                  color: colors[data.font_color],
                  textAlign: data.font_order,
                  fontSize: data.font_size,
                  maxHeight: 560,
                  minHeight: 560,
                  overflowY: "auto",
                  whiteSpace: "pre-line",
                  fontWeight: data.is_font_bold ? "bold" : "normal",
                }}
              >
                {data.title}
                <br />
                {data.content}
              </Typography>
            </Box>
          </Box>
        ) : (
          <></>
        )}
        {/* <PostCard />  */}
        {data.mail_type === "POSTCARD" ? (
          <Box
            sx={{
              position: "relative",
              width: 420,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ border: "1px solid" }}>
              <img
                src={data.style_url}
                width={418}
                height={200}
                style={{ display: "block" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Typography
                  className="text-area"
                  component="div"
                  sx={{
                    fontFamily: fonts[parseInt(data.font_type)].fontfamily,
                    color: colors[data.font_color],
                    textAlign: data.font_order,
                    fontSize: data.font_size,
                    maxHeight: 280,
                    minHeight: 280,
                    minWidth: "100%",
                    px: "2rem",
                    py: "1rem",
                    overflowY: "auto",
                    whiteSpace: "pre-line",
                    textDecoration: `${colors[data.underline_color]} underline`,
                    textUnderlineOffset: 4,
                    bgcolor: colors[data.background_color],
                    fontWeight: data.is_font_bold ? "bold" : "normal",
                  }}
                >
                  {data.title}
                  <br />
                  {data.content}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ py: "2rem" }}>
        <Player
          music={data.music_url}
          inboxMusicName={data.music_title}
        ></Player>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="삭제">
          <IconButton
            aria-label="삭제"
            onClick={sent ? (e) => deleteMailSend() : (e) => deleteMail()}
            sx={{
              color: "#a63636",
              "&:hover": {
                bgcolor: "#f7e4e0",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </motion.div>
  );
}
