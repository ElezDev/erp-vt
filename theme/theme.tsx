// theme.js

import palette from "src/constant/palette";

const theme = {
  light: {
    theme: "light",
    color: palette.primaryColor,
    background: palette.primaryLight,
    accent: palette.accentColor,
    text: palette.black,
    border: palette.primaryLighter,
  },
  dark: {
    theme: "dark",
    color: palette.secondaryColor,
    background: palette.primaryDark,
    accent: palette.accentColor,
    text: palette.white,
    border: palette.secondaryLight,
  },
};

export default theme;
