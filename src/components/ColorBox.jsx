import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

ColorBox.propTypes = {
    color:PropTypes.string.isRequired,
    sx:PropTypes.object,
    handleClick:PropTypes.func
};
ColorBox.defaultProps={
    sx:{
        width:"50px",
        height:"50px",
    },
    handleClick:null
}


function ColorBox({color,sx,handleClick}) {
    return (
        <Box onClick={()=>{if(handleClick) handleClick(color)}} sx={{...sx,backgroundColor:`${color}`}}>
            
        </Box>
    );
}

export default ColorBox;