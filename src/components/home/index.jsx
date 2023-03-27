import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Drawer, IconButton, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import noteApi from "../../api/noteApi";
import { checkJWT, colorBucket } from "../../constants";
import Archived from "../../features/Archived";
import CalendarTable from "../../features/Calendar";
import Deleted from "../../features/Deleted";
import Settings from "../../features/Setting";
import PinnedIcon from "../CustomIcons/PinnedIcon";
import CheckListBox from "../FieldNote/CheckListFieldBox";
import TextFieldBox from "../FieldNote/TextFieldBox";
import Footer from "../Footer";
import SideBar from "../SideBar";
import ToolsNote from "../ToolsNote";

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
    const { enqueueSnackbar } = useSnackbar();
    const user =
        useSelector((state) => state.user.current) || JSON.parse(localStorage.getItem("user"));
    const [isLogin, setIsLogin] = useState(false);
    const [colorNote, setColorNote] = useState(colorBucket.color_1);
    const { pathname } = useLocation();
    const [drawerNew, setDrawerNew] = useState(false);
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [dataTrash, setDataTrash] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [options, setOptions] = useState({
        dueAt: dayjs(),
        remindAt: null,
        lock: null,
        share: null,
    });
    const [pinned, setPinned] = useState(false);
    const toggleDrawer = () => {
        setDrawerNew(false);
    };
    useEffect(() => {
        if (checkJWT()) {
            navigate("/login");
        }
        setIsLogin(true);
        (async () => {
            try {
                const response1 = await noteApi.getNotes(1);
                setData(response1.notes || []);
                const response2 = await noteApi.getTrash(user.id);
                setDataTrash(response2.notes || []);
            } catch (error) {}
        })();
    }, []);
    
    const handleOpenDrawer = (param) => {
        setType(param);
        setDrawerNew(true);
        setOptions({ ...options, dueAt: dayjs() });
    };
    const handleDelNote= async(idNote,type)=>{
        try {
            if (type==="trunc"){
                const res=await noteApi.delTruncNote(idNote)
                enqueueSnackbar(res.message, { variant: "success" });
            }
            if (type==="move"){
                const res=await noteApi.delMoveTrash(idNote)
                enqueueSnackbar(res.message, { variant: "success" });

                const newData=[...dataTrash,res.note]
                setDataTrash(newData)

                const newData2=[...data]
                const newDataFilter=newData2.filter((item)=>item.idNote!==idNote)
                setData(newDataFilter)

            }
            
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    const handleNoteForm = async (value) => {
        const configOptions = {
            ...options,
            dueAt:
                typeof options.dueAt === "object"
                    ? dayjs(options.dueAt).format("DD/MM/YYYY hh:mm A Z")
                    : options.dueAt,
        };
        const configParam = {
            ...value,
            ...configOptions,
            pinned: pinned,
            type:type,
        };
        console.log(configParam);

        try {
            setIsSubmitting(true);
            const res = await noteApi.createNote(user.id, configParam);
            setIsSubmitting(false);

            enqueueSnackbar(res.message, { variant: "success" });
            const newData = [...data];
            newData.push(res.note);
            setDrawerNew(false);
            setData(newData);
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
    const handleInTrash=async (idNote,type)=>{
        try {
            if (type==="trunc"){
                const res=await noteApi.delTruncNote(idNote)
                enqueueSnackbar(res.message, { variant: "success" });

            }
            if(type==="res"){
                const res=await noteApi.restoreTrash(idNote)
                enqueueSnackbar(res.message, { variant: "success" });
                const newData=[...data,res.note]
                setData(newData)
            }
            const newTrash=[...dataTrash]
            const newTrashFilter=newTrash.filter((item)=>item.idNote!==idNote)
            setDataTrash(newTrashFilter)
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }
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
                                    position: "relative",
                                    height: "calc((100% - 100px)/2)",
                                    overflow: "hidden auto",
                                    padding: "10px",
                                }}
                            >
                                <span
                                    onClick={() => {
                                        setPinned(!pinned);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "10px",
                                        left: "5px",
                                    }}
                                >
                                    <PinnedIcon active={pinned} />
                                </span>
                                {type === "text" && (
                                    <TextFieldBox
                                        isSubmitting={isSubmitting}
                                        handleNoteForm={handleNoteForm}
                                        bg={colorNote}
                                    />
                                )}
                                {type === "checklist" && (
                                    <CheckListBox
                                        isSubmitting={isSubmitting}
                                        handleNoteForm={handleNoteForm}
                                        bg={colorNote}
                                    />
                                )}
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
                        <Route path='/' element={<Navigate to='/home/archived' />} />
                        <Route path='/calendar' element={<CalendarTable />} />
                        <Route path='/archived' element={<Archived data={data} handleDelNote={handleDelNote} />} />
                        <Route path='/deleted' element={<Deleted  data={dataTrash}  handleInTrash={handleInTrash}/>} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default Home;
