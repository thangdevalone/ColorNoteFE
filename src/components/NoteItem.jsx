import { DeleteOutline, EditOutlined, KeyboardArrowRight } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Drawer,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import noteApi from "../api/noteApi";
import { convertColor } from "../constants";
import PinnedIcon from "./CustomIcons/PinnedIcon";
import CheckListBox from "./FieldNote/CheckListFieldBox";
import TextFieldBox from "./FieldNote/TextFieldBox";
import ToolsNote from "./ToolsNote";

NoteItem.propTypes = {
    dataItem: PropTypes.object.isRequired,
    handleDelNote: PropTypes.func.isRequired,
    setArchivedData:PropTypes.func.isRequired
};

const useStyle = makeStyles(() => ({
    note: {
        position: "relative",
        width: "100%",
        maxWidth: "350px",
        height: "220px",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
        padding: "10px 15px",
    },
    title: {
        fontWeight: 500,
        fontSize: "24px",
        width: "calc(100% - 80px)",
        marginBottom: "5px",
        display: "block",
        cursor: "default",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    boxWrap: {
        fontWeight: 500,
        fontSize: "14px",
        background: "rgba(255, 255, 255, 0.160784)",
        borderRadius: "3px",
        display: "inline-block",
        padding: "5px 8px",
        position: "absolute",
        bottom: "15px",
    },
    lineThrough: {
        textDecorationLine: "line-through",
    },
    list: {
        "& .MuiButtonBase-root": {
            padding: "5px 10px!important",
        },
        borderLeft: "3px solid transparent   !important",
    },

    listDone: {
        background: "rgba(9, 30, 66, 0.0588235) !important",
        borderLeft: "3px solid #0C66E4   !important",
        "& .MuiButtonBase-root": {
            padding: "5px 10px!important",
        },
    },
}));
function NoteItem({ dataItem, handleDelNote ,setArchivedData}) {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);
    const [drawerEdit, setDrawerEdit] = useState(false);
    const [pinned, setPinned] = useState(dataItem.pinned);
    const [colorNote, setColorNote] = useState(dataItem.color);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {enqueueSnackbar}=useSnackbar()
    const [options, setOptions] = useState({
        dueAt:
            typeof dataItem.dueAt !== "object"
                ? dayjs(dataItem.dueAt)
                : dataItem.dueAt,
        remindAt: dataItem.remindAt,
        lock: dataItem.lock,
        share: dataItem.share,
    });
    const handleChange = async (id) => {
       
        try {
            await noteApi.tick(id)
            const newList = dataItem.data;
            const itemIndex = dataItem.data.findIndex((item) => item.id === id);
            newList[itemIndex] = { ...newList[itemIndex], status: !Boolean(newList[itemIndex].status) };
            const newData = { ...dataItem, data: newList };
            setArchivedData(newData);

        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    const handleDelete = () => {
        setOpen(false);

        handleDelNote(dataItem.idNote, "trunc");
    };
    const handleMoveTrash = () => {
        setOpen(false);
        handleDelNote(dataItem.idNote, "move");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDrawer = () => {
        setDrawerEdit(true);
    };
    const handleChangeNote = (color) => {
        setColorNote(color);
    };
    const handleOptionsNote = (param) => {
        setOptions({ ...options, ...param });
    };
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
            type: dataItem.type,
        };

        try {
            setIsSubmitting(true);
            const res = await noteApi.editNote(dataItem.idNote, configParam);
            setIsSubmitting(false);

            enqueueSnackbar(res.message, { variant: "success" });
            
            setDrawerEdit(false);
            setArchivedData(dataItem.idNote,res.note)
        } catch (error) {
            setIsSubmitting(false);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    console.log(dataItem)
    return (
        <div className={classes.note} style={{ backgroundColor: `${convertColor(dataItem.color)}` }}>
            <Drawer
                variant='persistent'
                className='box-container'
                anchor='right'
                open={drawerEdit}
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
                            onClick={() => {
                                setDrawerEdit(false);
                            }}
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
                            Edit
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
                            <PinnedIcon active={Boolean(pinned)} />
                        </span>
                        {dataItem.type === "text" && (
                            <TextFieldBox
                                isSubmitting={isSubmitting}
                                handleNoteForm={handleNoteForm}
                                bg={colorNote}
                                action='Edit'
                                cx={dataItem.data}
                                tt={dataItem.title}
                            />
                        )}
                        {dataItem.type === "checklist" && (
                            <CheckListBox
                                isSubmitting={isSubmitting}
                                handleNoteForm={handleNoteForm}
                                bg={colorNote}
                                action='Edit'
                                list={dataItem.data}
                                tt={dataItem.title}
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Confirm delete note"}</DialogTitle>
                <DialogContent sx={{ padding: "20px 20px 20px 40px", color: "rgba(0, 0, 0, 0.6)" }}>
                    <ul>
                        <li>
                            <strong>Button Delete: </strong>Your note will be{" "}
                            <b>permanently deleted </b> when clicking delete button
                        </li>
                        <li>
                            <strong>Button Move Trash: </strong>Your notes will be deleted and then
                            moved to the <b>trash bin</b>. You can restore it
                        </li>
                        <li>
                            <strong>Button Cancel: </strong>No delete
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleMoveTrash} autoFocus>
                        Move Trash
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ position: "absolute", right: "10px" }}>
                <IconButton color='primary' onClick={handleOpenDrawer} aria-label='edit note'>
                    <EditOutlined />
                </IconButton>
                <IconButton aria-label='delelte note' onClick={handleClickOpen}>
                    <DeleteOutline />
                </IconButton>
            </Box>
            <Tooltip title={<span style={{ fontSize: "14px" }}>{dataItem.title}</span>} placement='top'>
                <span className={classes.title}>{dataItem.title}</span>
            </Tooltip>

            {dataItem.pinned ? (
                <span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
                    <PinnedIcon />
                </span>
            ) : (
                ""
            )}
            <>
                {dataItem.type === "text" && (
                    <div
                        className='box-container'
                        style={{
                            width: "100%",
                            overflow: "hidden auto",
                            maxHeight: "130px",
                            wordWrap: "break-word",
                        }}
                    >
                        <Typography variant='body2'>{dataItem.data}</Typography>
                    </div>
                )}
                {dataItem.type === "checklist" && (
                    <div
                        className='box-container'
                        style={{ overflow: "hidden auto", maxHeight: "130px" }}
                    >
                        {dataItem.data.map((item) => {
                            const labelId = `checkbox-${dataItem.idNode}-${item.id}`;

                            return (
                                <ListItem
                                    className={classNames({
                                        [classes.list]: true,
                                        [classes.listDone]: item.status,
                                    })}
                                    key={item.id}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            handleChange(item.id);
                                        }}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                size='small'
                                                checked={Boolean(item.status)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ "aria-labelledby": labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            id={labelId}
                                            sx={{ wordWrap: "break-word" }}
                                            primary={
                                                <span
                                                    className={classNames({
                                                        [classes.lineThrough]: item.status,
                                                    })}
                                                >
                                                    {item.content}
                                                </span>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </div>
                )}
            </>
            <div className={classes.boxWrap}>
                Due at: {dayjs(dataItem.dueAt).format("DD/MM/YYYY hh:mm A")}
            </div>
        </div>
    );
}

export default NoteItem;
