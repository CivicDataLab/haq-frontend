import React, { useEffect, useState } from 'react';
import { Table } from 'components/data';

const BudgetTable = ({ data, tableData, setTableData }) => {

  useEffect(() => {
    if (data) {

      const tableHeader = [
        { Header: 'Scheme', accessor: 'schemeName' },
        { Header: 'Year', accessor: 'financialYear' },
      ];
    
      const indicators = [
        { key: 'indicator_01', header: 'Budget Estimates' },
        { key: 'indicator_02', header: 'Actual Estimates' },
        { key: 'indicator_03', header: 'New Estimates' },
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
          tempObj[indicator.key] =
            data[indicator.key][year] !== null
              ? data[indicator.key][year].toString()
              : 'NA';
        });

        rows.push(tempObj);
      });

      const tableData = {
        header: tableHeader,
        rows: rows,
      };
      setTableData(tableData);
    }
  }, [data]);

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

