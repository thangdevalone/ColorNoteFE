import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { Add, Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";

CheckListBox.propTypes = {
    bg: PropTypes.string.isRequired,
    handleNoteForm: PropTypes.func.isRequired,
};
CheckListBox.defaultProps = {};
const useStyles = makeStyles(() => ({
    noteForm: {
        width: "100%",
        minHeight: "200px",
    },
    noteContent: {},
}));
function CheckListBox({ bg, handleNoteForm }) {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [listVal, setListVal] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const [listCheckbox, setListCheckbox] = useState([
        {
            node: (
                <TextField
                    fullWidth
                    label=''
                    placeholder='Type check list here!'
                    multiline
                    onChange={(e) => {
                        const val = e.target.value;
                        const newListVal = [...listVal];
                        if (listVal.length === 0) {
                            newListVal.push({ tx: val, done: false, id: 1 });
                        } else {
                            newListVal[newListVal.length - 1] = { tx: val, done: false, id: 1 };
                        }
                        setListVal(newListVal);
                    }}
                    variant='standard'
                    sx={{ fontSize: "14px", paddingRight: "25px" }}
                    spellCheck='off'
                />
            ),
            checked: false,
            id: 1,
        },
    ]);
    const handleChangeTitle = (e) => {
        const val = e.target.value;
        setTitle(val);
    };
    const handleSubmit = () => {
        if (title?.trim() === "" || listVal.find((item) => item === "")) {
            enqueueSnackbar("Please fill in note!", { variant: "error" });
            return;
        }
        const note = {
            title: title,
            color: bg,
            type: "text",
            data: listVal.map((item) => item.tx),
        };

        setListCheckbox([]);
        setTitle("");
        setListVal([]);
        handleNoteForm(note);
       
    };
    const handleToggle = (id) => () => {
        const newListCheckBox = [...listCheckbox];
        newListCheckBox.forEach((element) => {
            if (element.id === id) {
                element.checked = !element.checked;
            }
        });

        setListCheckbox(newListCheckBox);
    };
    const handleAddCheck = () => {
        const newListCheckBox = [...listCheckbox];
        const newListVal = [...listVal];
        newListVal.push({ tx: "", done: false });

        newListCheckBox.push({
            node: (
                <TextField
                    id='content-textarea'
                    fullWidth
                    label=''
                    onChange={(e) => {
                        const val = e.target.value;

                        newListVal[newListVal.length - 1] = {
                            tx: val,
                            done: false,
                            id: newListVal.length,
                        };

                        setListVal(newListVal);
                    }}
                    placeholder='Type check list here!'
                    multiline
                    variant='standard'
                    sx={{ fontSize: "14px", paddingRight: "25px" }}
                    spellCheck='off'
                />
            ),
            checked: false,
            id:
                (newListCheckBox[newListCheckBox.length - 1]?.id ||
                    Math.floor(Math.random() * 1000)) +
                1 +
                Math.floor(Math.random() * 1000),
        });
        setListCheckbox(newListCheckBox);
    };
    const handleDelList = (id) => {
        const newList = [...listCheckbox];
        console.log("a");
        const rs = newList.filter((item) => item.id !== id);
        setListCheckbox(rs);
    };
    console.log(listCheckbox);
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
                    Create
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
                                        checked={ele.checked}
                                        onChange={handleToggle(ele.id)}
                                        size='small'
                                        inputProps={{ "aria-labelledby": labelId }}
                                    />
                                </ListItemIcon>

                                {ele.node}
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
