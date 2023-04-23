import { Add } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import SearchInput from "../../components/SearchInput";
import classNames from "classnames";
import InputField from "../../components/FormControls/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextAreaField from "../../components/FormControls/TextAreaField";
import userApi from "../../api/userApi";
Groups.propTypes = {};

function Groups(props) {
    const [value, setValue] = useState("");
    const [dataFilter, setDataFilter] = useState([]);
    const [allUser,SetAllUser]=useState([])
    const [open, setOpen] = useState(false);
    const [members,setMember]=useState([])
    useEffect(()=>{
        (async ()=>{
            try {
                const {data}= await userApi.getAll()
                if(data){
                    SetAllUser(data)
                }
            } catch (error) {
                
            }
        })()
    },[])
    const handleOpenCreateGroup = () => {
        setOpen(true);
    };

    const handleCloseCreateGroup = () => {
        setOpen(false);
    };
    const schema = yup
        .object()
        .shape({
            name_group: yup.string().required("Please enter name group"),
            describe_group: yup.string(),
        })
        .required();
    const form = useForm({
        defaultValues: {
            name_group: "",
            describe_group: "",
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <div className={classes.root}>
            <Box
                sx={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0px 0 40px",
                }}
            >
                <Button variant='contained' onClick={handleOpenCreateGroup} startIcon={<Add />}>
                    New Group
                </Button>
                <Dialog open={open} onClose={handleCloseCreateGroup}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DialogTitle>Create new group</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You can add members to your group by entering the gmail address you
                                need to add.
                            </DialogContentText>
                            <InputField label="Name's Group" name='name_group' form={form} />
                            <TextAreaField
                                label='Describe about group'
                                name='describe_group'
                                form={form}
                            />
                            <Autocomplete
                                
                                multiple
                                limitTags={2}
                                id='multiple-limit-tags'
                                options={allUser}
                                getOptionLabel={(option) => option.gmail}
                                onChange={(e,value)=>{console.log(value)}}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        label='Add member'
                                        placeholder='Gmail'
                                    />
                                )}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseCreateGroup}>Cancel</Button>
                            <Button type='submit'>Create</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <SearchInput placeholder='Type name group to find' setValue={setValue} />
            </Box>
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
                        <Grid item xs={24} sm={12} md={4}></Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Groups;
