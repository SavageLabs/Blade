import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { addSftpConnection } from '../../common/reducers/sftp/actions'
const fs = window.require('fs')

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
const sshPrivateFile = fs.readFileSync("~/id_rsa");
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  header: {
    height: 48
  }
});

class Targets extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
        <AppBar position="static" className={classes.header}>
            <Typography variant="h6" color="inherit">
              Targets
            </Typography>
        </AppBar>
        {value === 0 && <TabContainer>
          <List component="nav">
        <ListItem onClick={() => {
          this.props.addSftpConnection({
            host: "",
            port: 22,
            privateKey: sshPrivateFile,
            passphrase: "",
            username: ""
          }).then(id => {
            console.log(id);
            console.log(this.props.sftp[id])
          }).catch(err => console.log(err))
        }} button>
          <ListItemText primary="Web Node" />
        </ListItem>
        <ListItem onClick={() => {
          this.props.addSftpConnection({
            host: "",
            port: 22,
            privateKey: sshPrivateFile,
            passphrase: "",
            username: ""
          }).then(id => {
            console.log(id);
            console.log(this.props.sftp[id])
          }).catch(err => console.log(err))
        }} button>
   
          <ListItemText primary="Mail node" />
        </ListItem>
      </List>

        </TabContainer>}
        </Paper>
      </div>
    );
  }
}

Targets.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledTargets = withStyles(styles)(Targets);

function mapStateToProps(state, ownProps) {
  return {
    sftp: state.sftp.connections
  }
}
export default connect(mapStateToProps, { addSftpConnection })(StyledTargets);