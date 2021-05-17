import React from 'react';
import './index.less';
import { Card, Form, Select, Button } from 'antd';
import { loginCheck } from '../../utils/utils';
import { connect } from 'dva';

const Option = Select.Option;
const FormItem = Form.Item;
const echarts = require('echarts');
@connect(({ staff }) => ({

}))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      cityData: [],
      openCityOfProvince: [],
    }
    this.formRef = React.createRef();
    this.year_month = [];
    this.usage_rate = [];
  }
  componentDidMount() {
    this.getProvinceList();
    this.initMap()
  }

  initMap = () => {
    const myChart = echarts.init(document.getElementById("map"));
    var option = {}
    // var yList = [32, 58, 64, 64, 64];
    // var xList = [10, 55, 44, 55, 9, 8];
    var yList = this.usage_rate;
    var xList = this.year_month;
    var color = ['#CC1CAA', '#8D67FF', '#00FFFF', '#48DE13', '#FFC516', '#DC3E14', '#8E16F8'];
    var xData = xList.map((item, index) => {
      return {
        value: item,
        textStyle: {
          color: color[index]
        }
      };
    });
    var dom = 800;
    var barWidth = dom / 20;
    var colors = [{
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#FF3FDA'
      }, {
        offset: 0.5,
        color: '#FF3FDA'
      }, {
        offset: 0.5,
        color: '#CC1BAA'
      }, {
        offset: 1,
        color: '#CC1BAA'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#602CFF'
      }, {
        offset: 0.5,
        color: '#602CFF'
      }, {
        offset: 0.5,
        color: '#4915E6'
      }, {
        offset: 1,
        color: '#4915E6'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#00FFFF'
      }, {
        offset: 0.5,
        color: '#00FFFF'
      }, {
        offset: 0.5,
        color: '#11A6D0'
      }, {
        offset: 1,
        color: '#11A6D0'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#89FF5E'
      }, {
        offset: 0.5,
        color: '#89FF5E'
      }, {
        offset: 0.5,
        color: '#48DD12'
      }, {
        offset: 1,
        color: '#48DD12'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#FFD05C'
      }, {
        offset: 0.5,
        color: '#FFD05C'
      }, {
        offset: 0.5,
        color: '#DEA821'
      }, {
        offset: 1,
        color: '#DEA821'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#FF7853'
      }, {
        offset: 0.5,
        color: '#FF7853'
      }, {
        offset: 0.5,
        color: '#DB3E13'
      }, {
        offset: 1,
        color: '#DB3E13'
      }]
    },
    {
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#AA48FF'
      }, {
        offset: 0.5,
        color: '#AA48FF'
      }, {
        offset: 0.5,
        color: '#8E15F8'
      }, {
        offset: 1,
        color: '#8E15F8'
      }]
    }
    ];
    option = {
      backgroundColor: "#010d3a",
      // backgroundColor: "#fff",
      //标题
      title: {
        text: '近半年的单车使用率',
        textStyle: {
          color: '#00FFFF',
          fontWeight: '800',
          fontSize: `20`,
        },
        left: 'center',
        top: '1%'
      },
      //提示框
      tooltip: {
        trigger: 'axis',
        // formatter: "{b} : {c}",
        formatter: "{c}%",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },

      xAxis: {
        name: 'X',
        nameTextStyle: {
          color: '#FFFFFF',
          padding: [0, 0, 0, 20]

        },
        data: xData,
        show: true,
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,1)',
            shadowColor: 'rgba(255,255,255,1)',
            shadowOffsetX: '20',
          },
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 25]
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          },
        },
        axisLabel: {
          rotate: -30,
          fontSize: 12,
        },
      },
      yAxis: {
        show: true,
        splitNumber: 4,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'

          },
        },
        axisLabel: {
          color: '#FFFFFF',
          formatter: '{value}%'
        }
      },
      series: [{
        type: 'bar',
        barWidth: barWidth,
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            }
          }
        },
        label: {
          show: true,
          position: [barWidth / 2, -(barWidth + 20)],
          color: '#ffffff',
          fontSize: 12,
          fontStyle: 'bold',
          align: 'center',
        },
        data: yList
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            },
          }
        },
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [barWidth, barWidth * 0.5],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: function (params) {
              return colors[params.dataIndex % 7].colorStops[0].color;
            },

          }
        },
      },
      {
        z: 4,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'circle',
        symbolOffset: [0, -barWidth],
        symbolSize: [barWidth * 0.5, barWidth * 0.5],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: function (params) {
              return colors[params.dataIndex % 7].colorStops[0].color;
            },

          }
        },
      },
      ],
    };
    myChart.setOption(option);

  }
  //获取省份列表
  getProvinceList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'city/getProvinceList',
      payload: {}
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === "1") {
        this.setState({
          provinceList: res.data
        })
      } else {
        return
      }
    })
  }
  //获取城市信息  开通
  getOpenCityByProvince = (pid) => {
    console.log(pid, 'pid');
    const { dispatch } = this.props;
    dispatch({
      type: 'city/getOpenCityByProvince',
      payload: {
        pid
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === "1") {
        this.setState({
          openCityOfProvince: res.data
        })
      } else {
        return
      }
    })
  }
  //选择城市
  handleSelect = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rate/findRate',
      payload: {
        cid: value
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.format(res.data.res)
        this.initMap()
        // this.setState({
        //   centerPoint: res.data.centerpoint,
        //   point: res.data.point
        // }, () => {
        //   this.renderMap(this.state.centerPoint, this.state.point)
        // })
        console.log(res);
      } else {
        Modal.warning({
          title: '提示',
          content: '抱歉！暂无该城市信息'
        })
      }
    })
  }
  //处理返回数据
  format = (data) => {
    this.year_month = [];
    this.usage_rate = [];
    data.map(item => {
      this.year_month.push(item.year_month);
      this.usage_rate.push(item.usage_rate);
    })
  }
  //重置表单
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
  }
  render() {
    const {
      provinceList,
      cityData,
      openCityOfProvince,
    } = this.state
    return (
      <div className="home_wrapper">
        <Card>
          <Form
            layout="inline"
            ref={this.formRef}
            onFinish={this.getValidateValues}
            initialValues={{
              "pid": '',
              "cid": '',
            }
            }
          >
            <FormItem label="省份" name="pid" rules={[
              {
                required: true,
                message: '请选择省份'
              }
            ]} >
              <Select style={{ width: 85 }} onSelect={(value) => this.getOpenCityByProvince(value)}>
                {provinceList.map(item => {
                  return (<Option value={item.pid}>{item.province_name}</Option>)
                })}
              </Select>
            </FormItem>
            <FormItem label="城市" name="cid" rules={[
              {
                required: true,
                message: '请选择城市'
              }
            ]}>
              <Select style={{ width: 115 }} onChange={(value) => this.handleSelect(value)}>
                {openCityOfProvince.map(item => {
                  return (<Option value={item.cid}>{item.city}</Option>)
                })}
              </Select>
            </FormItem>

            <FormItem>
              <Button onClick={() => this.resetValues()}  > 重置</Button>
            </FormItem>
          </Form>
        </Card>
        <div id='map'></div>
      </div>
    )
  }
}
export default Home;