import TotalComp from "./TotalComp";

const Total: React.FC<{ total: number; text?: string }> = ({
  total,
  text,
}) => {
  return (
    <TotalComp>
      {total.toLocaleString('en', { useGrouping: true })}{' '}
      {text ? text : 'results'}
    </TotalComp>
  );
};

export default Total;