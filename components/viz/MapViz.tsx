import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';

const MapViz = ({ meta, mapFile, data, newMapItem, vizIndicators }) => {
  
  const [mapOptions, setMapOptions] = useState({});
  useEffect(() => {
    if (Object.keys(mapFile).length > 0) {
      const map = mapFile;
      map.features.forEach(
        (obj) => (obj.properties['dtcode11'] = String(obj.properties['dtcode11']))
      );

      echarts.registerMap("UTTAR PRADESH",map,{});
      const options = {
        backgroundColor: '#EBF0EE',
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            if (params.data)
              return `${params.data.mapName}: ${params.data.value}`;
            else return `No data`;
          },
        },
        visualMap: {
          type: 'piecewise',
          left: '16px',
          bottom: '16px',
          backgroundColor: '#FFFFFF',
          pieces: vizIndicators,
          text:  vizIndicators[0].max ? [`Units: ${meta.unit}`] : "Units",
          padding: 8,
          showLabel: true,
        },
        series: [
          {
            name: meta.selectedIndicator
              ? meta.selectedIndicator
              : 'Indicator',
            type: 'map',
            roam: true,
            map: "UTTAR PRADESH",
            nameProperty: 'dtcode11',
            zoom: 1.3,
            itemStyle: {
              borderColor: '#494D44',
              borderWidth: 0.8,
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#ffd700',
              },
            },
            select: {
              label: {
                show: false,
                color: 'rgb(100,0,0)',
              },
              itemStyle: {
                color: 'rgba(255, 215, 0, 0.8)',
              },
            },
            scaleLimit: {
              min: 1,
              max: 1,
            },
            data: data,
          },
        ],
      };
      setMapOptions(options);
    }
  }, [meta.selectedIndicator, data, mapFile]);

  function handleClick(e) {
    newMapItem(e.data);
  }

  const onEvents = { click: handleClick };

  echarts.use([
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    SVGRenderer,
  ]);

  return (
    Object.keys(mapOptions).length > 0 && (
      <ReactEChartsCore
        echarts={echarts}
        onEvents={onEvents}
        option={mapOptions}
        notMerge={true}
        lazyUpdate={true}
        style={{
          height: '100%',
        }}
      />
    )
  );
};
export default React.memo(MapViz);
