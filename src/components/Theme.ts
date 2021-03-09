import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#6441a5',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f7f7fc',
    },
  },
});

export default theme;