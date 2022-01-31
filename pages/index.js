import Head from 'next/head';
import Toggle from 'components/Toggle/Toggle';
import Dropdown from 'components/Dropdown/Dropdown';
import Tabbed from 'components/Tabbed/Tabbed';
import Sidebar from 'components/Sidebar/Sidebar';
import Modal from 'components/Modal/Modal';
import Carousel from 'components/Carousel/Carousel';
import Banner from 'components/Banner/Banner';
import Button from 'components/Button/Button';
import * as temp from 'data/tempData';

export default function Home() {
  return (
    <>
      <Head>
        <title>OPub</title>
      </Head>
      <div className="container">
        <h1>Component Library - alpha</h1>
        <div className="component">
          <h2>Toggletip</h2>
          <Toggle data={'Lorem Ipsum'} />
        </div>
        <div className="component">
          <h2>Dropdown</h2>
          <Dropdown
            // default={'A'}
            options={['A', 'B', 'C']}
            heading="Header"
          />
        </div>
        <div className="component">
          <h2>Tabbed</h2>
          <Tabbed data={temp.tabbedData} />
        </div>
        <div className="component">
          <h2>Sidebar</h2>
          <Sidebar />
        </div>
        <div className="component">
          <h2>Modal</h2>
          <Modal />
        </div>
        <div className="component">
          <h2>Carousel</h2>
          <Carousel data={temp.carousel} />
        </div>
        <div className="component">
          <h2>Banner</h2>
          <Banner details={temp.bannerDetails} />
        </div>
        <div className="component buttons">
          <h2>Buttons</h2>
          <Button label="Primary Button" onClick={() => {}} />
          <Button
            label="Secondary Button"
            onClick={() => {}}
            kind="secondary"
          />
        </div>
      </div>
    </>
  );
}
