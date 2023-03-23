import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Drawer, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { checkJWT } from "../../constants";
import Archived from "../../features/Archived";
import Calendar from "../../features/Calendar";
import Deleted from "../../features/Deleted";
import Settings from "../../features/Setting";
import Footer from "../Footer";
import SideBar from "../SideBar";
import TextFieldBox from "../FieldNote/TextFieldBox";

Home.propTypes = {};

const useStyle = makeStyles(() => ({
    root: {
        width: "100vw",
        height: "100vh",
        backgroundImage: "linear-gradient(to right,#D0FADE, rgba(255, 134, 250, 0.2))",
        overflow: "hidden",
    },
}));

function Home(props) {
    const classes = useStyle();
    const [isLogin, setIsLogin] = useState(false);
    const { pathname } = useLocation();
    const [drawerNew, setDrawerNew] = useState(false);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setDrawerNew(false);
    };
    useEffect(() => {
        if (checkJWT()) {
            navigate("/login");
        }
        setIsLogin(true);
    }, []);
    const handleOpenDrawer = (param) => {
        setType(param);
        console.log(type);
        setDrawerNew(true);
    };
    const view = !(pathname.split("/")[2] === "settings" || pathname.split("/")[2] === "calendar");
    return (
        <div>
            {isLogin && (
                <div className={classes.root}>
                    <SideBar handleOpenDrawer={handleOpenDrawer} drawerNew={drawerNew} />

                    {view && (
                        <img
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "20px",
                                zIndex: "1",
                                transform: "translateY(-50%)",
                            }}
                            src='../../../assets/home-icon.png'
                            alt='homeicon'
                        />
                    )}
                    <Drawer
                        variant='persistent'
                        anchor='right'
                        open={drawerNew}
                        sx={{
                            width: "400px",
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: "400px", boxSizing: "border-box" },
                        }}
                    >
                        <Box sx={{ overflow: "auto", padding: "10px 20px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <IconButton
                                    onClick={toggleDrawer}
                                    sx={{ position: "absolute", left: "0" }}
                                    aria-label='close'
                                    size='medium'
                                >
                                    <KeyboardArrowRight fontSize='large' />
                                </IconButton>
                                <img
                                    style={{
                                        width: "70px",
                                    }}
                                    src='../../../assets/home-icon.png'
                                    alt='homeicon'
                                />
                                <span
                                    style={{
                                        color: " #6A53CC",
                                        fontSize: "30px",
                                        fontWeight: 800,
                                        marginLeft: "10px",
                                    }}
                                >
                                    New
                                </span>
                            </Box>
                            <Box>
                                <TextFieldBox bg="#00d4f6"/>
                            </Box>
                        </Box>
                    </Drawer>
                    <Routes>
                        <Route path='/' element={<Navigate to='/home/archived' />} />
                        <Route path='/calendar' element={<Calendar />} />
                        <Route path='/archived' element={<Archived />} />
                        <Route path='/deleted' element={<Deleted />} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default Home;
