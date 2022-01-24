import Image from 'next/image';
import BannerComp from './BannerComp';

const Banner = ({ details }) => {
  return (
    <BannerComp
      className="banner"
      style={{ backgroundColor: details.color }}
    >
      <div className="banner__content">
        <h2 className="heading">{details.heading}</h2>
        {details.content}
      </div>
      <figure>
        <Image src={details.image} width={184} height={184} alt="" />
      </figure>
    </BannerComp>
  );
};

export default Banner;