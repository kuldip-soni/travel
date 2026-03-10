import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    htmlFontSize: 10, // because 1rem = 10px (62.5%)
  },
});

export default theme;