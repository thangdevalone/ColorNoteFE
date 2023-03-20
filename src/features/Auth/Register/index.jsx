import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/FormControls/InputField";
import PasswordField from "../../../components/FormControls/PasswordField";
import { register } from "../userSlice";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://devsenior.edu.vn/">
        Devsenior
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

Register.propTypes = {};
const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100vw",
    height: "100vh",
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
}));
function Register(props) {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    setConfirm(false);
  };

  const schema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Please enter your full name")
        .test(
          "should has at least two words",
          "Please enter at least two words",
          (values) => {
            return values.split(" ").length >= 2;
          }
        ),
      username: yup
        .string()
        .required("Please enter your username")
        .test(
          "should has at least 6 characters",
          "Please enter at least 6 characters ",
          (values) => {
            return values.length >= 5;
          }
        ),
      gmail: yup
        .string()
        .required("Please enter your email")
        .email("Please enter a valid email address"),
      password: yup
        .string()
        .required("Please enter your password")
        .min(6, "Please enter at least 6 characters"),
      rePassword: yup
        .string()
        .required("Please enter retype your password")
        .oneOf([yup.ref("password")], "Password doesn't match"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      gmail: "",
      password: "",
      rePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    form.reset({
      data: "test",
    });
  }, [form, form.isSubmitSuccessful]);

  const handleSubmit = async (values) => {
    try {
      const rs = {
        name: values.name,
        user_name: values.username,
        gmail: values.gmail,
        password: values.password,
      };
      const action = register(rs);

      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      setConfirm(true);
      form.reset({
        name: "",
        username: "",
        gmail: "",
        password: "",
        rePassword: "",
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      {confirm && (
        <Dialog
          open={confirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm register"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Congratulations on your successful registration. Click on the{" "}
              <strong>link</strong> was sent in gmail or spam to confirm and
              continue with that account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
             <Link to="/login">Agree</Link> 
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={form.handleSubmit(handleSubmit)}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField name="name" label="Your name" form={form} />
                </Grid>
                <Grid item xs={6}>
                  <InputField name="username" label="User name" form={form} />
                </Grid>
              </Grid>

              <InputField name="gmail" label="Gmail" form={form} />
              <PasswordField name="password" label="Password" form={form} />
              <PasswordField
                name="rePassword"
                label="Retype password"
                form={form}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Do you have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 6, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
