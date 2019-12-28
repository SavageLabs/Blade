import React from "react";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch} from "react-redux";
import { closeConnection } from "../common/reducers/connections/Actions"

const initialState = {
  mouseX: null,
  mouseY: null
};
function ConnectionTabItem({ connection: con, handleChange }) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

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
      <Tab key={con.id} label={con.name} onChange={(ev) => handleChange(ev, con.id)} onContextMenu={handleClick} />
      <Menu
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
        <MenuItem onClick={() => {
            handleClose()
            dispatch(closeConnection(con.id))
        }}>Close Connection</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default ConnectionTabItem;
