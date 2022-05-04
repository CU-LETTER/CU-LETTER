import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Input, Typography, Button } from "@mui/material";
import LetterContext from "../../contexts/LetterContext";

const Imgupload = (props) => {
  const { setImage } = useContext(LetterContext);

  const { handlePrevImage } = props;

  const imgInput = useRef();

  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    imgInput.current.click();
  };

  const handleInputFile = (event) => {
    const fileReader = new FileReader();

    if (event.target.files[0]) {
      setLoaded(true);
      props.setIsUploaded(true);
      fileReader.readAsDataURL(event.target.files[0]);
      setImgBase64(URL.createObjectURL(event.target.files[0]));
    }

    fileReader.onload = () => {
      setImage(event.target.files[0]);
      setImgFile(event.target.files[0]);
      setLoaded(true);
      props.setIsUploaded(true);
    };
  };

  useEffect(() => {
    props.setUploadedImage(imgFile);
  }, [imgFile]);
  useEffect(() => {
    handlePrevImage(imgBase64);
  }, [imgBase64]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: "1rem",
      }}
    >
      <Typography component="div" className="Dodum">
        마음에 드는 사진이 없나요?
      </Typography>
      <Button
        component="div"
        onClick={handleClick}
        sx={{
          display: "inline-block",
          textAlign: "center",
          margin: "1rem 0rem 2rem 0rem",
          width: "50%",
          backgroundColor: "#f0c8bf",
          color: "#3A1D1D",
          fontFamily: "Gowun Dodum",
        }}
      >
        이미지 업로드하기
      </Button>
      <Input
        inputRef={imgInput}
        type="file"
        id="input-img"
        accept="image/png, image/jpeg"
        onChange={handleInputFile}
        style={{ display: "none" }}
      ></Input>
    </Box>
  );
};

export default Imgupload;
