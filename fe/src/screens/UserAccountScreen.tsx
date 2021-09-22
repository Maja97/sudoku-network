import React from "react";
import UserIcon from "../assets/svgs/user_account_illustration.svg";
import { Box, FormHelperText, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Controller, useFormContext } from "react-hook-form";
import { userAccountFields } from "../containers/UserAccountContainer";
import { useTranslation } from "react-i18next";
import LocalTextField from "../components/LocalTextField";
import { userAccountRules } from "../helpers/rules";
import { User } from "../types/User";
import Navbar from "../components/Navbar";
import MainButton from "../components/MainButton";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

interface Props {
  user: User;
  handleSubmit: () => void;
}

const UserAccountScreen = ({ user, handleSubmit }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Navbar pageName="My account" />
      <Box p={5}>
        <Grid container>
          <Grid item md={6} className={classes.grid}>
            <div className={classes.name}>
              <div style={{ paddingRight: 20 }}>
                <Controller
                  defaultValue={user.firstName}
                  name={userAccountFields.firstName}
                  rules={userAccountRules.rules(t).firstName}
                  render={({ field: { value, onChange } }) => (
                    <LocalTextField
                      name={userAccountFields.firstName}
                      onChange={onChange}
                      value={value}
                      label="First name"
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText error className={classes.error}>
                    <ErrorIcon fontSize="small" />
                    <span>{errors.firstName?.message}</span>
                  </FormHelperText>
                )}
              </div>
              <div>
                <Controller
                  defaultValue={user ? user.lastName : ""}
                  name={userAccountFields.lastName}
                  rules={userAccountRules.rules(t).lastName}
                  render={({ field: { value, onChange } }) => (
                    <LocalTextField
                      name={userAccountFields.lastName}
                      onChange={onChange}
                      value={value}
                      label="Last name"
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText error className={classes.error}>
                    <ErrorIcon fontSize="small" />
                    <span>{errors.lastName?.message}</span>
                  </FormHelperText>
                )}
              </div>
            </div>
            <div>
              <Controller
                defaultValue={user.email}
                name={userAccountFields.email}
                rules={userAccountRules.rules(t).email}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={userAccountFields.email}
                    onChange={onChange}
                    value={value}
                    label="E-mail"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText error className={classes.error}>
                  <ErrorIcon fontSize="small" />
                  <span>{errors.email?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div className={classes.username}>
              <Controller
                defaultValue={user.username}
                name={userAccountFields.username}
                rules={userAccountRules.rules(t).username}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={userAccountFields.username}
                    onChange={onChange}
                    value={value}
                    label="Username"
                  />
                )}
              />
              {errors.username && (
                <FormHelperText error className={classes.error}>
                  <ErrorIcon fontSize="small" />
                  <span>{errors.username?.message}</span>
                </FormHelperText>
              )}
            </div>
            <div>
              <Controller
                defaultValue=""
                name={userAccountFields.password}
                rules={userAccountRules.rules(t).password}
                render={({ field: { value, onChange } }) => (
                  <LocalTextField
                    name={userAccountFields.password}
                    onChange={onChange}
                    value={value}
                    label="Password"
                    type="password"
                  />
                )}
              />
              {errors.password && (
                <FormHelperText error className={classes.error}>
                  <ErrorIcon fontSize="small" />
                  <span>{errors.password?.message}</span>
                </FormHelperText>
              )}
            </div>

            <MainButton
              onClick={handleSubmit}
              text="Update"
              className={classes.button}
            />
          </Grid>
          <Grid item md={6}>
            <img src={UserIcon} className={classes.image} alt="" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  image: {
    width: "-webkit-fill-available",
  },
  name: { display: "flex", paddingBottom: 20 },
  grid: {
    paddingTop: 50,
    paddingLeft: 50,
  },
  button: {
    marginTop: 50,
  },
  username: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  error: {
    display: "flex",
  },
});
export default UserAccountScreen;
