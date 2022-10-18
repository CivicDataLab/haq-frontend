import { DatasetCard } from 'components/data';
import { explorerPopulation } from 'utils/explorer';
import { DatasetListComp } from './ListComp';

const DatasetList: React.FC<{ data: any; datasetname:string }> = ({ data,datasetname }) => {
  return (
    <DatasetListComp className="list">
      {data.map((pkg: any, index: string) => {
        const parsedData = explorerPopulation(pkg);
        return (
          <li key={`list-${index}`} className="list__item">
            <DatasetCard datapackage={parsedData} index={index} datasetname={datasetname}/>
          </li>
        );
      })}
    </DatasetListComp>
  );
};

export default DatasetList;
