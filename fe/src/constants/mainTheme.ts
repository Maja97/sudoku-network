import { createMuiTheme } from "@material-ui/core/styles";
import colors from "./colors";
import fonts from "./fonts";

const mainTheme = createMuiTheme({
  palette: {
    background: {
      default: colors.lightestGrey,
    },
  },
  typography: {
    fontFamily: fonts.regular,
    h1: {
      h1: {
        fontSize: "3.5rem",
        lineHeight: 1.5,
      },
      h2: {
        fontSize: "2.5rem",
        lineHeight: 1.5,
      },
      h3: {
        fontSize: "2rem",
        lineHeight: 1.5,
      },
      h4: {
        fontSize: "1.5rem",
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "1.25rem",
        lineHeight: 2,
      },
      h6: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
    },
  },
});

export default mainTheme;
