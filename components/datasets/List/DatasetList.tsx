import { DatasetCard } from 'components/datasets';
import { explorerPopulation } from 'utils/explorer';
import { DatasetListComp } from './ListComp';

const DatasetList: React.FC<{ data: any }> = ({ data }) => {
  return (
    <DatasetListComp className="list">
      {data.map((pkg: any, index: number) => {
        const parsedData = explorerPopulation(pkg);
        return (
          <li key={`list-${index}`} className="list__item">
            <DatasetCard datapackage={parsedData} />
          </li>
        );
      })}
    </DatasetListComp>
  );
};

export default DatasetList;
