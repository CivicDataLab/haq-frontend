import { TagsComp, Tag } from './TagsComp';

const Tags = ({ data }) => {
  return (
    <TagsComp>
      {data.map((item, index) => (
        <Tag key ={`tag ${index}`}index={index}>
          {item}
        </Tag>
      ))}
    </TagsComp>
  );
};

export default Tags;
