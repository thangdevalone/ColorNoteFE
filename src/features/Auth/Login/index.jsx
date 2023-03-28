import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "../../../components/FormControls/InputField";
import PasswordField from "../../../components/FormControls/PasswordField";
import useWindowDimensions from "../../../customHook/WindowDimensions";
import { login } from "../userSlice";
Login.propTypes = {};

function Login(props) {
    const window = useWindowDimensions();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const schema = yup
        .object()
        .shape({
            user_name: yup
                .string()
                .required("Please enter your username")
                .test(
                    "should has at least 5 characters",
                    "Please enter at least 5 characters ",
                    (values) => {
                        return values.length >= 5;
                    }
                ),
            password: yup
                .string()
                .required("Please enter your password")
                .min(6, "Please enter at least 6 characters"),
        })
        .required();
    const form = useForm({
        defaultValues: {
            user_name: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = async (values) => {
        try {
            const action = login(values);

            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            navigate("/home");
        } catch (e) {
            enqueueSnackbar(e.message, { variant: "error" });
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundImage: "linear-gradient(to right,#D0FADE, rgba(255, 134, 250, 0.2))",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "70%",
                    minWidth: "400px",
                    height: "90%",
                    maxWidth: "1500px",
                    maxHeight: "615px",
                    borderRadius: "10px",
                    minHeight: "400px",
                    backgroundColor: "white",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    padding: "10px 35px",
                    overflow: "hidden auto",
                }}
                className='box-container'
            >
                <Box
                    sx={{
                        height: "70px",
                        width: "100%",

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: "800",
                            fontSize: "28px",
                            lineHeight: "60px",
                            display: "inline-block",
                            textAlign: "center",
                            background:
                                "linear-gradient(90deg, rgba(50, 245, 117, 0.98) 0%, rgba(245, 227, 66, 0.92) 54.58%, rgba(245, 148, 241, 0.98) 105.86%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textFillColor: "transparent",
                        }}
                    >
                        CLOUD NOTE
                    </Box>
                    {window.width > 600 && (
                        <Typography variant='body2' display='block' sx={{ fontSize: "16px" }}>
                            New user?{" "}
                            <Link href='/register' underline='hover'>
                                Sign up
                            </Link>
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex" }}>
                    {window.width > 1200 ? (
                        <img
                            src='../../../assets/login.jpg'
                            style={{
                                width: "50%",
                                minWidth: "450px",
                                maxWidth: "500px",
                                objectFit: "contain",
                            }}
                            alt='login-jpg'
                        />
                    ) : (
                        ""
                    )}

                    <Box
                        sx={{
                            flex: "1 1",
                            padding: "0 10px 0 15px",
                            maxWidth: "500px",
                            margin: "0 auto",
                        }}
                    >
                        <Box sx={{ marginBottom: "15px" }}>
                            <Typography variant='h4' sx={{ fontWeight: 500 }}>
                                Welcome Back!
                            </Typography>
                            <span style={{ color: "rgb(122, 122, 122)" }}>Login to continue</span>
                        </Box>

                        <form
                            style={{ display: "flex", flexDirection: "column" }}
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <InputField label='User Name' name='user_name' form={form} />
                            <PasswordField label='Password' form={form} name='password' />
                            <FormControlLabel
                                control={<Checkbox value='remember' color='primary' />}
                                label='Remember me'
                            />
                            <Button
                                size='large'
                                sx={{ marginTop: 1 }}
                                variant='contained'
                                type='submit'
                            >
                                Log in
                            </Button>
                        </form>
                        {window.width < 600 && (
                            <Typography
                                variant='body2'
                                display='block'
                                sx={{ fontSize: "16px", marginTop: "10px" }}
                            >
                                New user?{" "}
                                <Link href='/register' underline='hover'>
                                    Sign up
                                </Link>
                            </Typography>
                        )}
                        <Box sx={{ margin: "10px", textAlign: "center" }}>
                            <Link href='/fogot' underline='hover'>
                                Forgotten password?
                            </Link>
                        </Box>
                        <Box sx={{ margin: 2, textAlign: "center" }}>
                            <Typography sx={{ display: "flex", alignItems: "center" }}>
                                <span className='line'></span> Other login{" "}
                                <span className='line'></span>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                "&:hover": { background: "#f1f1f1" },
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                                margin: "0 auto",
                                padding: "10px",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src='../../../assets/gg.png'
                                alt=''
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Login;
