import { Grid } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import NoteItem from "../../components/NoteItem";
import SearchInput from "../../components/SearchInput";
import classes from './styles.module.css';
Archived.propTypes = {
    data: PropTypes.array.isRequired,
    handleDelNote:PropTypes.func.isRequired,
    setArchivedData:PropTypes.func.isRequired
};
Archived.defaultProps = {};


function Archived({ data,handleDelNote ,setArchivedData}) {
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
                            <NoteItem dataItem={item} setArchivedData={setArchivedData} handleDelNote={handleDelNote}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Archived;
