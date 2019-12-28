import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addConnection } from "../common/reducers/targets/Actions";

const dialog = require("electron").remote.dialog;

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    "& > div": {
      padding: theme.spacing(3),
      minWidth: 300,
      maxWidth: "90%"
    }
  },
  formControl: {}
}));

export default function ConnectionManager({history}) {
  const classes = useStyles();

  const [name, setName] = React.useState("Test");


  const [type, setType] = React.useState("sftp");
  const [authType, setAuthType] = React.useState("password");

  const [host, setHost] = React.useState("localhost");
  const [port, setPort] = React.useState("22");

  const [username, setUsername] = React.useState("root");
  const [password, setPassword] = React.useState("123123123");
  const [saveAuth, setSaveAuth] = React.useState(false);
  const [keyPath, setKeyPath] = React.useState("");

  const [error, setError] = React.useState(null);

  const dispatch = useDispatch();
  return (
    <Paper className={classes.root}>
      <div>
        <h1>Add Target</h1>
      </div>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              value={name}
              onChange={ev => setName(ev.target.value)}
              label="Name"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>

            <Select value={type} onChange={ev => setType(ev.target.value)}>
              <MenuItem value={"sftp"}>SFTP</MenuItem>
              <MenuItem value={"ftp"}>FTP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              value={host}
              onChange={ev => setHost(ev.target.value)}
              label="Host"
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              value={port}
              onChange={ev => setPort(ev.target.value)}
              label="Port"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Divider />

      <Grid container spacing={2}>
      <Grid item xs={12}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              label={"Username"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Auth Type</InputLabel>
            <Select
              value={authType}
              onChange={ev => setAuthType(ev.target.value)}
            >
              <MenuItem value={"password"}>Password</MenuItem>
              {type === "sftp" && (
                <MenuItem value={"openssh_key"}>OpenSSH Key</MenuItem>
              )}
              {type === "ftp" && <MenuItem value={"noauth"}>NoAuth</MenuItem>}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.formControl}>
            <TextField
                type={"password"}
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              label={
                type === "sftp" && authType === "openssh_key"
                  ? "Passphrase (leave empty if not set)"
                  : "Passsword"
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={saveAuth}
                onChange={() => setSaveAuth(!saveAuth)}
              />
            }
            label="Save"
          />
        </Grid>
        {type === "sftp" && authType === "openssh_key" && (
          <Grid item xs={11}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                value={keyPath}
                onChange={ev => setKeyPath(ev.target.value)}
                label={"Key file path"}
              />
            </FormControl>
          </Grid>
        )}
        {type === "sftp" && authType === "openssh_key" && (
          <Grid item xs={1}>
            <Button
              onClick={async () => {
                const { canceled, filePaths } = await dialog.showOpenDialog({
                  properties: ["openFile"]
                });
                if (!canceled) {
                  setKeyPath(filePaths[0]);
                }
              }}
              variant="contained"
            >
              Choose
            </Button>
          </Grid>
        )}
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item>
        <Button onClick={ () => {
            dispatch(addConnection(name, type, host, port, username, authType, password, saveAuth, keyPath)).then(() => {
                    history.push("/")
            }).catch(err => setError(err))
        }} variant="contained" color="primary">
          Save
        </Button>
        </Grid>
        <Grid item>
        <Button onClick={ () => { history.push("/")}} variant="contained">
          Cancel
        </Button>
        </Grid>
        {error && <Grid xs={12} item>
            <p>{error}</p>
            </Grid>}
      </Grid>
    </Paper>
  );
}
