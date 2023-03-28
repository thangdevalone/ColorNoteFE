import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { Add, Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { convertColor } from "../../../constants";

CheckListBox.propTypes = {
    bg: PropTypes.object.isRequired,
    handleNoteForm: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    tt: PropTypes.string,
    list: PropTypes.array,
};
CheckListBox.defaultProps = {};

function CheckListBox({ bg, handleNoteForm, action, tt = "", list = [] }) {
    const [title, setTitle] = useState(tt);
    const { enqueueSnackbar } = useSnackbar();
    const [listCheckbox, setListCheckbox] = useState(
        list.map((item) => ({ ...item, status: !!item.status, id: item.id }))
    );
    const handleChangeTitle = (e) => {
        const val = e.target.value;
        setTitle(val);
    };
    const handleSubmit = () => {
        if (title?.trim() === "" || listCheckbox.find((item) => item.content === "")) {
            enqueueSnackbar("Please fill in note!", { variant: "error" });
            return;
        }
        if (listCheckbox.length === 0) {
            enqueueSnackbar("Please add a least checklist!", { variant: "error" });
            return;
        }
        const note = {
            title: title,
            color: bg,
            type: "text",
            data: listCheckbox.map((item) => ({ content: item.content, status: item.status })),
        };
        if (action === "Create") {
            setListCheckbox([]);
            setTitle("");
        }

        handleNoteForm(note);
    };
    const handleToggle = (id) => () => {
        const newList = [...listCheckbox];
        const nowCheckBox = newList.findIndex((item) => item.id === id);
        if (nowCheckBox === -1) return;
        newList[nowCheckBox].status = !newList[nowCheckBox].status;

        setListCheckbox(newList);
    };
    const handleAddCheck = () => {
        const newCheckList = [...listCheckbox];
        if (newCheckList.length === 0) {
            newCheckList.push({ content: "", status: false, id: 0 });
        } else {
            newCheckList.push({
                content: "",
                status: false,
                id: newCheckList[newCheckList.length - 1].id + 1,
            });
        }
        setListCheckbox(newCheckList);
    };
    const handleDelList = (id) => {
        const newList = [...listCheckbox];
        const rs = newList.filter((item) => item.id !== id);
        setListCheckbox(rs);
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
                    onChange={handleChangeTitle}
                    value={title}
                    placeholder="Note's Title"
                    variant='standard'
                    autoComplete='off'
                />
                <Button
                    onClick={handleSubmit}
                    variant='text'
                    className='note-create'
                    sx={{ color: "black" }}
                >
                    {action}
                </Button>
            </Box>
            <Box className='note-list'>
                <List sx={{ width: "100%" }}>
                    {listCheckbox.map((ele) => {
                        const labelId = `checkbox-${ele.id}`;

                        return (
                            <ListItem
                                key={ele.id}
                                secondaryAction={
                                    <IconButton
                                        size='small'
                                        onClick={() => {
                                            handleDelList(ele.id);
                                        }}
                                        edge='end'
                                        aria-label='delete'
                                    >
                                        <Close fontSize='small' />
                                    </IconButton>
                                }
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={ele.status}
                                        onChange={handleToggle(ele.id)}
                                        size='small'
                                        inputProps={{ "aria-labelledby": labelId }}
                                    />
                                </ListItemIcon>

                                <TextField
                                    fullWidth
                                    label=''
                                    value={ele.content}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const newList = [...listCheckbox];
                                        const nowCheckBox = newList.findIndex(
                                            (item) => item.id === ele.id
                                        );
                                        if (nowCheckBox === -1) return;
                                        newList[nowCheckBox] = {
                                            ...newList[nowCheckBox],
                                            content: val,
                                        };
                                        setListCheckbox(newList);
                                    }}
                                    placeholder='Type check list here!'
                                    multiline
                                    variant='standard'
                                    sx={{
                                        fontSize: "14px",
                                        paddingRight: "25px",
                                        textDecoration: `${ele.status ? "line-through" : "none"}`,
                                    }}
                                    spellCheck='off'
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <Button
                    variant='text'
                    startIcon={<Add />}
                    onClick={handleAddCheck}
                    sx={{ color: "black", fontSize: "14px" }}
                >
                    Add check list
                </Button>
            </Box>
        </Box>
    );
}

export default CheckListBox;
