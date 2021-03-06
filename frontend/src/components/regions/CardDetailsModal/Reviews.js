import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Markdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1, 2, 1),
  },

  commentColumn: {
    minWidth: 300,
  },

  tableContainer: {
    maxHeight: 200,
  },
  sectionPaper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default ({ reviewIds, reviews }) => {
  const classes = useStyles();
  let body;
  if (reviewIds.length) {
    if (reviews.length) {
      body = (
        <React.Fragment>
          {reviews.map((review) => {
            return (
              <TableRow key={review.id}>
                <TableCell>{review.timestamp}</TableCell>
                <TableCell>{review.status}</TableCell>
                <TableCell>{review.reviewerUserEmail}</TableCell>
                <TableCell className={classes.commentColumn}>
                  <Markdown source={review.comments}></Markdown>
                </TableCell>
              </TableRow>
            );
          })}
        </React.Fragment>
      );
    } else {
      body = (
        <TableRow>
          <TableCell colSpan="4">Loading...</TableCell>
        </TableRow>
      );
    }
  } else {
    body = (
      <TableRow>
        <TableCell colSpan="4">No reviews yet</TableCell>
      </TableRow>
    );
  }

  return (
    <Paper className={classes.sectionPaper} variant="outlined">
      <Typography variant="h6">Reviews</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>reviewer</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
