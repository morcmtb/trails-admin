import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  FormControl,
  TextField,
  Grid,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { resetPassword } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
}));

export const Reset = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  console.log("error", error);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h4">Please Reset your Password</Typography>
        <Grid>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="np111"
              label="New Password"
              variant="outlined"
              value={newPassword}
              error={error ? true : false}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormHelperText>{error && error.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl variant="outlined" className={classes.formControl}>
            <Button
              variant="outlined"
              onClick={() => dispatch(resetPassword(user, newPassword))}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Paper>
    </Container>
  );
};
