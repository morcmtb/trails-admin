import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
} from "@material-ui/core";

import { trailCreate } from "./../../actions/trails";

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

export const CreateTrail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [trailName, setTrailName] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Minnesota");
  const [status, setStatus] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleCreate = () => {
    dispatch(
      trailCreate({
        trailName,
        description,
        street,
        city,
        state,
        trailStatus: status,
        zipcode,
        latitude,
        longitude,
      })
    );
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h4">Create Trail</Typography>
        <form noValidate autoComplete="off">
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="trailName"
                label="Trail Name"
                variant="outlined"
                value={trailName}
                onChange={(e) => setTrailName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="description"
                label="description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Status
              </InputLabel>
              <Select
                labelId="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="street"
                label="street"
                variant="outlined"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="city"
                label="city"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="state"
                label="state"
                variant="outlined"
                disabled
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="zipcode"
                label="zipcode"
                variant="outlined"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="latitude"
                label="latitude"
                variant="outlined"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                id="longitude"
                label="longitude"
                variant="outlined"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid>
            <Button variant="outlined" onClick={handleCreate}>
              Create Trail
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
