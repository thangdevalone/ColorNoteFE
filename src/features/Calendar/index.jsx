import React from "react";

import { Box } from "@mui/material";
import { Badge, Calendar } from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { convertColor } from "../../constants";
Calendar.propTypes = {
    data: PropTypes.array,
};
Calendar.defaultProps = {
    data: [],
};
const getListData = (value, data) => {
    const rs = [];
    data.forEach((ele) => {
        if (dayjs(value).format("DD/MM/YYYY") === dayjs(ele.createAt).format("DD/MM/YYYY")) {
            rs.push({ color: convertColor(ele.color), content: ele.title });
        }
    });
    return rs;
};

const getMonthData = (value, data) => {
    let count = 0;
    data.forEach((ele) => {
        if (dayjs(value).format("MM/YYYY") === dayjs(ele.createAt).format("MM/YYYY")) {
            count++;
        }
    });
    return (
        count !== 0 && {
            node: (
                <Badge
                    className='site-badge-count-109'
                    count={count ? 109 : 0}
                    style={{
                        backgroundColor: "transparent",
                        marginRight: "7px",
                    }}
                />
            ),
            count: count,
        }
    );
};

function CalendarTable({ data }) {
    const monthCellRender = (value) => {
        const num = getMonthData(value, data);
        return num ? (
            <div
                style={{
                    color: "white",
                    background: "#52c41a",
                    padding: "5px 10px 5px 8px",
                    borderRadius: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                }}
                color='white'
            >
                {num.node} {num.count > 1 ? "Notes was created" : "Note was created"}
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value, data);

        return (
            <ul className='events'>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge color={item.color} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <Box
            className='box-container'
            sx={{
                width: "calc(100vw - 251px)",
                height: "calc(100vh - 65px)",
                position: "absolute",
                top: 0,
                right: 0,
                padding: "10px",
                background: "white",
                borderLeft: "1px solid #fcfcfc",
                overflow: "hidden auto",
                zIndex: 10,
                "& *:not(.basic-text)": {
                    fontWeight: "600 !important",
                },
            }}
        >
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </Box>
    );
}

export default CalendarTable;
