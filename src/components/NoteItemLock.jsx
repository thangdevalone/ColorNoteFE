import { RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { convertColor } from "../constants";
import PinnedIcon from "./CustomIcons/PinnedIcon";

NoteItemLock.propTypes = {
    dataItem: PropTypes.object.isRequired,
};

function NoteItemLock({data}) {
    return (
        <div
            style={{
                backgroundColor: `${convertColor(data.color)}`,
                position: "relative",
                width: "100%",
                maxWidth: "350px",
                height: "220px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
                padding: "10px 15px",
            }}
        >
            <Box sx={{ position: "absolute", right: "10px" }}>
                <IconButton color='primary' aria-label='restore view' onClick={handleView}>
                    <RemoveCircleOutline/>
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
            <Button variant="text" sx={{color:"black"}}>Note was locked</Button>
            <div
                style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    background: "rgba(255, 255, 255, 0.160784)",
                    borderRadius: "3px",
                    display: "inline-block",
                    padding: "5px 8px",
                    position: "absolute",
                    bottom: "15px",

                    marginRight: "15px",
                }}
            >
                Create at: {dayjs(data.createAt).format("DD/MM/YYYY hh:mm A")}
            </div>
        </div>
    );
}

export default NoteItemLock;
