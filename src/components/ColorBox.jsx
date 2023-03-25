import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

ColorBox.propTypes = {
    color:PropTypes.string.isRequired,
    sx:PropTypes.object
};
ColorBox.defaultProps={
    sx:{
        width:"50px",
        height:"50px",
    }
}

function ColorBox({color,sx}) {
    return (
        <Box sx={{...sx,backgroundColor:`${color}`}}>
            
        </Box>
    );
}

export default ColorBox;