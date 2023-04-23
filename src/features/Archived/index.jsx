import { FormatListBulleted, GridViewOutlined } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NoteItem from "../../components/NoteItem";
import NoteItemLock from "../../components/NoteItemLock";
import SearchInput from "../../components/SearchInput";
import classes from "./styles.module.css";
import NoteImage from "../../components/NoteImage";
Archived.propTypes = {
    data: PropTypes.array.isRequired,
    handleDelNote: PropTypes.func.isRequired,
    setArchivedData: PropTypes.func.isRequired,
};
Archived.defaultProps = {};

function Archived({ data, handleDelNote, setArchivedData }) {
    const [value, setValue] = useState("");
    const [dataFilter, setDataFilter] = useState([]);
    const [construct, setConstruct] = useState("Grid");
    useEffect(() => {
        if (value.trim() === "") {
            setDataFilter(data);
        } else {
            const newData = data.filter((item) => {
                if (item.type === "checklist") {
                    for (const x of item.data) {
                        return item.title.includes(value) || x.content.includes(value);
                    }
                }
                return item.title.includes(value) || item.data.includes(value);
            });
            setDataFilter(newData || []);
        }
    }, [value]);
    useEffect(() => {
        setDataFilter(data);
    }, [data]);
    return (
        <div className={classes.root}>
            <div className={classes.headerFeature}>
                <Box className='feature'>
                    <Button
                        variant='outlined'
                        sx={{
                            color: "black",
                            textTransform: "capitalize",
                            borderRadius: "10px",
                            borderColor: "black",
                            "&:hover": { borderColor: "black" },
                        }}
                        startIcon={
                            construct === "Grid" ? <GridViewOutlined /> : <FormatListBulleted />
                        }
                        onClick={() => {
                            construct === "Grid" ? setConstruct("List") : setConstruct("Grid");
                        }}
                    >
                        {construct}
                    </Button>
                </Box>
                <SearchInput setValue={setValue} />
            </div>
            <div
                className={classNames({
                    [classes.feature]: true,
                    "box-container": true,
                })}
            >
                <Grid
                    className={classes.grid}
                    container
                    sx={{
                        "&>.MuiGrid-item": {
                            width: "100%",
                        },
                    }}
                    spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
                >
                    {dataFilter.map((item) => (
                        <Grid
                            key={item.idNote}
                            item
                            xs={24}
                            sm={12}
                            md={4}
                            lg={construct === "Grid" ? 3 : 4}
                        >
                            {item.lock ? (
                                <>
                                    {item?.flag === true ? (
                                        <>
                                            {item.type === "image" ? (
                                                <NoteImage construct={construct} dataItem={item} />
                                            ) : (
                                                <NoteItem
                                                    construct={construct}
                                                    dataItem={item}
                                                    setArchivedData={setArchivedData}
                                                    handleDelNote={handleDelNote}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <NoteItemLock
                                            construct={construct}
                                            handle={setArchivedData}
                                            dataItem={item}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    {item.type === "image" ? (
                                        <NoteImage construct={construct} dataItem={item} />
                                    ) : (
                                        <NoteItem
                                            construct={construct}
                                            dataItem={item}
                                            setArchivedData={setArchivedData}
                                            handleDelNote={handleDelNote}
                                        />
                                    )}
                                </>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Archived;
