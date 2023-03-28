import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { convertColor } from '../constants';

ColorBox.propTypes = {
    color:PropTypes.object.isRequired,
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
        <Box onClick={()=>{if(handleClick) handleClick(color)}} sx={{...sx,backgroundColor:`${convertColor(color)}`}}>
            
        </Box>
    );
}

export default ColorBox;