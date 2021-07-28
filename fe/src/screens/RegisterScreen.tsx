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
import registerImage from "../assets/svgs/register_hello_illustration.svg";
import { Controller, useFormContext } from "react-hook-form";
import LocalTextField from "../components/LocalTextField";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import { useTranslation } from "react-i18next";
import { translations } from "../i18n/translations";
import { registerRules } from "../helpers/rules";
import ErrorIcon from "@material-ui/icons/Error";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { registerFields } from "../containers/RegisterContainer";
import PhoneIcon from "@material-ui/icons/Phone";

interface Props {
  handleSubmit: () => void;
}

const RegisterScreen = ({ handleSubmit }: Props) => {
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
          {t(translations.register_title)}
        </Typography>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.firstNameWrapper}>
              <Controller
                defaultValue=""
                name={registerFields.firstName}
                rules={registerRules.rules(t).firstName}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.firstName}
                    onChange={onChange}
                    value={value}
                    className={classes.firstName}
                    label="First name"
                  />
                )}
              />

              <Controller
                defaultValue=""
                name={registerFields.lastName}
                rules={registerRules.rules(t).lastName}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.lastName}
                    onChange={onChange}
                    value={value}
                    label="Last name"
                  />
                )}
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <div className={classes.nameErrors}>
                {errors.firstName && (
                  <FormHelperText className={classes.error} error>
                    <ErrorIcon type="secondary" />
                    <span>{errors.firstName?.message}</span>
                  </FormHelperText>
                )}
                {errors.lastName && (
                  <FormHelperText className={classes.error} error>
                    <ErrorIcon type="secondary" />
                    <span>{errors.lastName?.message}</span>
                  </FormHelperText>
                )}
              </div>
            )}

            <div className={classes.wrapper}>
              <Controller
                defaultValue=""
                name={registerFields.username}
                rules={registerRules.rules(t).username}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.username}
                    onChange={onChange}
                    value={value}
                    className={classes.textfield}
                    label="Username"
                    endAdornment={<AccountCircleIcon />}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText className={classes.error} error>
                  <ErrorIcon type="secondary" />
                  <span>{errors.username?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div className={classes.wrapper}>
              <Controller
                defaultValue=""
                name={registerFields.email}
                rules={registerRules.rules(t).email}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.email}
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
            <div className={classes.wrapper}>
              <Controller
                defaultValue=""
                name={registerFields.password}
                rules={registerRules.rules(t).password}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.password}
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

              {errors.password && (
                <FormHelperText className={classes.error} error>
                  <ErrorIcon type="secondary" />
                  <span>{errors.password?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div className={classes.wrapper}>
              <Controller
                defaultValue=""
                name={registerFields.password}
                rules={registerRules.rules(t).password}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.password}
                    onChange={onChange}
                    value={value}
                    className={classes.textfield}
                    type={showPassword ? "text" : "password"}
                    label="Repeat password"
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

              {errors.password && (
                <FormHelperText className={classes.error} error>
                  <ErrorIcon type="secondary" />
                  <span>{errors.password?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div className={classes.wrapper}>
              <Controller
                defaultValue=""
                name={registerFields.phone}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={registerFields.phone}
                    onChange={onChange}
                    value={value}
                    className={classes.textfield}
                    label="Phone number"
                    endAdornment={<PhoneIcon />}
                  />
                )}
              />
            </div>
            <MainButton text="Register" type="primary" onClick={handleSubmit} />
          </Grid>
          <Grid item md={6}>
            <img src={registerImage} className={classes.image} alt="" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  error: {},
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
  firstNameWrapper: {
    textAlign: "center",
    width: "60%",
    paddingTop: "50px",
    display: "inline-flex",
    paddingBottom: "30px",
  },
  nameErrors: {
    width: "60%",
    display: "inline-flex",
  },
  firstName: {
    marginRight: "5px",
  },
  textfield: {
    width: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    paddingBottom: "30px",
  },
});
export default RegisterScreen;
