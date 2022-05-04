import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@mui/material";

const useStyles = makeStyles({
  root: {
    fontFamily: "Gowun Batang",
    color: "pink",
    "&.Mui-focused": {
      color: "pink",
    },
    "&:before": {
      borderBottomColor: "pink",
    },
    "&:hover:not(.Mui-focused):before": {
      borderBottomColor: "pink",
    },
    "&:after": {
      borderBottomColor: "pink",
    },
  },
});

const useLabelStyles = makeStyles({
  root: {
    fontFamily: "Gowun Batang",
    color: "pink",
    "&.Mui-focused": {
      color: "pink",
    },
    fontSize: 14,
  },
});

export default function StyledTextField({
  id,
  type,
  label,
  value,
  disabled,
  onChange,
}) {
  const classes = useStyles();
  const labelClasses = useLabelStyles();

  return (
    <TextField
      autoComplete="off"
      variant="standard"
      size="small"
      id={id}
      label={label}
      type={type}
      value={value || ""}
      disabled={disabled}
      onChange={onChange ? onChange : null}
      sx={{
        "& .MuiInput-underline": { fontFamily: "Gowun Batang", color: "black" },
        "& .MuiInput-underline:not(.Mui-disabled):hover::before": {
          borderColor: "#A63636",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#A63636",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "#A63636",
        },
        width: 1,
        fontFamily: "Gowun Batang",
        "& label": {
          color: "black",
          fontFamily: "Gowun Batang",
          "&.Mui-focused": { color: "black" },
          fontSize: 14,
        },
      }}
      // InputLabelProps={{ classes: labelClasses }}
      // InputProps={{ classes: classes }}
    ></TextField>
  );
}
