import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Edit from "@material-ui/icons/Edit";
import { buildConnection } from "../common/reducers/connections/Actions";
import { toggleMenu } from "../common/reducers/app/Actions";
import ListSubheader from "@material-ui/core/ListSubheader";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import HomeIcon from "@material-ui/icons/Home";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default withRouter(function Menu({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(toggleMenu());
  };
  const [open, setOpen] = React.useState(false);
  const targets = useSelector(state => state.targets);
  const handleClick = () => {
    setOpen(!open);
  };
  const sideList = side => (
    <div className={classes.list} role="presentation">
      <List subheader={<ListSubheader>Blade</ListSubheader>}>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Targets" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {targets.map(target => (
              <ListItem button className={classes.nested} key={target.id} onClick={() => {
                dispatch(toggleMenu());
                dispatch(buildConnection(target.id)).then(res => {
                    history.push(`/conn/${res}`)
                })
              }}>
                <ListItemText primary={target.name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => {}} edge="end">
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {/* <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem> */}
          </List>
        </Collapse>
        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </List>
      <Divider />
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        {/* {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </List>
      <Fab
        onClick={() => {
          dispatch(toggleMenu());
          history.push("/addconnection");
        }}
        className={classes.fab}
        aria-label={"add"}
        color={"primary"}
      >
        <AddIcon />
      </Fab>
    </div>
  );

  const isOpen = useSelector(state => state.app.menu);
  return (
    <Drawer onClose={toggleDrawer(null)} open={isOpen}>
      {sideList("left")}
    </Drawer>
  );
});
