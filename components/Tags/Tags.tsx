import TagsComp from './TagsComp';

const Tags = ({ data }) => {
  return (
    <TagsComp>
      {data.map((item, index) => (
        <li key={`explorer-${index}`}>{item}</li>
      ))}
    </TagsComp>
  );
};

export default Tags;
