import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

SideBar.propTypes = {};
const useStyle = makeStyles(() => ({
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "white",
  },
  nameApp: {
    fontWeight: "800",
    fontSize: "32px",
    lineHeight: "60px",
    textAlign: "center",
    background:
      "linear-gradient(90deg, rgba(50, 245, 117, 0.98) 0%, rgba(245, 227, 66, 0.92) 54.58%, rgba(245, 148, 241, 0.98) 105.86%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  btnNew: {
    boxShadow: "none !important",
    borderRadius: "16px  !important",
    background: "#4CB6F2  !important",
    Width: "140px",
    height: "56px",
    fontSize: "24px !important",
    left: "50%",
    padding: "6px 20px !important",
    justifyContent: "space-evenly",
    transform: "translateX(-50%)",
    textTransform: "none !important",
  },
}));
function SideBar(props) {
  const classes = useStyle();
  return (
    <div className={classes.sidebar}>
      <h3 className={classes.nameApp}>CLOUD NOTE</h3>
      <Button
        variant="contained"
        className={classes.btnNew}
        startIcon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0099 8.99L15.0099 5.99M3.49994 20.5C4.32994 21.33 5.66994 21.33 6.49994 20.5L19.4999 7.5C20.3299 6.67 20.3299 5.33 19.4999 4.5C18.6699 3.67 17.3299 3.67 16.4999 4.5L3.49994 17.5C2.66994 18.33 2.66994 19.67 3.49994 20.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44ZM4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44ZM19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        New
      </Button>
    </div>
  );
}

export default SideBar;
