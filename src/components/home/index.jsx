import React from "react";
import PropTypes from "prop-types";
import { makeStyles, styled } from "@mui/styles";
import SideBar from "../SideBar";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import Calendar from "../../features/Calendar";
import Archived from "../../features/Archived";

Home.propTypes = {};

const useStyle = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundImage:
      "linear-gradient(to right,#D0FADE, rgba(255, 134, 250, 0.2))",
    overflow:"hidden"
  },
}));

function Home(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <SideBar />
     
      <img
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          zIndex: "1",
          transform: "translateY(-50%)",
        }}
        src="../../../assets/home-icon.png"
        alt="homeicon"
      />
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/archived" element={<Archived/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Home;
