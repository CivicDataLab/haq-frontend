import Link from 'next/link';
import HeaderComp from './HeaderComp';
import Image from 'next/image';

const Header = ({ data }) => {
  return (
    <HeaderComp>
      <div className="container">
        {data.previousPage && (
          <Link href={data.previousLink}>
            <a>{`< Go Back to ${data.previousPage}`}</a>
          </Link>
        )}
        <div className = "logo">
          <Image
            src={data.logo}
            alt=""
            width={147.91}
            height={147.91}     
          />
        </div>
        < div className = "header__content">
          <h2>{data.title}</h2>
          <p>{data.content}</p>
        </div>
        {data.date && <p>{data.date}</p>}
      </div>
    </HeaderComp>
  );
};

export default Header;