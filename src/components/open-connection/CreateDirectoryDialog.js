import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class CreateDirectoryDialog extends React.Component {
    state = {
        value: ""
    }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
       
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create folder</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Enter new Folder name 
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Folder Name"
              type="text"
              fullWidth
              onChange={(ev) => {
                  this.setState({value: ev.target.value})
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.sub(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.props.sub(this.state.value)} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
