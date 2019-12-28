import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { updateInfoStatus } from "../common/reducers/status/Actions";
import Paper from "@material-ui/core/Paper";

const dialog = require("electron").remote.dialog;

export default function AuthDialog() {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const [kfp, setKfp] = React.useState("");
  const { callback, show, keyFile } = useSelector(state => {
    return {
      callback: state.status.auth_dialog_callback,
      show: state.status.auth_dialog_show,
      keyFile: state.status.auth_dialog_key_file
    };
  });
  return (
    <div>
      <Dialog open={show} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Auth Data </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Password</DialogContentText>
          <TextField
            autoFocus
            value={password}
            type="password"
            fullWidth
            label="Password"
            onChange={ev => {
              setPassword(ev.target.value);
            }}
          />
          {keyFile && (
            <Paper>
              <TextField
                value={kfp}
                type="text"
                label="Key file Path"
                fullWidth
                onChange={ev => {
                  setKfp(ev.target.value);
                }}
              />
              <Button
                onClick={async () => {
                  const { canceled, filePaths } = await dialog.showOpenDialog({
                    properties: ["openFile"]
                  });
                  if (!canceled) {
                    setKfp(filePaths[0]);
                  }
                }}
                variant="contained"
              >
                Choose
              </Button>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              dispatch(updateInfoStatus("auth_dialog_show", false))
            }
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
                dispatch(updateInfoStatus("auth_dialog_callback", null))
                dispatch(updateInfoStatus("auth_dialog_key_file", false))
                dispatch(updateInfoStatus("auth_dialog_show", false))

                callback(password, kfp)
            }}
            color="primary"
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
