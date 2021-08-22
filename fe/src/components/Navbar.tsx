import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import { RootState } from "../redux/store";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { goToHomePage, goToLogin, goToRegister } from "../helpers/navigation";
import { useHistory } from "react-router-dom";
import service from "../service/service";
import { removeUser } from "../redux/auth/authRedux";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/auth";
import MainButton from "./MainButton";

interface Props {
  pageName: string;
}

const Navbar = ({ pageName }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMenuOpen = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const onMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onGoHome = React.useCallback(() => {
    goToHomePage(history);
  }, [history]);

  const onLogout = React.useCallback(async () => {
    dispatch(removeUser());
    await service.logout().catch((e) => console.log(e));
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    goToLogin(history);
  }, [history, dispatch]);

  const onGoToLogin = React.useCallback(() => {
    goToLogin(history);
  }, [history]);

  const onGoToRegister = React.useCallback(() => {
    goToRegister(history);
  }, [history]);

  return (
    <AppBar
      position="static"
      classes={{ root: classes.root }}
      color="transparent"
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.home}>
          <IconButton onClick={onGoHome} color="inherit">
            <HomeRoundedIcon />
          </IconButton>
          <Typography className={classes.title}>{pageName}</Typography>
        </div>
        {user ? (
          <div>
            <IconButton onClick={onMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={onMenuClose}
            >
              <MenuItem onClick={() => console.log("my sudokus")}>
                My Sudoku
              </MenuItem>
              <MenuItem onClick={() => console.log("accoutn")}>
                Account
              </MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={classes.buttons}>
            <MainButton
              className={classes.loginButton}
              text="Login"
              type="noRadius"
              onClick={onGoToLogin}
            />
            <MainButton
              className={classes.registerButton}
              text="Register"
              type="noRadius"
              onClick={onGoToRegister}
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  root: {
    color: colors.darkBlueGrey,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.black,
    paddingLeft: 20,
  },
  loginButton: {
    fontFamily: fonts.light,
    marginRight: 10,
  },
  registerButton: {
    fontFamily: fonts.light,
  },
  buttons: {
    display: "flex",
  },
  home: {
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default Navbar;
