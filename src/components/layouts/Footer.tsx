import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      marginTop: '24px',
      padding: '5px',
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <p>&copy; 2020 PrismCube</p>
    </footer>
  );
}