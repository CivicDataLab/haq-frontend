import React, { useEffect, useState } from 'react';
import { Table } from 'components/data';
import { twoDecimals } from 'utils/data';

const BudgetTable = ({ data, tableData, setTableData, value }) => {

  useEffect(() => {
    if (data) {

      const tableHeader = [
        { Header: 'Scheme', accessor: 'schemeName' },
        { Header: 'Year', accessor: 'financialYear' },
      ];
    
      const indicators = [
        { key: 'indicator_01', header: 'Budget Estimates' },
        { key: 'indicator_02', header: 'Revised Estimate' },
        { key: 'indicator_03', header: 'Actuals' },
      ];

      indicators.forEach((indicator) => {
        tableHeader.push({
          Header: indicator.header,
          accessor: indicator.key,
        });
      });

      const rows = [];

      const financialYears = Object.keys(data.indicator_01);

      financialYears.forEach((year) => {
        const tempObj = {
          [tableHeader[0].accessor]: data.Scheme,
          [tableHeader[1].accessor]: year,
        };

        indicators.forEach((indicator) => {
          if (value === 'crore' && data[indicator.key][year] !== null) {
            tempObj[indicator.key] = twoDecimals(data[indicator.key][year] / 100).toString();
          } else {
            tempObj[indicator.key] =
              data[indicator.key][year] !== null ? data[indicator.key][year].toString() : 'NA';
          }
        });

        rows.push(tempObj);
      });

      const tableData = {
        header: tableHeader,
        rows: rows,
      };
      setTableData(tableData);
    }
  }, [data,value]);

  return (
    <div>
      {Object.keys(tableData).length > 0 ? (
        <Table
          header={
            tableData.header ? tableData.header : ['table not available']
          }
          rows={tableData.rows ? tableData.rows : []}
        />
      ) : (
        <span> Loading ...</span>
      )}
    </div>
  );
};

export default BudgetTable;

