/**
 * @module Demo/Echarts
 */
import React from 'react';
import {hot} from 'react-hot-loader';
import Echarts from 'react-echarts-binding';

/**
 * Export Echarts
 */
@hot(module)
class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.data = {
      echarts1: {
        line1: [4, 4, 4, 4, 4],
        line2: [3, 3, 3, 3, 3],
      },
      echarts2: {
        line1: [
          {time: 1524420000, value: 4},
          {time: 1524423600, value: 4},
          {time: 1524425400, value: 4},
          {time: 1524426600, value: 4},
          {time: 1524430200, value: 4},
        ],
        line2: [
          {time: 1524420000, value: 3},
          {time: 1524423600, value: 3},
          {time: 1524425400, value: 3},
          {time: 1524426600, value: 3},
          {time: 1524430200, value: 3},
        ],
      },
    };

    this.options1 = {
      tooltip: {
        show: true,
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['line1', 'line2'],
      },
      xAxis: {
        type: 'category',
        name: '时间',
        data: [1, 2, 3, 4, 5],
      },
      yAxis: [{
        name: '数值',
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E5E9EE',
          },
        },
        axisLabel: {
          color: '#8C949C',
        },
      }],
      series: [{
        name: 'line1',
        type: 'line',
        smooth: true,
        data: this.data.echarts1.line1,
      }, {
        name: 'line2',
        type: 'line',
        smooth: true,
        data: this.data.echarts1.line2,
      }],
    };

    this.options2 = {
      tooltip: {
        show: true,
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['line1', 'line2'],
      },
      xAxis: {
        type: 'time',
        name: '时间',
      },
      yAxis: [{
        name: '数值',
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#E5E9EE',
          },
        },
        axisLabel: {
          color: '#8C949C',
        },
      }],
      series: [{
        name: 'line1',
        type: 'line',
        smooth: true,
        data: this.data.echarts2.line1.map((item) => {
          return [item.time, item.value];
        }),
      }, {
        name: 'line2',
        type: 'line',
        smooth: true,
        data: this.data.echarts2.line2.map((item) => {
          return [item.time, item.value];
        }),
      }],
    };

    this.state = {
      options1: this.options1,
      options2: this.options2,
    };
  }

  /**
   * Update echarts
   */
  componentDidMount() {
    setTimeout(() => {
      this.data = {
        echarts1: {
          line1: [3, 2, 1, 4, 2],
          line2: [3, 3, 3, 3, 3],
        },
        echarts2: {
          line1: [
            {time: 1524420000, value: 3},
            {time: 1524423600, value: 2},
            {time: 1524425400, value: 1},
            {time: 1524426600, value: 4},
            {time: 1524430200, value: 2},
          ],
          line2: [
            {time: 1524420000, value: 3},
            {time: 1524423600, value: 3},
            {time: 1524425400, value: 3},
            {time: 1524426600, value: 3},
            {time: 1524430200, value: 3},
          ],
        },
      };
      this.setState({
        ...this.state,
        options1: {
          series: [{
            data: this.data.echarts1.line1,
          }, {
            data: this.data.echarts1.line2,
          }],
        },
        options2: {
          series: [{
            data: this.data.echarts2.line1.map((item) => {
              return [item.time, item.value];
            }),
          }, {
            data: this.data.echarts2.line2.map((item) => {
              return [item.time, item.value];
            }),
          }],
        },
      });
    }, 5000);
  }

  /**
   * Render echarts demo
   * @return {Component}
   */
  render() {
    return (
      <div style={{width: '100vw', height: '40vh'}}>
        <div style={{width: '50%', height: '100%'}}>
          <Echarts
            option={this.state.options1}
            onLegendSelectChanged={(e, param) => {
              console.log(param);
            }}
          />
        </div>
        <div style={{width: '50%', height: '100%'}}>
          <Echarts
            option={this.state.options2}
          />
        </div>
      </div>
    );
  }
}

export default Component;

