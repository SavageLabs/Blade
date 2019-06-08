import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  updateDir,
  setCurrentActive,
  uploadFiles,
  createDirectory
} from "../../common/reducers/sftp/actions";
import FileDrop from "react-file-drop";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import CreateDirectoryDialog from "./CreateDirectoryDialog";

class TabContainer extends React.Component {
  state = {
    createFolder: false
  };
  render() {
    const props = this.props;
    return (
      <FileDrop
        onDrop={(files, event) => {
          props.uploadFiles(files, props.connection.id);
        }}
      >
        <Grid className={props.styles.contentInner} container>
          <Grid item xs={12}>
            <List component="nav">
              {props.connection.path !== "/" && (
                <ListItem
                  onClick={() => {
                    props.updateDir(props.connection.id, "..", null);
                  }}
                  button
                >
                  <ListItemText primary={".."} />
                </ListItem>
              )}
              {props.connection.folder.map((e, i) => (
                <ListItem
                  onClick={() => {
                    props.updateDir(props.connection.id, e.filename, e);
                  }}
                  key={i}
                  button
                >
                  <ListItemText primary={e.filename} />
                  <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Fab
          onClick={() => this.setState({ createFolder: true })}
          className={props.styles.fab}
          color={"primary"}
        >
          <AddIcon />
        </Fab>
        <CreateDirectoryDialog
          open={this.state.createFolder}
          sub={(name) => {
            this.setState({ createFolder: false });
            if(name !== null) {
                props.createDirectory(name, props.connection.id)
            }
          }}
        />
      </FileDrop>
    );
  }
}

TabContainer.propTypes = {};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent"
  },
  content: {
    padding: 8
  },
  contentInner: {
    minHeight: 400,
    backgroundColor: "#fefefe"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class TabView extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.props.setCurrentActive(value);
    this.setState({ value });
  };

  render() {
    const { classes, sftp, uploadFiles, createDirectory } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {sftp.map((connection, i) => (
              <Tab
                key={i}
                value={connection.id}
                label={connection.conn.config.host}
              />
            ))}
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          {sftp.map((connection, i) => {
            if (value === connection.id) {
              return (
                <TabContainer
                  key={i}
                  connection={connection}
                  updateDir={this.props.updateDir}
                  styles={classes}
                  uploadFiles={uploadFiles}
                  createDirectory={createDirectory}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

TabView.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    sftp: state.sftp.connections
  };
}

const StyledTabView = withStyles(styles)(TabView);
export default connect(
  mapStateToProps,
  { updateDir, setCurrentActive, uploadFiles, createDirectory }
)(StyledTabView);
