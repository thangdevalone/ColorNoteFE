import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    Skeleton,
    Typography,
    styled,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import useImageLoaded from "../customHook/ImageLoaded";


NoteImage.propTypes = {
    dataItem: PropTypes.object.isRequired,
    construct: PropTypes.string.isRequired,
    handleDelNote: PropTypes.func.isRequired,
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function NoteImage({ dataItem, construct ,handleDelNote}) {
    const [open, setOpen] = useState(false);
    const [ref, loaded, onLoad] = useImageLoaded()
  

    const handleClickOpen = () => {
        setOpen(true);
        console.log("ád");
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDel=async (e)=>{
        e.stopPropagation()
        handleDelNote(dataItem.idNote, "trunc");
        
    }
    return (
        <Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
                maxWidth="md"
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {dataItem.title}
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{overflow:"hidden auto"}}>
                    <img
                        src={dataItem.metaData}
                        srcSet={dataItem.metaData}
                        alt={dataItem.title}
                        
                        ref={ref}
                        onLoad={onLoad}
                        style={{display:`${loaded?"block":"none"}`, objectFit: "cover", borderRadius: "5px",width: "100%" }}
                    />
                    {!loaded&& <Skeleton animation="wave" variant="rectangular" sx={{width:"400px"}} height={400} />}
                    <Typography gutterBottom>{dataItem.data}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <ImageListItem
                sx={{
                    width: "100%",
                    maxWidth: `${construct === "Grid" ? "350px" : "none"}`,
                    height: `${construct === "Grid" ? "220px" : "79px"} !important`,
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                }}
            >
                <Box
                    onClick={handleClickOpen}
                    sx={{
                        transiton: "all 0.6s",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        "&:hover img": {
                            transform: "scale(1.08)",
                        },
                    }}
                >
                    <img
                        src={dataItem.metaData}
                        srcSet={dataItem.metaData}
                        alt={dataItem.title}
                        style={{
                            objectFit: "cover",
                            borderRadius: "5px",
                            transition: "transform .3s",
                            width: "100%",
                            height: "100%",
                        }}
                        loading='lazy'
                    />
                    <ImageListItemBar
                    title={dataItem.title}
                    subtitle={`Create at: ${dayjs(dataItem.createAt).format("DD/MM/YYYY hh:mm A")}`}
                    actionIcon={
                        <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                            aria-label={`Delete ${dataItem.title}`}
                            onClick={handleDel}
                        >
                            <Delete />
                        </IconButton>
                    }
                />
                </Box>

                
            </ImageListItem>
        </Box>
    );
}

export default NoteImage;
