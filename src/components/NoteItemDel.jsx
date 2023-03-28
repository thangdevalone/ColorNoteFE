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
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PinnedIcon from "./CustomIcons/PinnedIcon";
import { convertColor } from "../constants";

NoteItemDel.propTypes = {
    dataItem: PropTypes.object.isRequired,
    handleInTrash: PropTypes.func.isRequired,
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
        pointerEvents: "none",
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
function NoteItemDel({ dataItem, handleInTrash }) {
    const classes = useStyle();
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
        <div className={classes.note} style={{ backgroundColor: `${convertColor(data.color)}` }}>
            <Box sx={{ position: "absolute", right: "10px" }}>
                <IconButton color='primary' aria-label='restore note' onClick={handleRestore}>
                    <RestoreOutlined />
                </IconButton>
                <IconButton aria-label='delelte note' onClick={handleDelete}>
                    <DeleteOutline />
                </IconButton>
            </Box>
            <Tooltip title={<span style={{ fontSize: "14px" }}>{data.title}</span>} placement='top'>
                <span className={classes.title}>{data.title}</span>
            </Tooltip>

            {data.pinned ? (
                <span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
                    <PinnedIcon />
                </span>
            ) : (
                ""
            )}
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
                        <Typography variant='body2'>{data.data}</Typography>
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
                Due at: {dayjs(data.dueAt).format("DD/MM/YYYY hh:mm A")}
            </div>
        </div>
    );
}

export default NoteItemDel;
