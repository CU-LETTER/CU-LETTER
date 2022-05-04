import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getMailByCode } from "../../../components/apis/letter";
import ReadMail from "../../../components/mail/inbox/ReadMail";
import ReadMailByCode from "../../../components/mail/inbox/ReadMailByCode";
import Header from "../../../components/Header";
import MenuList from "../../../components/menu/MenuList";

export default function ReadCodeMail() {
  const router = useRouter();
  const mailCode = router.query;
  const [mail, setMail] = useState(null);
  const [code, setCode] = useState(false);
  const [receivedTitle, setReceivedTitle] = useState("편지");
  useEffect(() => {
    if (!router.isReady) return;
    setCode(router.query.code);
  }, [router.isReady]);

  return (
    <Box
      component="div"
      sx={{
        width: 420,
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#FCFAEF",
        position: "relative",
      }}
    >
      <Header title={receivedTitle}></Header>
      <MenuList></MenuList>
      {code && (
        <ReadMailByCode
          code={code}
          setReceivedTitle={setReceivedTitle}
        ></ReadMailByCode>
      )}
    </Box>
  );
}
