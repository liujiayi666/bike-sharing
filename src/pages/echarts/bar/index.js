import React from 'react';
// import { Card } from 'antd';
// import echartsTheme from '../echartsTheme';
// //导入主模块
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
// //实现组件化开发
// import ReactEcharts from 'echarts-for-react';
const echarts = require('echarts');
export default class Bar extends React.Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById("bar_one"));
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        // 提供一份数据。
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
      xAxis: { type: 'category' },
      // 声明一个 Y 轴，数值轴。
      yAxis: { type: 'value' },
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
      ]
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div>
        <div id="bar_one" style={{ width: 400, height: 400 }} >

        </div>
      </div>
    )
  }
}