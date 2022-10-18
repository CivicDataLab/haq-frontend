import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';
import { fetchAPI } from 'lib/api';

function MyApp({ Component, pageProps, props }) {
  return (
    <Layout footer={props.footer}>
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


MyApp.getInitialProps = async () => {

  const footer = await fetchAPI('/footer');
  return {
    props: {
      footer: footer.data,
    },
  };
};

export default MyApp;
