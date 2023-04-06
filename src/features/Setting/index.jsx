import { Box, Button, Divider, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxDoubleContent from "../../components/BoxDoubleContent";
import ColorBox from "../../components/ColorBox";
import { LoginOutlined } from "@mui/icons-material";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../components/CustomIcons/CheckIcon";
import { colorBucket } from "../../constants";
import { Update, logOut } from "../Auth/userSlice";
import classes from "./styles.module.css";
import userApi from "../../api/userApi";
import PropTypes from "prop-types";
Settings.propTypes = {
    setDf_nav: PropTypes.func.isRequired,
    setColorNote: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};

const configColorBox = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    margin: "0 auto",
    border: "1px solid black",
};
function diff(color, otherColor) {
    if (color.r !== otherColor.r) {
        return false;
    }
    if (color.g !== otherColor.g) {
        return false;
    }
    if (color.b !== otherColor.b) {
        return false;
    }
    return true;
}

function Settings({ setDf_nav, setColorNote, setUser }) {
    const navigate = useNavigate();

    const user =
        useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
    const [screen, setScreen] = useState(user.df_screen);
    const [color, setColor] = useState(() => {
        for (const key in colorBucket) {
            if (diff(colorBucket[key], user.df_color)) {
                return key;
            }
        }
    });
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        const action = logOut();
        await dispatch(action);
        navigate("/login");
    };
    const CustomMenuScreen = () => (
        <FormControl className='stand-select' variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select
                id='screen-select'
                value={screen.toLowerCase()}
                onChange={handleChangeScreen}
                autoWidth
            >
                <MenuItem value={"calendar"}>Calendar</MenuItem>
                <MenuItem value={"archived"}>Archived</MenuItem>
                <MenuItem value={"deleted"}>Deleted</MenuItem>
                <MenuItem value={"settings"}>Settings</MenuItem>
            </Select>
        </FormControl>
    );

    const CustomMenuColor = () => (
        <FormControl className='stand-select' variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select id='color-select' value={color} onChange={handleChangeColor} autoWidth>
                <MenuItem value={"color_1"}>
                    <ColorBox color={colorBucket.color_1} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_2"}>
                    <ColorBox color={colorBucket.color_2} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_3"}>
                    <ColorBox color={colorBucket.color_3} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_4"}>
                    <ColorBox color={colorBucket.color_4} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_5"}>
                    <ColorBox color={colorBucket.color_5} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_6"}>
                    <ColorBox color={colorBucket.color_6} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_7"}>
                    <ColorBox color={colorBucket.color_7} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={"color_8"}>
                    <ColorBox color={colorBucket.color_8} sx={configColorBox} />
                </MenuItem>
            </Select>
        </FormControl>
    );

    const handleChangeScreen = async (e) => {
        setScreen(e.target.value);
        try {
            await userApi.update({ screen: e.target.value }, user.id);
            dispatch(Update({ df_screen: e.target.value }));
            setDf_nav(e.target.value);
            setUser({ ...user, df_screen: e.target.value });
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeColor = async (e) => {
        setColor(e.target.value);
        try {
            await userApi.update({ color: colorBucket[e.target.value] }, user.id);
            dispatch(Update({ df_color: colorBucket[e.target.value] }));
            setColorNote(colorBucket[e.target.value]);
            setUser({ ...user, df_color: colorBucket[e.target.value] });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            className={classNames({
                [classes.root]: true,
                "box-container": true,
            })}
        >
            <Button
                onClick={handleLogOut}
                variant='text'
                endIcon={<LoginOutlined />}
                sx={{ position: "absolute", right: "10px", top: "10px" }}
            >
                Log out
            </Button>
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
                            content_1={<span style={{ fontWeight: 600 }}>Name:</span>}
                            content_2={user.name}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Gmail:</span>}
                            content_2={user.gmail}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={
                                <Button variant='contained' size='small' sx={{ marginTop: "15px" }}>
                                    Edit Profile
                                </Button>
                            }
                            content_2={<span></span>}
                            customHeight='30px'
                        />
                    </Box>
                    <Divider variant='middle' sx={{ maxWidth: "500px", minWidth: "300px" }} />

                    <Box sx={{ mt: 3, mb: 3 }}>
                        <span className={classes.mainText}>General</span>
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Default screen:</span>}
                            content_2={<CustomMenuScreen />}
                            customHeight='40px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Default color:</span>}
                            content_2={<CustomMenuColor />}
                            customHeight='40px'
                        />
                    </Box>
                    <Divider variant='middle' sx={{ maxWidth: "500px", minWidth: "300px" }} />
                    <Box sx={{ mt: 3 }}>
                        <span className={classes.mainText}>Online Sync & Backup</span>
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Sync on lauch:</span>}
                            content_2={<CheckIcon />}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Auto backup:</span>}
                            content_2={<CheckIcon />}
                            customHeight='30px'
                        />
                    </Box>
                </Grid>
                <Grid item xs={24} sm={12} md={6} lg={6}></Grid>
            </Grid>
        </div>
    );
}

export default Settings;
