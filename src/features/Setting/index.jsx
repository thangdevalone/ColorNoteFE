import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material";
import classNames from "classnames";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import BoxDoubleContent from "../../components/BoxDoubleContent";
import ColorBox from "../../components/ColorBox";
import CheckIcon from "../../components/CustomIcons/CheckIcon";
import { colorBucket } from "../../constants";
import { Update, logOut } from "../Auth/userSlice";
import classes from "./styles.module.css";

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
    const {enqueueSnackbar}=useSnackbar()
   
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
    const handleEdit=()=>{
        enqueueSnackbar("Editing is currently unavailable. Try it in the next update",{variant:"warning"})
    }
    const handleLogOut = async () => {
        const action = logOut();
        await dispatch(action);
        setTimeout(() => {
            navigate("/login");
        }, 500);
    };
    const [showPassword, setShowPassword] = useState(false);
    const [valueLock, setValueLock] = useState("");
    const [openLock, setOpenLock] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [valueLock2, setValueLock2] = useState("");
    const [openLock2, setOpenLock2] = useState(false);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword((x) => !x);
    };
    const handleCloseLock = () => {
        setOpenLock(false);
    };
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword2 = () => {
        setShowPassword2((x) => !x);
    };
    const handleCloseLock2 = () => {
        setOpenLock2(false);
    };
    const handleCreateP2=()=>{
        setOpenLock2(true)        
    }
    const handleEditP2=()=>{
        return;
    }
    const handleOkLock2 =  async () => {
        try {
            const res=await userApi.lock2(user.id,{password_2:valueLock2})
            enqueueSnackbar("Create password 2 successfully",{variant:"success"})
            dispatch(Update({ password_2:  res.password_2}));
            setUser({ ...user,  password_2:  res.password_2 });
            setOpenLock2(false)

        } catch (error) {
            enqueueSnackbar(error.message,{variant:"error"})
        }
    };
    const handleOkLock = async () => {
        try {
            await userApi.delete(user.id,{password:valueLock})
            handleLogOut()
        } catch (error) {
            enqueueSnackbar(error.message,{variant:"error"})
        }
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
            <Dialog open={openLock} onClose={handleCloseLock}>
                    <DialogContent>
                        <FormControl fullWidth sx={{ marginTop: "10px" }} variant='standard'>
                            <InputLabel htmlFor='lock-password'>Password</InputLabel>
                            <Input
                                autoFocus
                                id='lock-password'
                                type={showPassword ? "text" : "password"}
                                value={valueLock}
                                onChange={(e) => setValueLock(e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLock}>Cancel</Button>
                        <Button onClick={handleOkLock}>Delete</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openLock2} onClose={handleCloseLock2}>
                    <DialogContent>
                        <FormControl fullWidth sx={{ marginTop: "10px" }} variant='standard'>
                            <InputLabel htmlFor='lock-password'>Password 2</InputLabel>
                            <Input
                                autoFocus
                                id='lock-password'
                                type={showPassword2? "text" : "password"}
                                value={valueLock2}
                                onChange={(e) => setValueLock2(e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLock2}>Cancel</Button>
                        <Button onClick={handleOkLock2}>Save</Button>
                    </DialogActions>
                </Dialog>
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
                            content_1={<span style={{ fontWeight: 600 }}>Password 2:</span>}
                            content_2={user?.password_2 ?<div>****** <Button onClick={handleEditP2}>Edit</Button></div>:<><Button onClick={handleCreateP2}>Create</Button></>}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={
                                <Button variant='contained' onClick={handleEdit} size='small' sx={{ marginTop: "15px" }}>
                                    Edit Profile
                                </Button>
                            }
                            content_2={<Button variant='contained' onClick={()=>{setOpenLock(true)}} size='small' sx={{ marginTop: "15px" }}>
                            Delete Account
                        </Button>}
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
