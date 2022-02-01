import DatasetCard from 'components/Card/DatasetCard';
import { DatasetListComp } from './ListComp';

const DatasetList: React.FC<{ data: any }> = ({ data }) => {
  return (
    <DatasetListComp className="list">
      {data.map((pkg: any, index: number) => (
        <li key={`list-${index}`} className="list__item">
          <DatasetCard datapackage={pkg} />
        </li>
      ))}
    </DatasetListComp>
  );
};

export default DatasetList;
