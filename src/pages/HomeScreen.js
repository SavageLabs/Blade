import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TabView from '../components/open-connection/TabView'
import Targets from '../components/targets/Targets'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
   
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

/*
<Grid container className={styles.demo} spacing={4}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper className={styles.paper} />
              </Grid>
            ))}
          </Grid>
*/
class HomeScreen extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container>
              <Grid xs={12} sm={3} item>
                <Targets />
              </Grid>
              <Grid xs={12} sm={9} item>
                <TabView />
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HomeScreen);
