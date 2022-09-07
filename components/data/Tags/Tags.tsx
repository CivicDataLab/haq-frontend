import { TagsComp, Tag } from './TagsComp';

const Tags = ({ data }) => {
  return (
    <TagsComp>
      {data.map((item, index) => (
        <Tag index={index}>
          {item}
        </Tag>
      ))}
    </TagsComp>
  );
};

export default Tags;
