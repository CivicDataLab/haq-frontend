
import Nav from 'components/Navbar/Navbar';

const Layout: React.FC = ({
  children
}) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;