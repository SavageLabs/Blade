import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import ListViewer from "../components/ListViewer";
import Paper from "@material-ui/core/Paper";
import ConnectionTabItem from "../components/ConnectionTabItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    padding: 8
  }
}));

export default function Home({ match, history }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const connections = useSelector(state => state.connections.meta);
  const selectedConnection = match.params.connid || undefined;
  const handleChange = (event, newValue) => {
    history.push(`/conn/${newValue}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={selectedConnection}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {connections.map(con => (
            <ConnectionTabItem value={`${con.id}`} handleChange={handleChange} connection={con} key={con.id} />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        {connections
          .filter(e => selectedConnection === `${e.id}`)
          .map(con => (
            <ListViewer key={con.id} id={con.id} />
          ))}

        {connections.length === 0 && (
          <Paper className={classes.content}>
            <p>Create or connect to get started</p>
          </Paper>
        )}
      </div>
    </div>
  );
}
