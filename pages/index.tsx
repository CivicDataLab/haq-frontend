import Head from 'next/head';
import * as temp from 'data/tempData';

import { HomePage } from 'styles/HomePage';
import {
  Banner,
  Button,
  Carousel,
  CollapseSidebar,
  Menu,
  Modal,
  Select,
  Tabbed,
  Toggletip,
} from 'components/ui';

export default function Home() {
  return (
    <>
      <Head>
        <title>OPub</title>
      </Head>
      <HomePage className="container">
        <h1>Component Library - alpha</h1>
        <div className="component">
          <h2>Toggletip</h2>
          <Toggletip data={'Lorem Ipsum'} />
        </div>
        <div className="component">
          <h2>Select</h2>
          <Select
            options={temp.dropdown}
            heading="heading"
            handleChange={() => {}}
          />
        </div>

        <div className="component">
          <h2>Menu</h2>
          <Menu
            options={temp.dropdown}
            heading="Open Menu"
            handleChange={() => {}}
          />
        </div>
        <div className="component">
          <h2>Tabbed</h2>
          <Tabbed data={temp.tabbedData} />
        </div>
        <div className="component">
          <h2>Sidebar</h2>
          <CollapseSidebar />
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
          <div>
            <Button onClick={() => {}}>Primary Button</Button>
            <Button onClick={() => {}} kind="secondary">
              Secondary Button
            </Button>
            <Button onClick={() => {}} kind="primary-outline">
              Primary Outline
            </Button>
            <Button onClick={() => {}} kind="secondary-outline">
              Secondary Outline
            </Button>
          </div>
          <br />
          <div>
            <Button size="sm" onClick={() => {}}>
              Primary Button
            </Button>
            <Button size="sm" onClick={() => {}} kind="secondary">
              Secondary Button
            </Button>
            <Button size="sm" onClick={() => {}} kind="primary-outline">
              Primary Outline
            </Button>
            <Button size="sm" onClick={() => {}} kind="secondary-outline">
              Secondary Outline
            </Button>
          </div>
        </div>
      </HomePage>
    </>
  );
}
