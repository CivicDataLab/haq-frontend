import React from 'react';
import Head from 'next/head';
import { Header } from 'components/layouts';
import { CatalogCard,CatalogSearch } from 'components/pages/catalog';

const Catalogue = () => {
  const headerData = {
    title: 'Data Catalog',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
  };
 

  return (
    <div>
      <Head>
        <title>Catalog | HAQ</title>
      </Head>
      <div className="container">
        <div>
          <Header data={headerData} />
        </div>
        <div>
         <CatalogCard />
         <CatalogSearch />
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
