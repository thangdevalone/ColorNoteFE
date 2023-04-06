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
    construct: PropTypes.string.isRequired,
    setArchivedData: PropTypes.func.isRequired,
};

function getList(list, type) {
    if (type === "text") {
        return list;
    }
    if (type === "checklist") {
        return list.map((item) => ({ ...item, status: !!item.status, id: item.id }));
    }
}
function NoteItem({ dataItem, handleDelNote, setArchivedData, construct }) {
    const [open, setOpen] = useState(false);
    const [drawerEdit, setDrawerEdit] = useState(false);
    const [pinned, setPinned] = useState(dataItem.pinned);
    const [data, setData] = useState(getList(dataItem.data, dataItem.type));
    const [colorNote, setColorNote] = useState(dataItem.color);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
        dueAt: typeof dataItem.dueAt !== "object" ? dayjs(dataItem.dueAt) : dataItem.dueAt,
        remindAt:
            typeof dataItem.remindAt !== "object" ? dayjs(dataItem.remindAt) : dataItem.remindAt,
        lock: dataItem.lock,
        share: dataItem.share,
    });
    const handleChange = async (id) => {
        try {
            await noteApi.tick(id);
            const newList = dataItem.data;
            const itemIndex = dataItem.data.findIndex((item) => item.id === id);
            newList[itemIndex] = {
                ...newList[itemIndex],
                status: !Boolean(newList[itemIndex].status),
            };
            const newData = { ...dataItem, data: newList };
            setArchivedData(newData);
            const newListBox = getList(newList, "checklist");
            setData([...newListBox]);
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
                typeof options.dueAt === "object" && options.dueAt
                    ? dayjs(options.dueAt).format("DD/MM/YYYY hh:mm A Z")
                    : options.dueAt,
            remindAt:
                typeof options.remindAt === "object" && options.remindAt
                    ? dayjs(options.remindAt).format("DD/MM/YYYY hh:mm A Z")
                    : options.remindAt,
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
            setArchivedData(dataItem.idNote, res.note);
        } catch (error) {
            setIsSubmitting(false);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };
    return (
        <div
            style={{
                backgroundColor: `${convertColor(dataItem.color)}`,
                position: "relative",
                width: "100%",
                maxWidth: `${construct==="Grid" ?"350px" :"none"}`,
                height: `${construct==="Grid" ?"220px":"auto"}`,
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                padding: "10px 15px",
            }}
        >
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
                                list={data}
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
                    <Button onClick={handleMoveTrash}>
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
            <>
                {construct === "Grid" && (
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
                                <Typography sx={{color: "#00000080",fontWeight:"500",fontSize:"16px"}}>{dataItem.data}</Typography>
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
                                            sx={{
                                                "& .MuiButtonBase-root": {
                                                    padding: "5px 10px!important",
                                                },
                                                borderLeft: `3px solid ${
                                                    item.status ? "#0C66E4" : "transparent"
                                                }`,
                                                backgroundColor: `${
                                                    item.status
                                                        ? "rgba(9, 30, 66, 0.0588235) !important"
                                                        : "transparent"
                                                }`,
                                            }}
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
                                                            style={{
                                                                textDecoration: `${
                                                                    item.status
                                                                        ? "line-through"
                                                                        : "none"
                                                                }`,
                                                            }}
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
                )}
            </>
            <div
                style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    background: `${construct==="Grid"?"rgba(255, 255, 255, 0.160784)":"transparent"}`,
                    borderRadius: "3px",
                    display: "inline-block",
                    color:`${construct==="Grid"?"black":"rgb(79 73 73 / 80%)"}`,
                    padding: `${construct==="Grid"?"5px 8px":"0"}`,
                    position: `${construct==="Grid"?"absolute":"relative"}`,
                    bottom: `${construct==="Grid"?"15px":"0px"}`,
                    marginRight: "15px",
                }}
            >
                Create at: {dayjs(dataItem.createAt).format("DD/MM/YYYY hh:mm A")}
            </div>
        </div>
    );
}

export default NoteItem;
