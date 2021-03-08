import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/components/Theme';
import NavBar from 'src/components/layouts/NavBar';
import Container from '@material-ui/core/Container';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>PrismCube</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Container fixed>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
