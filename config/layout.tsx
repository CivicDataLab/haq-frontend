import { Navbar } from "components/common";

const Layout: React.FC = ({
  children
}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;