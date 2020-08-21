import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export const Reset = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        Hi
      </Paper>
    </Container>
  );
};
