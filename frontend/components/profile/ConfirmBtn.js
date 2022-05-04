import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ConfirmBtn({ onClick, disabled }) {
  const StyledBtn = styled(Button)(() => ({
    minWidth: "200px",
    minHeight: "30px",
    backgroundColor: "#E2E0A5",
    color: "#3A1D1D",
    marginTop: "1rem",
    fontFamily: "Gowun Batang",
    "&:hover": {
      // edebac eeecad
      backgroundColor: "#E2E0A5",
    },
  }));
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <StyledBtn
        variant="contained"
        size="small"
        onClick={onClick}
        disabled={disabled}
      >
        확인
      </StyledBtn>
    </Box>
  );
}
