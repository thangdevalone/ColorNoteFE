import { Box, Button, Grid } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";

import NoteItemDel from "../../components/NoteItemDel";
import classes from "./styles.module.css";
import { FormatListBulleted, GridViewOutlined } from "@mui/icons-material";
import NoteItemLock from "../../components/NoteItemLock";
Deleted.propTypes = {};
Deleted.defaultProps = {
    handleInTrash: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setTrashData: PropTypes.func.isRequired,
};

function Deleted({ handleInTrash, data, setTrashData }) {
    const [value, setValue] = useState("");
    const [dataFilter, setDataFilter] = useState([]);
    const [construct, setConstruct] = useState("Grid");
    useEffect(() => {
    
        if (value.trim() === "") {
            setDataFilter(data);
        } else {
            const newData = data.filter((item) => item.title.includes(value));
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
                                        <NoteItemDel
                                            construct={construct}
                                            dataItem={item}
                                            handleInTrash={handleInTrash}
                                        />
                                    ) : (
                                        <NoteItemLock
                                            construct={construct}
                                            handle={setTrashData}
                                            dataItem={item}
                                        />
                                    )}
                                </>
                            ) : (
                                <NoteItemDel
                                    construct={construct}
                                    dataItem={item}
                                    handleInTrash={handleInTrash}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Deleted;
