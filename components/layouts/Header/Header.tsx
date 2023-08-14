import HeaderComp from './HeaderComp';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </HeaderComp>
  );
};

export default Header;
