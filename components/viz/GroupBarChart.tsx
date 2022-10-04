import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
  GridComponent,
  DatasetComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';

interface BarChartProps {
  xAxisLabel: string;
  yAxisLabel: string;
  theme: string[];
  dataset: any;
  stack: boolean;
  Title: string;
  subTitle: string;
  left: string;
  type: string;
  smooth: boolean;
}

const GroupBarChart: React.FC<BarChartProps> = ({
  xAxisLabel,
  yAxisLabel,
  theme,
  dataset,
  stack,
  Title,
  subTitle,
  left,
  type,
  smooth,
}) => {
  const [series, setSeries] = useState([]);
  const [option, setOption] = useState({});

  // settting series
  useEffect(() => {
    const vizSeries = [];

    let stackTrue = '';
    if (stack == true) {
      stackTrue = 'x';
    }

    for (
      let columnLength = 1;
      columnLength <= dataset[0].length - 1;
      columnLength++
    ) {
      vizSeries.push({
        type: type,
        barMaxWidht: 16,
        itemStyle: { color: theme[columnLength] },
        stack: stackTrue,
        smooth: smooth,
        label: {
          show: true,
          position: 'top',
          formatter: function (d) {
            return d.data[columnLength];
          },
        },
        // animation: false,
      });
    }

    setSeries(vizSeries);
  }, [dataset]);

  // setting option
  useEffect(() => {
    const vizOptions = {
      legend: {
        top: '5%',
      },
      tooltip: {},
      dataset: { source: dataset },
      grid: {
        show: false,
        top: '20%',
        left: left,
      },
      xAxis: {
        type: 'category',
        name: xAxisLabel,
        axisLine: {
          symbol: ['none', 'arrow'],
        },
        nameLocation: 'middle',
        nameGap: 30,
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        axisLine: { onZero: false, show: true, symbol: ['none', 'arrow'] },
        nameLocation: 'middle',
        nameGap: 45,
        nameRotate: 90,
      },
      title: {
        text: Title,
        left: 'center',
        subtext: subTitle,
      },
      series: series,
    };

    setOption(vizOptions);
  }, [series]);

  echarts.use([
    BarChart,
    LineChart,
    SVGRenderer,
    GridComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    TooltipComponent,
  ]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{
        height: '500px',
      }}
    />
  );

  // return <ReactEcharts option={options} echarts={echarts} />;
};
export default GroupBarChart;
