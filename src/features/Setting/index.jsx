import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Select
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoxDoubleContent from "../../components/BoxDoubleContent";
import ColorBox from "../../components/ColorBox";
import { colorBucket } from "../../constants";
import { CheckCircleOutline, LoginOutlined } from "@mui/icons-material";
import CheckIcon from "../../components/CustomIcons/CheckIcon";
import classNames from "classnames";
import { logOut } from "../Auth/userSlice";
import { useNavigate } from "react-router-dom";

Settings.propTypes = {};
const useStyle = makeStyles(() => ({
    root: {
        width: "calc(100vw - 250px)",
        height: "calc(100vh - 64px)",
        position: "absolute",
        overflow:"hidden auto",
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
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "20px",
        display: "inline-block",
    },
}));
const configColorBox = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    margin:"0 auto",
    border:"1px solid black"
};
function Settings(props) {
    const classes = useStyle();
    const navigate=useNavigate()
    const user =
        useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
    const [screen, setScreen] = useState("archived");
    const [color, setColor] = useState(colorBucket.color_1);
    const [fontSize, setFontSize] = useState('default');
    const dispatch=useDispatch()
    const handleLogOut = async () => {
    
          const action = logOut();
    
          const resultAction = await dispatch(action);
          navigate("/login");
       
      };
    const CustomMenuScreen = () => (
        <FormControl className='stand-select' variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select id='screen-select' value={screen} onChange={handleChangeScreen} autoWidth>
                <MenuItem value={"calendar"}>Calendar</MenuItem>
                <MenuItem value={"archived"}>Archived</MenuItem>
                <MenuItem value={"deleted"}>Deleted</MenuItem>
                <MenuItem value={"settings"}>Settings</MenuItem>
            </Select>
        </FormControl>
    );
    const CustomMenuFontSize = () => (
        <FormControl className='stand-select' variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select id='screen-select' value={fontSize} onChange={handleChangeFontSize} autoWidth>
                <MenuItem value={"small"}>Small</MenuItem>
                <MenuItem value={"default"}>Default</MenuItem>
                <MenuItem value={"large"}>Large</MenuItem>
               
            </Select>
        </FormControl>
    );
    const CustomMenuColor = () => (
        <FormControl className='stand-select' variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select
                id='color-select'
                value={color}
                onChange={handleChangeColor}
                autoWidth
            >
                <MenuItem value={colorBucket.color_1}>
                    <ColorBox color={colorBucket.color_1} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_2}>
                    <ColorBox color={colorBucket.color_2} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_3}>
                    <ColorBox color={colorBucket.color_3} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_4}>
                    <ColorBox color={colorBucket.color_4} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_5}>
                    <ColorBox color={colorBucket.color_5} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_6}>
                    <ColorBox color={colorBucket.color_6} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_7}>
                    <ColorBox color={colorBucket.color_7} sx={configColorBox} />
                </MenuItem>
                <MenuItem value={colorBucket.color_8}>
                    <ColorBox color={colorBucket.color_8} sx={configColorBox} />
                </MenuItem>
            </Select>
        </FormControl>
    );

    const handleChangeScreen = (e) => {
        console.log(e.target.value);
        setScreen(e.target.value);
    };
    const handleChangeColor = (e) => {
        console.log(e.target.value);
        setColor(e.target.value);
    };
    const handleChangeFontSize = (e) => {
        console.log(e.target.value);
        setFontSize(e.target.value);
    };
    return (
        <div className={classNames({
            [classes.root]:true,
            "box-container":true
        })}>
            <Button onClick={handleLogOut} variant="text" endIcon={<LoginOutlined/> } sx={{position:"absolute", right:"10px", top:"10px"}}>Log out</Button>
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
                            content_1={<Button variant="contained" size="small" sx={{marginTop:"15px"}}>Edit Profile</Button>}
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
                         <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Default font size:</span>}
                            content_2={<CustomMenuFontSize />}
                            customHeight='40px'
                        />
                    </Box>
                    <Divider variant='middle' sx={{ maxWidth: "500px", minWidth: "300px" }} />
                    <Box sx={{ mt: 3 }}>
                        <span className={classes.mainText}>Online Sync & Backup</span>
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Sync on lauch:</span>}
                            content_2={<CheckIcon/>}
                            customHeight='30px'
                        />
                        <BoxDoubleContent
                            content_1={<span style={{ fontWeight: 600 }}>Auto backup:</span>}
                            content_2={<CheckIcon/>}
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
