import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import NoteItem from "./components/NoteItem";
import { Container, Grid } from "@mui/material";
import SearchInput from "../../components/SearchInput";
import classNames from "classnames";
import noteApi from "../../api/noteApi";

Archived.propTypes = {};

const useStyle = makeStyles(() => ({
  root: {
    width: "calc(100vw - 250px)",
    height: "calc(100vh - 64px)",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  feature: {
    width: "100%",
    padding: "0 20px",
    height: "calc(100% - 50px)",
    overflow: "hidden auto",
  },
  headerFeature: {
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  grid: {
    margin: "0 !important",
    width: "100% !important",
  },
}));
function Archived(props) {
  const [data,setData]=useState([])
  
  const classes = useStyle();
  useEffect(()=>{
    (async ()=>{
      try {
        const response= await noteApi.getNotes(1)
        setData(response.notes||[])
      } catch (error) {
        
      }
    })()
    
  },[])
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
            <Grid key={item.id} item xs={24} sm={12} md={4} lg={3}>
              <NoteItem dataItem={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Archived;
