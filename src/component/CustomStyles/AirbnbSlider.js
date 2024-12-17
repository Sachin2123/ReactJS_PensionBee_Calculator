import { styled, Slider } from "@mui/material";

// Slider Styles
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#E97451	",
  height: 10, // Thicker track
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 35,
    width: 35,
    backgroundColor: "#fff",
    border: "1px solid grey",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 10, // Thicker track
  },
  "& .MuiSlider-rail": {
    color: "#d8d8d8",
    opacity: 1,
    height: 10, // Thicker track
    ...theme.applyStyles("dark", {
      color: "#bfbfbf",
      opacity: undefined,
    }),
  },
}));

export default AirbnbSlider;
