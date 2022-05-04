import { FormControl, Box } from "@mui/material";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PWCheckField from "./PWCheckField";
import ConfirmBtn from "./ConfirmBtn";
import { pwValidation } from "../apis/profile";

export default function PasswordCheck({ pwConfirm, setPwConfirm }) {
  const [pwInput, setPwInput] = useState(null);
  const [pwCheck, setPwCheck] = useState(false);

  const sendPw = useCallback(async () => {
    try {
      const res = await pwValidation(pwInput);
      setPwConfirm(true);
    } catch (error) {
      // 토스트 메세지
      // console.log(error);
      toast.error("일치하지 않는 비밀번호입니다.", {
        position: toast.POSITION.TOP_CENTER,
        role: "alert",
      });
    }
  });

  return (
    <FormControl component="fieldset" sx={{ display: "flex" }}>
      <Box
        sx={{
          backgroundColor: "#E2E0A5",
          pt: 1,
          px: 3,
          pb: 1.5,
          borderRadius: 2,
        }}
      >
        <PWCheckField
          labelValue="비밀번호"
          id="pwCheck"
          pwInput={pwInput}
          pwCheck={pwCheck}
          setPwInput={(e) => setPwInput(e)}
          setPwCheck={(e) => setPwCheck(e)}
        ></PWCheckField>
      </Box>
      <ConfirmBtn onClick={sendPw} disabled={!pwCheck}></ConfirmBtn>
      <ToastContainer />
    </FormControl>
  );
}
