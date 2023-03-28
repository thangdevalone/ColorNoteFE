import { Grid } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import SearchInput from "../../components/SearchInput";

import NoteItemDel from "../../components/NoteItemDel";
import classes from "./styles.module.css";
Deleted.propTypes = {
   
};
Deleted.defaultProps = {
    handleInTrash:PropTypes.func.isRequired,
    data:PropTypes.array.isRequired,
};


function Deleted({handleInTrash,data}) {
    return (
        <div className={classes.root}>
            <div className={classes.headerFeature}>
                <SearchInput />
            </div>
            <div
                className={classNames({
                    [classes.feature]: true,
                    "box-container": true,
                })}
            >
                <Grid className={classes.grid} container spacing={3}>
                    {data.map((item) => (
                        <Grid key={item.idNote} item xs={24} sm={12} md={4} lg={3}>
                            <NoteItemDel dataItem={item} handleInTrash={handleInTrash}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Deleted;
