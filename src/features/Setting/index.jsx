import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import BoxDoubleContent from "../../components/BoxDoubleContent";

Settings.propTypes = {};
const useStyle = makeStyles(() => ({
    root: {
        width: "calc(100vw - 250px)",
        height: "calc(100vh - 64px)",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
    },
    grid: {
        margin: "0 !important",
        width: "100% !important",
        padding: "20px !important",
    },
    mainText: {
        color: "#6A53CC",
        fontSize: "20px",
        fontWeight: "700",
        marginBottom: "20px",
        display: "inline-block",
    },
}));

function Settings(props) {
    const classes = useStyle();
    const user =
        useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
    const [screen,setScreen]=useState('archived')
    const [theme,setTheme]=useState('light')
    const CustomMenuScreen = () => (
        <FormControl className="stand-select" variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select id='screen-select' value={screen} onChange={handleChangeScreen} autoWidth>
                <MenuItem value={'calendar'}>Calendar</MenuItem>
                <MenuItem value={'archived'}>Archived</MenuItem>
                <MenuItem value={'deleted'}>Deleted</MenuItem>
                <MenuItem value={'settings'}>Settings</MenuItem>
            </Select>
        </FormControl>
    );
    const CustomMenuTheme = () => (
        <FormControl className="stand-select"  variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select id='screen-select' value={theme} onChange={handleChangeTheme} autoWidth>
                <MenuItem value='light'>Light</MenuItem>
                <MenuItem value='dark'>Tokyo Night</MenuItem>
            </Select>
        </FormControl>
    );

    const handleChangeScreen = (e) => {
        console.log(e.target.value);
        setScreen(e.target.value)

    };
    const handleChangeTheme = (e) => {
        console.log(e.target.value);
        setTheme(e.target.value)

    };
    return (
        <div className={classes.root}>
            <Grid
                container
                className={classes.grid}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            >
                <Grid item xs={24} sm={12} md={6} lg={6}>
                    <Box sx={{ mb: 3 }}>
                        <span className={classes.mainText}>Account</span>
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 500 }}>Name:</span>}
                            content_2={user.name}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 500 }}>Gmail:</span>}
                            content_2={user.gmail}
                            customHeight='30px'
                        />
                    </Box>
                    <Divider variant='middle' sx={{ maxWidth: "500px", minWidth: "300px" }} />

                    <Box sx={{ mt: 3, mb: 3 }}>
                        <span className={classes.mainText}>General</span>
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 500 }}>Default screen:</span>}
                            content_2={<CustomMenuScreen />}
                            customHeight='40px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 500 }}>Default theme:</span>}
                            content_2={<CustomMenuTheme/>}
                            customHeight='40px'
                        />
                    </Box>
                    <Divider variant='middle' sx={{ maxWidth: "500px", minWidth: "300px" }} />
                </Grid>
                <Grid item xs={24} sm={12} md={6} lg={6}></Grid>
            </Grid>
        </div>
    );
}

export default Settings;
