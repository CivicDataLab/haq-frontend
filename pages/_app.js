import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';
import { DEFAULT_THEME } from 'config/theme';
import dynamic from 'next/dynamic';
import { fetchAPI } from 'lib/api';
import Router, { useRouter } from 'next/router';
import { capitalizeWords } from 'utils/data';
import Script from 'next/script';
import { useEffect } from 'react';
import { pageview } from 'utils/ga';

const Layout = dynamic(() => import('config/layout'), {
  ssr: false,
});

const StateLayout = dynamic(() => import('config/statelayout'), {
  ssr: false,
})

function MyApp({ Component, pageProps, props }) {
  const router = useRouter();

  const state = router.query.state;

  const navItems = {
    main: { title: capitalizeWords(state), link: `/${state}` },
    sublinks: [
      { title: 'Budget Data', link: `/${state}/budget` },
      state === 'bihar'
        ? { title: 'Spending Data', link: `/${state}/datasets/summary-data` }
        : null,
    ].filter(Boolean),
  };

  const isStateInPathName = router.pathname.includes('/[state]');
  let UserLayout = isStateInPathName ? StateLayout : Layout;

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) pageview(url);

      // change focus to top on every page change
      if (url.includes('#')) {
        let idPresent = url.split('#').pop();
        document.querySelector(`#${idPresent}`).focus();
      } 
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script
            strategy="afterInteractive"
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
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
    </>
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
