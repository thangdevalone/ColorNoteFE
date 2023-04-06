import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

BoxDoubleContent.propTypes = {
    content_1:PropTypes.node.isRequired,
    content_2:PropTypes.node,
    customHeight:PropTypes.string

};
BoxDoubleContent.defaultProps={
    customHeight:"50px",
}

function BoxDoubleContent(props) {
    const {content_1,content_2,customHeight}=props
    return (
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",maxWidth:"500px",minWidth:"300px",height:`${customHeight}`}}>
            
            {content_1}
            {content_2}
        </Box>
    );
}

export default BoxDoubleContent;