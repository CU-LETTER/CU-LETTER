import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { lazyStartIndex } from "react-slick/lib/utils/innerSliderUtils";
import { getRecvMailsBySender } from "../../apis/mailbox";
import Letter from "../../main/Letter";
import Photocard from "./Photocard";
import ReadMail from "./ReadMail";
import Spinner from "../../Spinner";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
export default function MailPage({
  senderId,
  isMail,
  setIsMail,
  setIsPostbox,
}) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const loader = useRef(null);
  const noFirstRender1 = useRef(false);
  const noFirstRender2 = useRef(false);

  const fetchMails = async () => {
    setLoading(true);
    try {
      const res = await getRecvMailsBySender(senderId);
      console.log(Array.isArray(res.data.result));
      if (Array.isArray(res.data.result) && !res.data.result.length) {
        setNoData(true);
      }
      const reversed = res.data.result.reverse();
      setData(reversed);
      setMails(reversed.slice(0, 6));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const switchPage = (mailId) => {
    setSelectedMail(mailId);
    setIsMail(false);
  };
  useEffect(() => {
    fetchMails();
    setPage((prev) => prev + 1);
  }, []);

  useEffect(async () => {
    if (noFirstRender1.current) {
      fetchMails();
    } else {
      noFirstRender1.current = true;
    }
  }, [isMail]);

  // useEffect(() => {
  //   if (noFirstRender2.current) {
  //     setIsMail(false);
  //   } else {
  //     noFirstRender2.current = true;
  //   }
  // }, [selectedMail]);

  // useEffect(() => {
  //   if (noFirstRender1.current) {
  //     setSelectedMail(null);
  //   } else {
  //     noFirstRender1.current = true;
  //   }
  // }, [isMail]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  // 처음 로딩 돌 떄 작동함.
  useEffect(() => {
    setMails(data.slice(0, page * 6));
  }, [page]);

  return (
    <>
      {/* src 에 style_url 넣음? */}
      {isMail ? (
        <motion.div>
          {noData ? (
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Gowun Dodum",
                textAlign: "center",
                mt: "5rem",
              }}
            >
              텅..
            </Typography>
          ) : (
            <Box sx={{ minHeight: "90vh" }}>
              {mails.map(
                (
                  {
                    title,
                    mail_type,
                    created_date,
                    sender_name,
                    style_url,
                    mail_id,
                  },
                  idx
                ) => {
                  if (mail_type === "GENERAL") {
                    return (
                      <Box
                        // onClick={(e) => {
                        //   setSelectedMail(mail_id);
                        // }}
                        key={idx}
                      >
                        <Letter
                          text={title}
                          index={0}
                          createdDate={created_date}
                          senderName={sender_name}
                          key={idx}
                          mailId={mail_id}
                          switchPage={(e) => switchPage(mail_id)}
                        ></Letter>
                      </Box>
                    );
                  } else if (mail_type === "POSTCARD") {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={(e) => {
                          setSelectedMail(mail_id);
                        }}
                      >
                        <Letter
                          switchPage={(e) => switchPage(mail_id)}
                          text={title}
                          index={1}
                          createdDate={created_date}
                          senderName={sender_name}
                          key={idx}
                          mailId={mail_id}
                        ></Letter>
                      </Box>
                    );
                  } else {
                    return (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          fontSize: 26,
                          height: "204px",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={(e) => switchPage(mail_id)}
                      >
                        <Box
                          sx={{
                            border: "1px solid black",
                            bgcolor: "white",
                            width: "320px",
                            height: "186px",
                            mt: "9px",
                          }}
                        >
                          <Box sx={{ width: 1 }}>
                            <Box
                              component="img"
                              src={style_url}
                              sx={{
                                objectFit: "cover",
                                width: 1,
                                height: "150px",
                                px: 0.5,
                                pt: 0.5,
                                borderRadius: 5,
                              }}
                            ></Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              px: 2,
                            }}
                          >
                            <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                              {sender_name}
                            </Typography>
                            {created_date ? (
                              <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                                포토카드, {created_date.slice(0, 4)}년{" "}
                                {created_date.slice(5, 7)}월{" "}
                                {created_date.slice(8, 10)}일
                              </Typography>
                            ) : null}
                          </Box>
                        </Box>
                      </Box>
                    );
                  }
                }
              )}
              <Box sx={{ height: "70px" }} ref={loader}></Box>
            </Box>
          )}
        </motion.div>
      ) : (
        <ReadMail
          selectedMail={selectedMail}
          setIsMail={setIsMail}
          senderId={senderId}
        ></ReadMail>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
}
