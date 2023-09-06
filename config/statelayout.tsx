import { SubNav } from 'components/layouts';
import { Navbar } from 'components/common';
import { Footer } from 'components/common';
import { navList } from 'data/navdata/navlist';

const StateLayout = ({ children, nav, footer }) => {
  return (
    <>
      <Navbar data={navList} />
      <SubNav data={nav} />
      {children}
      <Footer data={footer} />
    </>
  );
};

export default StateLayout;