import React from "react";

import { makeStyles } from "@mui/styles";
import { Badge, Calendar } from "antd";
import classNames from "classnames";
const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: "warning",
                    content: "This is warning event.",
                },
                {
                    type: "success",
                    content: "This is usual event.",
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: "warning",
                    content: "This is warning event.",
                },
                {
                    type: "success",
                    content: "This is usual event.",
                },
                {
                    type: "error",
                    content: "This is error event.",
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: "warning",
                    content: "This is warning event",
                },
                {
                    type: "success",
                    content: "This is very long usual event。。....",
                },
                {
                    type: "error",
                    content: "This is error event 1.",
                },
                {
                    type: "error",
                    content: "This is error event 2.",
                },
                {
                    type: "error",
                    content: "This is error event 3.",
                },
                {
                    type: "error",
                    content: "This is error event 4.",
                },
            ];
            break;
        default:
    }
    return listData || [];
};
const useStyle = makeStyles(() => ({
    root: {
        width: "calc(100vw - 251px)",
        height: "calc(100vh - 65px)",
        position: "absolute",
        top: 0,
        right: 0,
        padding:"10px",
        background:"white",
        borderLeft:"1px solid #fcfcfc",
        overflow:"hidden auto",
        zIndex: 10,
        "& *:not(.basic-text)":{
            fontWeight:"600 !important"
        }
    },
}));
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};

function CalendarTable(props) {
    const classes=useStyle()
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className='events'>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <div className={classNames({
            [classes.root]:true,
            "box-container":true
        })}>
            <Calendar  dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </div>
    );
}

export default CalendarTable;
