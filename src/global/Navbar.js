import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../common/reducers/app/Actions";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  
  export default withRouter(function Navbar({history}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton  onClick={() => dispatch(toggleMenu())}  edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit">
              Blade
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  })