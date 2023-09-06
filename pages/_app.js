import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';
import { fetchAPI } from 'lib/api';
import { useRouter } from 'next/router';
import StateLayout from 'config/statelayout';
import { capitalizeWords } from 'utils/data';
 
function MyApp({ Component, pageProps, props }) {
  const router = useRouter();

  const state = router.query.state;

  const navItems = {
    main: { title: capitalizeWords(state), link: `/${state}` },
    sublinks: [
      { title: 'Budget Data', link: `/${state}/budget` } ,
      state === 'bihar'
        ? { title: 'Spending Data', link: `/${state}/datasets` }
        : null
    ].filter(Boolean), 
  };

  const isStateInPathName = router.pathname.includes('/[state]');
  let UserLayout = isStateInPathName ? StateLayout :  Layout;

  return (
   <UserLayout footer={props.footer} nav={navItems}>
      <NextNprogress
        color={DEFAULT_THEME.tertiary}
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        options={{ easing: 'ease', speed: 300, showSpinner: false }}
      />
      <GlobalStyle />
      <Component {...pageProps} />
    </UserLayout>
  )
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
