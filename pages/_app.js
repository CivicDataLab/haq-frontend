import '../styles/globals.css';
import { GlobalStyle } from 'styles/Global';
import Layout from "../config/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
