import { CalendarMonth, Lock, Share } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { colorBucket } from "../../constants";
import ColorBox from "../ColorBox";
import RemindIcon from "../CustomIcons/RemindIcon";

ToolsNote.propTypes = {
    handleChangeNote: PropTypes.func.isRequired,
    handleOptionsNote:PropTypes.func.isRequired,
    options:PropTypes.object.isRequired,
};
const configColorBox = { width: "24px", height: "24px", borderRadius: "50%", cursor: "pointer" };

function ToolsNote(props) {
    const { handleChangeNote,handleOptionsNote,options } = props;
    const [popDate, setPopDate] = useState(false);

    const [dueAt, setDueAt] = useState(options.dueAt);
    const handleClickDate = () => {
        setPopDate(true);
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
            </Box>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <RemindIcon />
                        </ListItemIcon>
                        <ListItemText primary='Reminder' />
                    </ListItemButton>
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
                    <MobileDateTimePicker 
                        
                        open={popDate}
                        
                        onAccept={() => {
                        
                            setPopDate(false);
                            handleOptionsNote({'dueAt':dayjs(dueAt).format('DD/MM/YYYY hh:mm A Z')})
                        }}
                        format="DD/MM/YYYY hh:mm A"
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
