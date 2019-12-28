import React from "react";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { updateDir } from "../common/reducers/connections/Actions";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Page from "@material-ui/icons/InsertDriveFile";
import Folder from "@material-ui/icons/Folder";

const initialState = {
  mouseX: null,
  mouseY: null
};
function FileItem({ item, id }) {
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();
  const handleClick = event => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  return (
    <React.Fragment>
      <ListItem
        onContextMenu={handleClick} 
        onClick={() => {
          dispatch(updateDir(id, item.name, item));
        }}
        button
      >
        <ListItemIcon>{item.isDir ? <Folder /> : <Page />}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
        {item.name !== ".." &&  <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu>}
    </React.Fragment>
  );
}

export default FileItem;
