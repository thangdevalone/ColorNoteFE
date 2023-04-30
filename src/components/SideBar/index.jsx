import {
    AddPhotoAlternateOutlined,
    CalendarMonth,
    DeleteOutline,
    Inventory2Outlined,
    ListAltOutlined,
    PeopleOutline,
    Screenshot,
    SettingsOutlined,
    TextSnippetOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Menu,
    MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import React, { useState } from "react";
import classes from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
SideBar.propTypes = {
    handleOpenDrawer: PropTypes.func.isRequired,
    drawerNew: PropTypes.bool.isRequired,
};

function SideBar({ handleOpenDrawer, drawerNew }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCheckList = () => {
        handleClose();
        handleOpenDrawer("checklist");
    };
    const handleText = () => {
        handleClose();
        handleOpenDrawer("text");
    };
    const handleImage = () => {
        handleClose();
        handleOpenDrawer("image");
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user =useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
    const [showPassword2, setShowPassword2] = useState(false);
    const [valueLock2, setValueLock2] = useState("");
    const {enqueueSnackbar}=useSnackbar()

    const [openLock2, setOpenLock2] = useState(false);
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword2 = () => {
        setShowPassword2((x) => !x);
    };
    const handleCloseLock2 = () => {
        setOpenLock2(false);
    };
    const handleOkLock2 = async () => {
        try {
            await userApi.open2(user.id,{password_2:valueLock2})
            navigate("/home/screenshot")
            setOpenLock2(false)
        } catch (error) {
            enqueueSnackbar("Password 2 not true",{variant:"error"})
        }

    };
    const icons = [
        <CalendarMonth
            style={{
                color: "#44546F",
            }}
        />,
        <Inventory2Outlined
            style={{
                color: "#44546F",
            }}
        />,
        <Screenshot
            style={{
                color: "#44546F",
            }}
        />,
        <DeleteOutline
            style={{
                color: "#44546F",
            }}
        />,

        <SettingsOutlined
            style={{
                color: "#44546F",
            }}
        />,
        <PeopleOutline
            style={{
                color: "#44546F",
            }}
        />,
    ];
    const handleNav = (nav) => {
        if (pathname.split("/")[2] === nav) return;
        navigate(`/home/${nav}`);
    };
    return (
        <div className={classes.sidebar}>
            <Dialog open={openLock2} onClose={handleCloseLock2}>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: "10px" }} variant='standard'>
                        <InputLabel htmlFor='lock-password'>Password 2</InputLabel>
                        <Input
                            autoFocus
                            id='lock-password'
                            type={showPassword2 ? "text" : "password"}
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
                    <Button onClick={handleOkLock2}>Open</Button>
                </DialogActions>
            </Dialog>
            <h3 className={classes.nameApp}>CLOUD NOTE</h3>
            <div className='btn-new'>
                <Button
                    variant='contained'
                    onClick={handleClick}
                    className={classes.btnNew}
                    disabled={drawerNew}
                    startIcon={
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M18.0099 8.99L15.0099 5.99M3.49994 20.5C4.32994 21.33 5.66994 21.33 6.49994 20.5L19.4999 7.5C20.3299 6.67 20.3299 5.33 19.4999 4.5C18.6699 3.67 17.3299 3.67 16.4999 4.5L3.49994 17.5C2.66994 18.33 2.66994 19.67 3.49994 20.5Z'
                                stroke='white'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44ZM4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44ZM19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z'
                                stroke='white'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    }
                >
                    New
                </Button>
                <Menu
                    id='new-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={handleText}>
                        <ListItemIcon>
                            <TextSnippetOutlined fontSize='small' />
                        </ListItemIcon>
                        Text
                    </MenuItem>
                    <MenuItem onClick={handleCheckList}>
                        <ListItemIcon>
                            <ListAltOutlined fontSize='small' />
                        </ListItemIcon>
                        Check list
                    </MenuItem>
                    <MenuItem onClick={handleImage}>
                        <ListItemIcon>
                            <AddPhotoAlternateOutlined fontSize='small' />
                        </ListItemIcon>
                        Image
                    </MenuItem>
                </Menu>
            </div>

            <Box className='nav' sx={{ marginTop: 4 }}>
                <List>
                    {["Calendar", "Archived", "Screenshot", "Deleted", "Settings", "Groups"].map(
                        (text, index) => (
                            <ListItem
                                key={text}
                                sx={{ color: "#44546F" }}
                                disablePadding
                                onClick={() => {
                                    if (text.toLowerCase() === "screenshot") {
                                        setOpenLock2(true);
                                    }
                                    else{
                                    handleNav(text.toLowerCase());
                                    }
                                }}
                            >
                                <ListItemButton
                                    selected={
                                        pathname.split("/")[2] === text.toLowerCase() ? true : false
                                    }
                                >
                                    <ListItemIcon>{icons[index]}</ListItemIcon>
                                    <ListItemText
                                        primary={<span style={{ fontWeight: 500 }}>{text}</span>}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 4,
                    position: "relative",
                }}
            >
                <img
                    style={{ width: "150px", transform: "rotate(15deg)" }}
                    src='../../assets/note.png'
                    alt='note'
                />
                <span
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        fontWeight: "700",
                        color: "white",
                        fontSize: "16px",
                    }}
                >
                    Cloud Note
                </span>
            </Box>
        </div>
    );
}

export default SideBar;
