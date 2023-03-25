import React from "react";
import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import RemindIcon from "../CustomIcons/RemindIcon";
import { CalendarMonth, Lock, Share } from "@mui/icons-material";
import ColorBox from "../ColorBox";

ToolsNote.propTypes = {};
const configColorBox = { width: "24px", height: "24px", borderRadius: "50%" ,cursor:"pointer"};

function ToolsNote(props) {
    return (
        <div
            className='box-tool'
            style={{ background: "#EAF5F7", height: "100%", borderRadius: "15px 10px",padding:"5px" }}
        >
            <Box sx={{ display: "flex",padding:"10px", alignItems: "center", justifyContent: "space-between" }}>
                <ColorBox color='#FF7D7D' sx={configColorBox} />
                <ColorBox color='#FFBC7DDE' sx={configColorBox} />
                <ColorBox color='#F1F7B5' sx={configColorBox} />
                <ColorBox color='#fac8cd' sx={configColorBox} />
                <ColorBox color='#faa4cb' sx={configColorBox} />
                <ColorBox color='#A5EF82' sx={configColorBox} />
                <ColorBox color='#8293EF' sx={configColorBox} />
            </Box>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <RemindIcon />
                        </ListItemIcon>
                        <ListItemText primary='Remind me at' />
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
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonth />
                        </ListItemIcon>
                        <ListItemText primary='Due at' />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}

export default ToolsNote;
