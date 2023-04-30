import { Add, Delete, KeyboardArrowRight, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton, LinearProgress, Stack, createTheme } from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import noteApi from "../../api/noteApi";
import { checkJWT } from "../../constants";
import Archived from "../../features/Archived";
import CalendarTable from "../../features/Calendar";
import Deleted from "../../features/Deleted";
import Settings from "../../features/Setting";
import PinnedIcon from "../CustomIcons/PinnedIcon";
import CheckListBox from "../FieldNote/CheckListFieldBox";
import TextFieldBox from "../FieldNote/TextFieldBox";
import Footer from "../Footer";
import ReleaseDoc from "../ReleaseDoc";
import SideBar from "../SideBar";
import ToolsNote from "../ToolsNote";
import Groups from "../../features/Groups";
import "./home.css";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { refresh } from "../../features/Auth/userSlice";
import { useJwt } from "react-jwt";
import Screenshot from "../../features/Screenshot";
Home.propTypes = {};
const theme = createTheme({
    palette: {
        nearWhite: {
            main: "#F0F0F0",
            contrastText: "#fff",
        },
    },
});

function Home(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState(
        useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"))
    );
    const [isLogin, setIsLogin] = useState(false);
    const [colorNote, setColorNote] = useState(user.df_color);
    const [df_nav, setDf_nav] = useState(user.df_screen);

    const { pathname } = useLocation();
    const [drawerNew, setDrawerNew] = useState(false);
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [dataTrash, setDataTrash] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [options, setOptions] = useState({
        dueAt: null,
        remindAt: null,
        lock: null,
        share: null,
    });
    const [pinned, setPinned] = useState(false);
    const { refreshToken } = useJwt({ token: user?.jwt || JSON.parse(localStorage.getItem('access_token')) });
    // Tự động refresh token sau 30 phút
    const dispatch=useDispatch()
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const token= await dispatch(refresh())
            console.log(token)
            if (token) {
                // Nếu nhận được token mới, cập nhật lại giá trị trong state hoặc local storage
                localStorage.setItem('access_token', JSON.stringify(token));
              }
        }, 30 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [dispatch, refreshToken]);
    const toggleDrawer = () => {
        setDrawerNew(false);
    };
    useEffect(() => {
        if (checkJWT()) {
            navigate("/login");
        } else {
            setIsLogin(true);
            (async () => {
                try {
                    const response1 = await noteApi.getNotes(user.id);
                    setData(response1.notes || []);
                    const response2 = await noteApi.getTrash(user.id);
                    setDataTrash(response2.notes || []);
                } catch (error) {}
            })();
        }
    }, []);
    const [files, setFiles] = useState([]);
    const imgRef = useRef(null);
    const fileImg = useRef(null);

    useEffect(() => {
        const im = imgRef.current;

        if (im && files && files.length) {
            im.src = URL.createObjectURL(files[0]);
        }
    }, [files]);

    const handleUpload = () => {
        fileImg.current.click();
    };
    const handleOpenDrawer = (param) => {
        setType(param);
        setDrawerNew(true);
        setOptions({ ...options, dueAt: null, remindAt: null, lock: null });
        setColorNote(user.df_color);
    };
    const handleDelNote = async (idNote, type) => {
        try {
            if (type === "trunc") {
                const res = await noteApi.delTruncNote(idNote);
                enqueueSnackbar(res.message, { variant: "success" });
            }
            if (type === "move") {
                const res = await noteApi.delMoveTrash(idNote);
                enqueueSnackbar(res.message, { variant: "success" });

                const newData = [...dataTrash, res.note];
                setDataTrash(newData);
            }
            const newData2 = [...data];
            const newDataFilter = newData2.filter((item) => item.idNote !== idNote);
            setData(newDataFilter);
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const handleNoteForm = async (value) => {
        const configOptions = {
            ...options,
            dueAt:
                typeof options.dueAt === "object" && options.dueAt
                    ? dayjs(options.dueAt).format("DD/MM/YYYY hh:mm A Z")
                    : options.dueAt,
            remindAt:
                typeof options.remindAt === "object" && options.remindAt
                    ? dayjs(options.remindAt).format("DD/MM/YYYY hh:mm A Z")
                    : options.remindAt,
        };
        console.log(configOptions);

        const configParam = {
            ...value,
            ...configOptions,
            pinned: pinned,
            type: type,
        };
        
        try {
            setIsSubmitting(true);
            if(type==="image"){
                const formData = new FormData();
                let imgbb={}
                if (files.length !==0){
                    formData.append('image', files[0]);

                    imgbb = await axios.post('https://api.imgbb.com/1/upload?key=a07b4b5e0548a50248aecfb194645bac', formData)
                }
                const url=imgbb?.data.data.url || null
                const res = await noteApi.createNote(user.id, {...configParam,metaData:url});
                setIsSubmitting(false);
                enqueueSnackbar(res.message, { variant: "success" });
                setFiles([])
                const newData = [...data];
                newData.push(res.note);
                setData(newData);
                setDrawerNew(false);
            }
            else{
                
                const res = await noteApi.createNote(user.id, configParam);
                setIsSubmitting(false);
    
                enqueueSnackbar(res.message, { variant: "success" });
                const newData = [...data];
                newData.push(res.note);
                setDrawerNew(false);
                setData(newData);
            }
           
        } catch (error) {
            setIsSubmitting(false);

            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    const handleChangeNote = (color) => {
        setColorNote(color);
    };
    const handleOptionsNote = (param) => {
        setOptions({ ...options, ...param });
    };
    const handleInTrash = async (idNote, type) => {
        try {
            if (type === "trunc") {
                const res = await noteApi.delTruncNote(idNote);
                enqueueSnackbar(res.message, { variant: "success" });
            }
            if (type === "res") {
                const res = await noteApi.restoreTrash(idNote);
                enqueueSnackbar(res.message, { variant: "success" });
                const newData = [...data, res.note];
                setData(newData);
            }
            const newTrash = [...dataTrash];
            const newTrashFilter = newTrash.filter((item) => item.idNote !== idNote);
            setDataTrash(newTrashFilter);
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    const handleEdit = (id, newVal) => {
        const index = data.findIndex((item) => item.idNote === id);
        const newDataEdit = [...data];
        newDataEdit[index] = { ...newDataEdit[index], ...newVal };
        setData(newDataEdit);
    };
    const handleEditTrash = (id, newVal) => {
        const index = dataTrash.findIndex((item) => item.idNote === id);
        const newDataEdit = [...dataTrash];
        newDataEdit[index] = { ...newDataEdit[index], ...newVal };
        setDataTrash(newDataEdit);
    };
    const release = localStorage.getItem("show") === "true" ? true : false;
    const view = !(
        pathname.split("/")[2] === "settings" ||
        pathname.split("/")[2] === "calendar" ||
        pathname.split("/")[2] === "groups"
    );
    return (
        <div>
            {isLogin && (
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        backgroundImage:
                            "linear-gradient(to right,#D0FADE, rgba(255, 134, 250, 0.2))",
                        overflow: "hidden",
                    }}
                    className={"df_size"}
                >
                    {release && <ReleaseDoc />}
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
                        className='box-container'
                        anchor='right'
                        open={drawerNew}
                        sx={{
                            width: "400px",
                            position: "relative",
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: "400px",
                                boxSizing: "border-box",
                                height: "calc(100% - 65px)",
                            },
                        }}
                    >
                        {isSubmitting && <LinearProgress className='pg-load' />}
                        <Box sx={{ height: "100%", padding: "10px 20px 0px 20px" }}>
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

                            <Box
                                className='box-container'
                                sx={{
                                    height: "calc((100% - 100px)/2)",
                                    overflow: "hidden auto",
                                    padding: "10px",
                                }}
                            >
                                {type === "image" && (
                                    <>
                                        <Button
                                            startIcon={<Add />}
                                            onClick={handleUpload}
                                            variant='outlined'
                                        >
                                            Upload Image
                                            <input
                                                style={{ display: "none" }}
                                                id='upload-photo'
                                                name='upload-photo'
                                                type='file'
                                                accept='image/*'
                                                onChange={(e) => {
                                                    setFiles(e.target.files);
                                                }}
                                                ref={fileImg}
                                            />
                                        </Button>
                                        <div id='wrap-img'>
                                            <ThemeProvider theme={theme}>
                                                <Stack
                                                    sx={{
                                                        display: `${
                                                            files.length === 0 ? "none" : "block"
                                                        }`,
                                                    }}
                                                    id='img-stack'
                                                    direction='row'
                                                    spacing={2}
                                                >
                                                    <IconButton size='large' color="nearWhite" aria-label='view'>
                                                        <RemoveRedEye />
                                                    </IconButton>
                                                    <IconButton size='large'  color="nearWhite" aria-label='delete'>
                                                        <Delete />
                                                    </IconButton>
                                                </Stack>
                                            </ThemeProvider>
                                            <img
                                                ref={imgRef}
                                                id='img-upload'
                                                style={{
                                                    display: `${
                                                        files.length === 0 ? "none" : "block"
                                                    }`,
                                                    width: "100%",
                                                    margin: "5px 0px",
                                                }}
                                                alt='note-img'
                                            />
                                        </div>
                                    </>
                                )}
                                <Box sx={{ position: "relative" }}>
                                    <span
                                        onClick={() => {
                                            setPinned(!pinned);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            top: "-10px",
                                            left: "-8px",
                                        }}
                                    >
                                        <PinnedIcon active={pinned} />
                                    </span>
                                    {type === "text" && (
                                        <TextFieldBox
                                            isSubmitting={isSubmitting}
                                            handleNoteForm={handleNoteForm}
                                            bg={colorNote}
                                            action='Create'
                                        />
                                    )}
                                    {type === "image" && (
                                        <TextFieldBox
                                            isSubmitting={isSubmitting}
                                            handleNoteForm={handleNoteForm}
                                            bg={colorNote}
                                            action='Create'
                                        />
                                    )}
                                    {type === "checklist" && (
                                        <CheckListBox
                                            isSubmitting={isSubmitting}
                                            handleNoteForm={handleNoteForm}
                                            bg={colorNote}
                                            action='Create'
                                        />
                                    )}
                                </Box>
                            </Box>
                            <Box style={{ height: "calc((100% - 50px)/2)", marginTop: "5px" }}>
                                <ToolsNote
                                    options={options}
                                    handleChangeNote={handleChangeNote}
                                    handleOptionsNote={handleOptionsNote}
                                />
                            </Box>
                        </Box>
                    </Drawer>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to={`/home/${df_nav.toLowerCase()}`} />}
                        />
                        <Route path='/calendar' element={<CalendarTable data={data} />} />
                        <Route
                            path='/archived'
                            element={
                                <Archived
                                    data={data}
                                    setArchivedData={handleEdit}
                                    handleDelNote={handleDelNote}
                                />
                            }
                        />
                        <Route
                            path='/screenshot'
                            element={
                                <Screenshot
                                    data={data}
                                    setArchivedData={handleEdit}
                                    handleDelNote={handleDelNote}
                                />
                            }
                        />
                        <Route
                            path='/deleted'
                            element={
                                <Deleted
                                    data={dataTrash}
                                    handleInTrash={handleInTrash}
                                    setTrashData={handleEditTrash}
                                />
                            }
                        />
                        <Route
                            path='/settings'
                            element={
                                <Settings
                                    setDf_nav={setDf_nav}
                                    setColorNote={setColorNote}
                                    setUser={setUser}
                                />
                            }
                        />
                        <Route path='/groups' element={<Groups />} />
                    </Routes>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default Home;
