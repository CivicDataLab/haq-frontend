import React from 'react';
import styled from 'styled-components';

const ResourceCard = () => {

  const data = [
    {
      title: 'Lorem ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Et lobortis',
      content: 'Turpis tellus orci pharetra turpis. Tortor enim duis in sapien venenatis dolor vel tempor cras. Diam ullamcorper nisl, purus fames lacus, eget integer. Consectetur nulla pellentesque nec vulputate viverra sapien sagittis, risus massa. Gravida nibh enim arcu condimentum enim lectus purus convallis sem. Pharetra, interdum sit amet, tellus sed id fames non.'
    },
    {
      title: 'Lorem ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      title: 'Lorem ipsum',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  ]
  return (
    <Wrapper>
      {data.map((item, key) => {
        return (
          <Card key={`card__${key}`}>
            <p>
              {item.title}
            </p>
            <small>
              {item.content}
            </small>
          </Card>
        )
      })}
    </Wrapper>
  );
};

export default ResourceCard;

const Wrapper = styled.div`
`;

const Card = styled.div`
  background: var( --color-background-lighter);
  border: var(--border-2);
  box-shadow: var(--box-shadow-1);
  border-radius: 12px;
  padding:24px;
  margin-top:16px;

  p {
    font-weight: var(--font-weight-medium);
    font-size: 16px;
    line-height: 22px;
    margin-bottom:6px;
  }
  small {
    font-weight: var(--font-weight-light);
    font-size: 16px;
    line-height: 22px;
    color: var(text_light_medium);
  }
`;