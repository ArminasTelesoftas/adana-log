import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useAppDispatchEffect } from "../../../App.reducer";
import { Controller, useForm } from "react-hook-form";
import { loginEffect } from "./effects";
import { useHistory } from "react-router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { errorSplit } from "../../../shared/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      maxWidth: 400,
      margin: "auto",
    },
    paper: {
      padding: theme.spacing(4),
    },
    logo: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& img": {
        width: "fit-content",
        paddingBottom: theme.spacing(1),
      },
    },
  })
);

interface FormData {
  login: string;
  password: string;
}

export const Login = () => {
  const classes = useStyles();
  const dispatchEffect = useAppDispatchEffect();
  const { push } = useHistory();

  const { handleSubmit, control, formState, setError, errors } = useForm<FormData>({
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async ({ login, password }: FormData) => {
    try {
      await dispatchEffect(loginEffect(login, password));
      push("/projects");
    } catch (e) {
      setError("login", {
        type: "",
        message: (e?.message || "").split(errorSplit)[1],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate>
      <Paper className={classes.paper}>
        {errors.password?.message}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box className={classes.logo}>
              <img src="./adana_logo.png" alt="Logo" />
              <Typography variant="h5">Sign in</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              control={control}
              name="login"
              label="Login"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={TextField}
              type="password"
              control={control}
              name="password"
              label="Password"
              fullWidth
            />
          </Grid>
          {errors.login && (
            <Grid item xs={12}>
              <Typography color="error">{errors.login.message}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
