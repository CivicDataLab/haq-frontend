import HeaderComp, { Wrapper } from './HeaderComp';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <Wrapper className="container">
        {data.logo && <figure>{data.logo}</figure>}
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </Wrapper>
    </HeaderComp>
  );
};

export default Header;
