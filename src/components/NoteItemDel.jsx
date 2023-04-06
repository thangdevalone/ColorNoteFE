import { DeleteOutline, RestoreOutlined } from "@mui/icons-material";
import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { convertColor } from "../constants";
import PinnedIcon from "./CustomIcons/PinnedIcon";

NoteItemDel.propTypes = {
    dataItem: PropTypes.object.isRequired,
    handleInTrash: PropTypes.func.isRequired,
    construct: PropTypes.string.isRequired,
};

function NoteItemDel({ dataItem, handleInTrash, construct }) {
    const [data, setData] = useState(dataItem);

    const handleChange = (id) => {
        const newList = data.data;
        const itemIndex = data.data.findIndex((item) => item.id === id);
        newList[itemIndex] = { ...newList[itemIndex], status: !Boolean(newList[itemIndex].status) };
        const newData = { ...data, data: newList };
        setData(newData);
    };
    const handleDelete = () => {
        handleInTrash(dataItem.idNote, "trunc");
    };
    const handleRestore = () => {
        handleInTrash(dataItem.idNote, "res");
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
            <Box sx={{ position: "absolute", right: "10px" }}>
                <IconButton color='primary' aria-label='restore note' onClick={handleRestore}>
                    <RestoreOutlined />
                </IconButton>
                <IconButton aria-label='delelte note' onClick={handleDelete}>
                    <DeleteOutline />
                </IconButton>
            </Box>
            <Tooltip title={<span style={{ fontSize: "14px" }}>{data.title}</span>} placement='top'>
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
                    {data.title}
                </span>
            </Tooltip>

            {data.pinned ? (
                <span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
                    <PinnedIcon />
                </span>
            ) : (
                ""
            )}
            <>
                {construct === "Grid" && (
                    <>
                        {data.type === "text" && (
                            <div
                                className='box-container'
                                style={{
                                    width: "100%",
                                    overflow: "hidden auto",
                                    maxHeight: "130px",
                                    wordWrap: "break-word",
                                }}
                            >
                                <Typography sx={{color: "#00000080",fontWeight:"500",fontSize:"16px"}}>{data.data}</Typography>
                            </div>
                        )}
                        {data.type === "checklist" && (
                            <div
                                className='box-container'
                                style={{ overflow: "hidden auto", maxHeight: "130px" }}
                            >
                                {data.data.map((item) => {
                                    const labelId = `checkbox-${data.idNode}-${item.id}`;

                                    return (
                                        <ListItem
                                            sx={{
                                                "& .MuiButtonBase-root": {
                                                    padding: "5px 10px!important",
                                                },
                                                pointerEvents: "none",
                                                borderLeft: `3px solid ${
                                                    item.status ? "#0C66E4" : "transparent"
                                                }   !important}`,
                                                background: `${
                                                    item.status
                                                        ? "rgba(9, 30, 66, 0.0588235) !important"
                                                        : "trasparent"
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
                    background: `${
                        construct === "Grid" ? "rgba(255, 255, 255, 0.160784)" : "transparent"
                    }`,
                    borderRadius: "3px",
                    display: "inline-block",
                    color: `${construct === "Grid" ? "black" : "rgb(79 73 73 / 80%)"}`,
                    padding: `${construct === "Grid" ? "5px 8px" : "0"}`,
                    position: `${construct === "Grid" ? "absolute" : "relative"}`,
                    bottom: `${construct === "Grid" ? "15px" : "0px"}`,
                    marginRight: "15px",
                }}
            >
                Create at: {dayjs(dataItem.createAt).format("DD/MM/YYYY hh:mm A")}
            </div>
        </div>
    );
}

export default NoteItemDel;
