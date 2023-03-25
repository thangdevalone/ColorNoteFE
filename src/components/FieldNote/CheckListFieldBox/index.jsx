import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { Add, Close } from "@mui/icons-material";

CheckListBox.propTypes = {
    bg: PropTypes.string.isRequired,
};
CheckListBox.defaultProps = {};
const useStyles = makeStyles(() => ({
    noteForm: {
        width: "100%",
        minHeight: "200px",
    },
    noteContent: {},
}));
function CheckListBox({ bg }) {
    const classes = useStyles();
    const [listCheckbox, setListCheckbox] = useState([
        {
            node: (
                <TextField
                    id='content-textarea'
                    fullWidth
                    label=''
                    placeholder='Type check list here!'
                    multiline
                    variant='standard'
                    sx={{fontSize:"14px",paddingRight:"25px"}}
                    spellCheck='off'
                />
            ),
            checked: false,
            id: 1,
        },
    ]);
    const handleToggle = (id) => () => {
        const newListCheckBox = [...listCheckbox];
        newListCheckBox.forEach((element) => {
            if (element.id === id) {
                element.checked = !element.checked;
            }
        });

        setListCheckbox(newListCheckBox);
    };
    const handleAddCheck=()=>{
        const newListCheckBox = [...listCheckbox];
        newListCheckBox.push({    node: (
            <TextField
                id='content-textarea'
                fullWidth
                label=''
                placeholder='Type check list here!'
                multiline

                variant='standard'
                sx={{fontSize:"14px",paddingRight:"25px"}}
                spellCheck='off'
            />
        ),
        checked: false,
        id: newListCheckBox.length+1,
    })
    setListCheckbox(newListCheckBox)
    }
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
                    
                    placeholder="Note's Title"
                    variant='standard'
                    autoComplete='off'

                />
                <Button variant="text" className='note-create' sx={{color:'black'}}>Create</Button>

            </Box>
            <Box className='note-list'>
                <List sx={{ width: "100%" }}>
                    {listCheckbox.map((ele) => {
                        const labelId = `checkbox-${ele.id}`;

                        return (
                            <ListItem key={ele.id}  secondaryAction={
                                <IconButton size="small"   edge="end" aria-label="delete">
                                  <Close fontSize="small" />
                                </IconButton>
                              }>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={ele.checked}
                                        onChange={handleToggle(ele.id)}
                                        size="small"
                                        inputProps={{ "aria-labelledby": labelId }}
                                    />
                                </ListItemIcon>

                                <ListItemText id={labelId} primary={ele.node} />
                            </ListItem>
                        );
                    })}
                </List>
                <Button variant="text" startIcon={<Add/>} onClick={handleAddCheck} sx={{color:'black',fontSize:"14px"}}>Add check list</Button>
            </Box>
        </Box>
    );
}

export default CheckListBox;
