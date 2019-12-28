import React from "react";
import { useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import FileItem from "./FileItem";

export default function ListViewer({ id }) {
  const fileData = useSelector(state => state.connections.files[id]);
  if (!fileData) return null;
  return (
    <Grid container>
      <Grid item xs={12}>
       <Paper>
       <List subheader={<ListSubheader>Items</ListSubheader>}>
          {fileData.files.map((e, i) => (
              <FileItem key={i} id={id} item={e} />
          ))}
        </List>
       </Paper>
      </Grid>
    </Grid>
  );
}
