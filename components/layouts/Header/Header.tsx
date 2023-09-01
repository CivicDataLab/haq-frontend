import HeaderComp from './HeaderComp';
import { Heading } from 'components/layouts/Heading';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <Heading as="h1" variant="h1">
        {data.title}
      </Heading>
      <Heading as="h4" variant="h4" mt="20px">
        {data.content}
      </Heading>
    </HeaderComp>
  );
};

export default Header;
