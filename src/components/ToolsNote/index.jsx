import { CalendarMonth, Lock, Share } from "@mui/icons-material";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { colorBucket } from "../../constants";
import ColorBox from "../ColorBox";
import RemindIcon from "../CustomIcons/RemindIcon";
import { Button } from "antd";

ToolsNote.propTypes = {
    handleChangeNote: PropTypes.func.isRequired,
    handleOptionsNote: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
};
const configColorBox = { width: "24px", height: "24px", borderRadius: "50%", cursor: "pointer" };

function ToolsNote(props) {
    const { handleChangeNote, handleOptionsNote, options } = props;
    const [popDate, setPopDate] = useState(false);
    const [popRemind, setPopRemind] = useState(false);

    const [dueAt, setDueAt] = useState(options.dueAt);
    const [remindAt, setRemindAt] = useState(options.remindAt);

    const handleClickDate = () => {
        setPopDate(true);
    };
    const handleClickRemind = () => {
        setPopRemind(true);
    };
    
    return (

        <div
            className='box-tool'
            style={{
                background: "#EAF5F7",
                height: "100%",
                borderRadius: "15px 10px",
                padding: "5px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    padding: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_1}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_2}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_3}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_4}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_5}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_6}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_7}
                    sx={configColorBox}
                />
                <ColorBox
                    handleClick={handleChangeNote}
                    color={colorBucket.color_8}
                    sx={configColorBox}
                />
            </Box>
            <List>
                <ListItem>
                        <Tooltip
                            title={
                                <Button
                                    onClick={() => {
                                        handleOptionsNote({
                                            remindAt: null,
                                        });
                                        setRemindAt(null);
                                    }}
                                >
                                    Remove Reminder
                                </Button>
                            }
                            placement='top'
                        >
                            <ListItemButton
                                selected={popRemind}
                                onClick={handleClickRemind}
                                className='btn-calendar'
                            >
                                <ListItemIcon>
                                    <RemindIcon />
                                </ListItemIcon>
                                <ListItemText primary='Reminder' />
                            </ListItemButton>
                        </Tooltip>

                        <MobileDateTimePicker
                            open={popRemind}
                            onAccept={() => {
                                setPopRemind(false);
                                handleOptionsNote({
                                    remindAt: remindAt
                                        ? dayjs(remindAt).format("DD/MM/YYYY hh:mm A Z")
                                        : null,
                                });
                            }}
                            format={remindAt ? "DD/MM/YYYY hh:mm A" : ""}
                            onClose={() => {
                                setPopRemind(false);
                            }}
                            value={remindAt}
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: "0 !important",
                                    border: "none",
                                    outline: "none",
                                },
                                "& fieldset": {
                                    border: "none",
                                },
                                "& *": {
                                    cursor: "pointer",
                                },
                                cursor: "pointer",
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                right: "15px",
                            }}
                            onChange={(newValue) => {
                                setRemindAt(newValue);
                            }}
                        />
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Share />
                        </ListItemIcon>
                        <ListItemText primary='Share' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Lock />
                        </ListItemIcon>
                        <ListItemText primary='Lock' />
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ position: "relative" }}>
                    <Tooltip
                        title={
                            <Button
                                onClick={() => {
                                    handleOptionsNote({
                                        dueAt: null,
                                    });
                                    setDueAt(null);
                                }}
                            >
                                Remove Due at
                            </Button>
                        }
                        placement='top'
                    >
                        <ListItemButton
                            selected={popDate}
                            onClick={handleClickDate}
                            className='btn-calendar'
                        >
                            <ListItemIcon>
                                <CalendarMonth />
                            </ListItemIcon>

                            <ListItemText primary='Due at' />
                        </ListItemButton>
                    </Tooltip>

                    <MobileDateTimePicker
                        open={popDate}
                        onAccept={() => {
                            setPopDate(false);
                            handleOptionsNote({
                                dueAt: dueAt ? dayjs(dueAt).format("DD/MM/YYYY hh:mm A Z") : null,
                            });
                        }}
                        format={dueAt ? "DD/MM/YYYY hh:mm A" : ""}
                        onClose={() => {
                            setPopDate(false);
                        }}
                        value={dueAt}
                        sx={{
                            "& .MuiInputBase-input": {
                                padding: "0 !important",
                                border: "none",
                                outline: "none",
                            },
                            "& fieldset": {
                                border: "none",
                            },
                            "& *": {
                                cursor: "pointer",
                            },
                            cursor: "pointer",
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: "15px",
                        }}
                        onChange={(newValue) => {
                            setDueAt(newValue);
                        }}
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default ToolsNote;
