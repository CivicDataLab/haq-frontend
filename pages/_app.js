import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextNprogress
        color={DEFAULT_THEME.tertiary}
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        options={{ easing: 'ease', speed: 300, showSpinner: false }}
      />
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
