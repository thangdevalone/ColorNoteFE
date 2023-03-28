import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { convertColor } from "../../../constants";

TextFieldBox.propTypes = {
    bg: PropTypes.object.isRequired,
    handleNoteForm: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    cx: PropTypes.string,
    tt: PropTypes.string,
    action: PropTypes.string.isRequired,
};
TextFieldBox.defaultProps = {};

function TextFieldBox({ bg, handleNoteForm, isSubmitting, cx = "", tt = "", action }) {
    const [title, setTitle] = useState(tt);
    const [content, setContent] = useState(cx);
    const { enqueueSnackbar } = useSnackbar();
    const handleChangeContent = (e) => {
        const val = e.target.value;
        setContent(val);
    };
    const handleChangeTitle = (e) => {
        const val = e.target.value;
        setTitle(val);
    };
    const handleSubmit = () => {
        if (title.trim() === "" || content.trim() === "") {
            enqueueSnackbar("Please fill in note!", { variant: "error" });
            return;
        }
        const note = {
            title: title,
            color: bg,
            type: "text",
            data: content,
        };
        if (action === "Create") {
            setTitle("");
            setContent("");
        }
        handleNoteForm(note);
    };
    return (
        <Box
          
            sx={{
                backgroundColor: `${convertColor(bg)}`,
                padding: "7px",
                borderRadius: "5px",
                boxShadow:
                    " 0px 0px 1px rgba(3, 4, 4, 0.5), 0px 8px 12px rgba(3, 4, 4, 0.36), inset 0px 0px 0px 1px rgba(188, 214, 240, 0.04)",
                marginTop: "10px",

                width: "100%",
                minHeight: "200px",
            }}
        >
            <Box className='note-title'>
                <TextField
                    fullWidth
                    id='text-title'
                    label=''
                    value={title}
                    onChange={handleChangeTitle}
                    placeholder="Note's Title"
                    variant='standard'
                    autoComplete='off'
                />
                <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    variant='text'
                    className='note-create'
                    sx={{ color: "black" }}
                >
                    {action}
                </Button>
            </Box>
            <Box className='note-content'>
                <TextField
                    id='content-textarea'
                    fullWidth
                    label=''
                    value={content}
                    onChange={handleChangeContent}
                    placeholder='Type note here!'
                    multiline
                    variant='standard'
                    spellCheck='off'
                />
            </Box>
        </Box>
    );
}

export default TextFieldBox;
