import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Parser from 'rss-parser';
import StoriesCard from 'components/pages/story/StoryCard/StoryCard';
import DataStory from './DataStory';
import { Header } from 'components/layouts';

const parser = new Parser();

const Story:React.FC<{ data: any }>= ({data}) => {
   
    interface HeadObjLayout {
        title: string;
        content: string;
        logo ?: any;
    }

    const headerData: HeadObjLayout = {
        title: 'Data Stories',
        content: 'This page contains different researches, case studies, explainers and other public resources using  procurement data.',
      };
    
  return (
    <>
      <Head>
        <title>Data Story | HAQ</title>
      </Head>
      <DataStory>
        <div className="container">
          <Header data={headerData} />
          {data.items.length > 0 && (
            <>
              <StoriesCard data={data.items[0]} length={700} />
              <section className="team">
                <div className="header">
                  <h3 className="heading-w-line">Stories from our team</h3>
                </div>
                <div className="story-wrapper">
                  {data.items.map((story:any, index:number) => {
                    if (index == 0) return;
                    return (
                      <StoriesCard
                        key={`story-${index}`}
                        data={story}
                        length={120}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}
         </div>
      </DataStory>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await parser.parseURL(
      'https://medium.com/feed/civicdatalab/tagged/open-contracting'
    );
  
    return {
      props: {
        data,
      },
    };
  };
    

export default Story;

