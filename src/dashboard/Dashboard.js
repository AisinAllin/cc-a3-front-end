import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Toolbar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./Dashboard.css";
import HomePage from "./homePage/HomePage";
import DrumPage from "./drum/DrumPage";
import PianoPage from "./piano/PianoPage";
import GuitarPage from "./guitar/GuitarPage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Dashboard = () => {
  const history = useHistory();

  const [value, setValue] = React.useState(0);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleProfile = () => {
    history.push("/profile");
  };
  const handleAdd = () => {
    history.push("/addproduct");
  };
  const handleCart = () => {
    history.push("/cart");
  };
  const handleLogOut = () => {
    localStorage.clear();
    localStorage.setItem("login", false);
    history.push("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const loginStatus = localStorage.getItem("login");
  if (localStorage.getItem("login") === "false") {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Drum" {...a11yProps(1)} />
            <Tab label="guitar" {...a11yProps(2)} />
            <Tab label="piano" {...a11yProps(3)} />
            {auth && (
              <div className="user_profile_icon">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleCart}>Cart</MenuItem>
                  <MenuItem onClick={handleAdd}>Add Product</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <HomePage />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DrumPage />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <GuitarPage />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <PianoPage />
        </TabPanel>
      </div>
    );
  }
};

export default Dashboard;
