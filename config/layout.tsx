import { Navbar } from 'components/common';
import { Footer } from 'components/common';
import { navList } from 'data/navdata/navlist';

const Layout = ({ children, footer }) => {
  return (
    <>
      <Navbar data={navList} />
      {children}
      <Footer data={footer} />
    </>
  );
};

export default Layout;
