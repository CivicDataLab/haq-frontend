import React from 'react';
import styled from 'styled-components';

const ResourceCard: React.FC<{ data: any; key: string; }> = ({ data, key }) => { 
  return (
    <Wrapper>
      <Card>
        <p>
          {data.title}
        </p>
        <small>
          {data.content}
        </small>
      </Card>
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