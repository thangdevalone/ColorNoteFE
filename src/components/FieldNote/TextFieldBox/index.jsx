import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

TextFieldBox.propTypes = {
    bg: PropTypes.string.isRequired,
};
TextFieldBox.defaultProps = {};
const useStyles = makeStyles(() => ({
    noteForm: {
        width: "100%",
        minHeight: "200px",
    },
    noteContent: {},
}));
function TextFieldBox({ bg }) {
    const classes = useStyles();
    return (
        <Box
            className={classes.noteForm}
            sx={{
                backgroundColor: `${bg}`,
                padding: "7px",
                borderRadius: "5px",
                boxShadow:
                    " 0px 0px 1px rgba(3, 4, 4, 0.5), 0px 8px 12px rgba(3, 4, 4, 0.36), inset 0px 0px 0px 1px rgba(188, 214, 240, 0.04)",
                marginTop: "10px",
            }}
        >
            <Box className="note-title">
                <TextField
                    fullWidth
                    id='text-title'
                    label=''
                    placeholder="Note's Title"
                    variant='standard'
                    autoComplete='off'
                />
                <Button variant="text" className='note-create' sx={{color:'black'}}>Create</Button>
            </Box>
            <Box className="note-content">
                <TextField
                    id='content-textarea'
                    fullWidth
                    label=''
                    placeholder="Type note here!"
                    multiline
                    variant='standard'
                    spellCheck='off'
                />
            </Box>
        </Box>
    );
}

export default TextFieldBox;
