import {
    Key,
    Lock,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import noteApi from "../api/noteApi";
import { convertColor } from "../constants";
import PinnedIcon from "./CustomIcons/PinnedIcon";


NoteItemLock.propTypes = {
    dataItem: PropTypes.object.isRequired,
    construct: PropTypes.string.isRequired,
    handle:PropTypes.func.isRequired
};

function NoteItemLock({ dataItem, construct,handle }) {
    const [showPassword, setShowPassword] = useState(false);
    const [valueLock, setValueLock] = useState("");
    const [openLock, setOpenLock] = useState(false);
    const {enqueueSnackbar}=useSnackbar()
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword((x) => !x);
    };
    const handleCloseLock = () => {
        setOpenLock(false);
    };
    const handleOkLock = async () => {
        try {
            const res =await noteApi.openNote(dataItem.idNote,{pass_lock:valueLock})
    
            const newVal={...res.note,lock:res.pass_lock,flag:true}
            setOpenLock(false)
            enqueueSnackbar("Note was open successfully",{variant:"success"})
            handle(newVal.idNote,newVal)
 
        } catch (error) {
            enqueueSnackbar(error.message,{variant:"error"})
        }
    };
    return (
        <div
            style={{
                backgroundColor: `${convertColor(dataItem.color)}`,
                position: "relative",
                width: "100%",
                maxWidth: `${construct === "Grid" ? "350px" : "none"}`,
                height: `${construct === "Grid" ? "220px" : "auto"}`,
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "10px 15px",
            }}
        >
            <Box sx={{ position: "absolute", right: "10px" }}>
                <IconButton
                    onClick={() => setOpenLock(true)}
                    color='primary'
                    aria-label='restore view'
                >
                    <Key />
                </IconButton>
                <Dialog open={openLock} onClose={handleCloseLock}>
                    <DialogContent>
                        <FormControl fullWidth sx={{ marginTop: "10px" }} variant='standard'>
                            <InputLabel htmlFor='lock-password'>Lock by password</InputLabel>
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
                        <Button onClick={handleOkLock}>Open Note</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Tooltip
                title={<span style={{ fontSize: "14px" }}>{dataItem.title}</span>}
                placement='top'
            >
                <span
                    style={{
                        fontWeight: 500,
                        fontSize: "24px",
                        width: "calc(100% - 80px)",
                        marginBottom: "5px",
                        display: "block",
                        cursor: "default",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {dataItem.title}
                </span>
            </Tooltip>

            {dataItem.pinned ? (
                <span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
                    <PinnedIcon />
                </span>
            ) : (
                ""
            )}
            {construct === "Grid" && (
                <Box
                    sx={{
                        color: "#00000080",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Note was locked
                    <span style={{ margin: "0 5px", display: "flex", alignItems: "center" }}>
                        <svg
                            width='5'
                            height='5'
                            viewBox='0 0 3 3'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M0.638184 1.56836V1.34814C0.638184 1.0402 0.734863 0.78597 0.928223 0.585449C1.12516 0.384928 1.39193 0.284668 1.72852 0.284668C2.06868 0.284668 2.33724 0.384928 2.53418 0.585449C2.73112 0.78597 2.82959 1.0402 2.82959 1.34814V1.56836C2.82959 1.87272 2.73112 2.12516 2.53418 2.32568C2.34082 2.52262 2.07406 2.62109 1.73389 2.62109C1.3973 2.62109 1.13053 2.52262 0.933594 2.32568C0.736654 2.12516 0.638184 1.87272 0.638184 1.56836Z'
                                fill='#00000080'
                            />
                        </svg>
                    </span>
                    <Lock fontSize='small' />
                </Box>
            )}
            <div
                style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    background: `${
                        construct === "Grid" ? "rgba(255, 255, 255, 0.160784)" : "transparent"
                    }`,
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "3px",
                    color: `${construct === "Grid" ? "black" : "rgb(79 73 73 / 80%)"}`,
                    padding: `${construct === "Grid" ? "5px 8px" : "0"}`,
                    position: `${construct === "Grid" ? "absolute" : "relative"}`,
                    bottom: `${construct === "Grid" ? "15px" : "0px"}`,
                    marginRight: "15px",
                }}
            >
                Create at: {dayjs(dataItem.createAt).format("DD/MM/YYYY hh:mm A")}{" "}
                {construct === "List" && <Lock sx={{ marginLeft: "5px" }} fontSize='16px' />}
            </div>
        </div>
    );
}

export default NoteItemLock;
