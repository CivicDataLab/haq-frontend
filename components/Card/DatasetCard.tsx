/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
// import { getDate } from 'utils/index';
import { DatasetCardComp } from 'components/Card/CardComp';

const DatasetCard: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${datapackage.name}`} passHref>
      <DatasetCardComp>
        <figure>
          <Image
            className="card__image"
            src="http://placekitten.com/60/60"
            width={60}
            height={60}
            alt=""
          />
        </figure>

        <section>
          <h3 className="card__heading">{datapackage.organization.title}</h3>
          <small className="card__date">
            {`${datapackage.tender_bid_opening_date} . ${datapackage.fiscal_year}`}
          </small>
          <div className="card__content">
            <section className="card__id">
              <h4>
                {truncate(datapackage.tender_id, {
                  length: 40,
                })}
              </h4>
              <small>Tender ID</small>
            </section>
            <section className="card__value">
              <h4>
                ₹
                {datapackage.tender_value_amount &&
                  datapackage.tender_value_amount.replace(
                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                    ','
                  )}
              </h4>
              <small>Tender value</small>
            </section>
            <section className="card__name">
              <h4>
                {truncate(datapackage.tender_title, {
                  length: 80,
                })}
              </h4>
              <small>Tender name</small>
            </section>
          </div>
        </section>
      </DatasetCardComp>
    </Link>
  );
};

export default DatasetCard;
