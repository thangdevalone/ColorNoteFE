import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, TextField } from '@mui/material';


TextFieldBox.propTypes = {
    bg:PropTypes.string.isRequired
};
TextFieldBox.defaultProps={
    
}
const useStyles=makeStyles(()=>({
    noteForm:{
        width:"100%",
        minHeight:"200px",
    
    },
    noteContent:{

    }
}))
function TextFieldBox({bg}) {
    const classes=useStyles()
    return (
        <Box className={classes.noteForm} sx={{backgroundColor:`${bg}`,padding:"7px" ,borderRadius:"5px",boxShadow:" 0px 0px 1px rgba(3, 4, 4, 0.5), 0px 8px 12px rgba(3, 4, 4, 0.36), inset 0px 0px 0px 1px rgba(188, 214, 240, 0.04)",marginTop:"10px"}}>
            <Box><TextField fullWidth id="standard-basic" label="" placeholder="Title" variant="standard" autoComplete='off' /></Box>
            <TextField
          id="content-textarea"
          label=""
          placeholder="Notes here"
          multiline
          variant="standard"
        />
        </Box>
    );
}

export default TextFieldBox;