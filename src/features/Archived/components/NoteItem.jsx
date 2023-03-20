import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

NoteItem.propTypes = {
  dataItem: PropTypes.object.isRequired,
};

const useStyle = makeStyles(() => ({
  note: {
    position: "relative",
    width: "100%",
    maxWidth: "350px",
    height: "200px",
    borderRadius: "16px",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
    padding: "10px",
  },
  title: {
    fontWeight: 500,
    fontSize: "24px",
  },
  boxWrap:{
    fontWeight:500,
    fontSize:"14px",
    background: "rgba(255, 255, 255, 0.160784)",
    borderRadius: "3px",
    display:"inline-block",
    padding:"5px 8px",
    position:"absolute",
    bottom:"15px",

  }
}));
function NoteItem({ dataItem }) {
  const classes = useStyle();
  return (
    <div
      className={classes.note}
      style={{ backgroundColor: `${dataItem.color}` }}
    >
      <span style={{ position: "absolute", top: "-10px", left: "-10px" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.8301 8.7L15.3001 4.17C14.4041 3.27661 13.1904 2.77493 11.9251 2.77493C10.6598 2.77493 9.44613 3.27661 8.55011 4.17L4.16011 8.56C3.26672 9.45602 2.76504 10.6697 2.76504 11.935C2.76504 13.2003 3.26672 14.414 4.16011 15.31L8.70011 19.83C9.1695 20.3007 9.73246 20.6676 10.3526 20.9071C10.9727 21.1465 11.6362 21.2531 12.3001 21.22L17.3001 20.98C19.3001 20.89 20.8901 19.3 20.9901 17.31L21.2301 12.31C21.2901 10.96 20.7801 9.65 19.8301 8.7Z"
            fill="#FF0000"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 12C13.837 12 13.2011 12.2634 12.7322 12.7322C12.2634 13.2011 12 13.837 12 14.5C12 15.163 12.2634 15.7989 12.7322 16.2678C13.2011 16.7366 13.837 17 14.5 17C15.163 17 15.7989 16.7366 16.2678 16.2678C16.7366 15.7989 17 15.163 17 14.5C17 13.837 16.7366 13.2011 16.2678 12.7322C15.7989 12.2634 15.163 12 14.5 12Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className={classes.title}> {dataItem.title}</span>
      <div>

      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "5",
          WebkitBoxOrient: "vertical",
        }}
      >
        {dataItem.data}
      </Typography>
      </div>
      <div className={classes.boxWrap} >
        Create at: {dayjs( dataItem.date).format("DD/MM/YYYY hh:mm:ss")}
      </div>
    </div>
  );
}

export default NoteItem;
