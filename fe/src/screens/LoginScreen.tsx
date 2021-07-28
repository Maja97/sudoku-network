import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import MainButton from "../components/MainButton";
import images from "../constants/images";
import colors from "../constants/colors";
import loginImage from "../assets/svgs/login_illustration.svg";
import { Controller, useFormContext } from "react-hook-form";
import { loginFields } from "../containers/LoginContainer";
import LocalTextField from "../components/LocalTextField";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import { useTranslation } from "react-i18next";
import { translations } from "../i18n/translations";
import { loginRules } from "../helpers/rules";
import ErrorIcon from "@material-ui/icons/Error";

interface Props {
  handleSubmit: () => void;
}

const LoginScreen = ({ handleSubmit }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const {
    formState: { errors },
  } = useFormContext();

  const toggleShowPassword = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Box className={classes.root} px={30}>
      <Box className={classes.content} py={2}>
        <Typography
          noWrap
          variant="h3"
          component="h1"
          className={classes.title}
        >
          {t(translations.login_title)}
        </Typography>
        <Grid container>
          <Grid item md={6} style={{ textAlign: "center" }}>
            <div className={classes.emailWrapper}>
              <Controller
                defaultValue=""
                name={loginFields.email}
                rules={loginRules.rules(t).email}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={loginFields.email}
                    onChange={onChange}
                    value={value}
                    className={classes.textfield}
                    label="E-mail"
                    endAdornment={<EmailRoundedIcon />}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText className={classes.error} error>
                  <ErrorIcon type="secondary" />
                  <span>{errors.email?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div className={classes.passwordWrapper}>
              <Controller
                defaultValue=""
                name={loginFields.password}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={loginFields.password}
                    onChange={onChange}
                    value={value}
                    className={classes.textfield}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    endAdornment={
                      <IconButton
                        onClick={toggleShowPassword}
                        style={{ color: "inherit", padding: 0 }}
                      >
                        {showPassword ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    }
                  />
                )}
              />
            </div>
            <MainButton text="Log in" type="primary" onClick={handleSubmit} />
          </Grid>
          <Grid item md={6}>
            <img src={loginImage} className={classes.image} alt="" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: 0,
    backgroundImage: `url(${images.yellowBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    overflow: "auto",
    verticalAlign: "center",
  },
  title: {
    color: colors.darkBlueGrey,
    paddingBottom: "60px",
    paddingTop: "20px",
  },
  content: {
    backgroundColor: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0 0 5px 5px",
    boxShadow: "5px 5px 20px 5px rgba(0,0,0,0.5)",
  },
  emailWrapper: {
    paddingTop: "60px",
    paddingBottom: "45px",
  },
  passwordWrapper: {
    paddingBottom: "55px",
  },
  textfield: {
    width: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  error: {
    width: "60%",
    textAlign: "center",
  },
});
export default LoginScreen;
