import HeaderComp, { Wrapper } from './HeaderComp';
import Image from 'next/image';
import { getStrapiMedia } from 'lib/media';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <Wrapper>
        {data.logo && 
          <figure>                 
            <Image
              src={getStrapiMedia(data.logo.url)}
              alt=""
              width={148}
              height={148}
            />
          </figure>
        } 
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </Wrapper>
    </HeaderComp>
  );
};

export default Header;
