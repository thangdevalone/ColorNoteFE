import { BorderLeft } from "@mui/icons-material";
import {
    Checkbox,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";
import PinnedIcon from "../../../components/CustomIcons/PinnedIcon";

NoteItem.propTypes = {
    dataItem: PropTypes.object.isRequired,
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
        marginBottom:"5px",
        display:"inline-block"
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
    list:{
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
function NoteItem({ dataItem }) {
    const classes = useStyle();
    const [data, setData] = useState(dataItem);

    const handleChange = (id) => {
        const newList = data.data;
        const itemIndex = data.data.findIndex((item) => item.id === id);
        newList[itemIndex] = { ...newList[itemIndex], status: !Boolean(newList[itemIndex].status) };
        const newData = { ...data, data: newList };
        setData(newData);
    };
    return (
        <div className={classes.note} style={{ backgroundColor: `${data.color}` }}>
            <span className={classes.title}>{data.title}</span>
            {data.pinned?<span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
                <PinnedIcon />
            </span>:""}
            <>
                {data.type === "text" && (
                    <Typography
                        variant='body2'
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "5",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {data.data}
                    </Typography>
                )}
                {data.type === "checklist" && (
                    <div  className="box-container" style={{overflow:"hidden auto",maxHeight:"130px"}}>
                        {data.data.map((item) => {
                            const labelId = `checkbox-${data.idNode}-${item.id}`;

                            return (
                                <ListItem
                                    className={classNames({
                                        [classes.list]:true,
                                        [classes.listDone]:item.status
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

export default NoteItem;
