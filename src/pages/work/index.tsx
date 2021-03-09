import Link from 'next/link';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Head from 'next/head';
import EventNoteIcon from '@material-ui/icons/EventNote';
import UpdateIcon from '@material-ui/icons/Update';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  }),
);

export default function Work() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>

    </Paper>
  )
}
