import React from 'react';
import { Button, Card, Table, Form, Select, Pagination, Popconfirm, Modal, message, DatePicker } from 'antd';
import { connect, routerRedux } from 'dva';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
import { loginCheck } from '../../utils/utils';

@connect(({ order }) => ({
  orderData: order.orderData,
}))
export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNumber: 1,
      orderList: [],
      total: '',
      provinceList: [],
      openCityOfProvince: [],
      pageSize: 10,
      pageNumber: 1,
      time: [],
      position_list: []
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getOrderList();
    this.getProvinceList()
  }

  getOrderList = () => {
    const { dispatch } = this.props;
    const { pageNumber, pageSize } = this.state
    dispatch({
      type: 'order/getOrderList',
      payload: {
        pageNumber,
        pageSize
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.setState({
          orderList: res.data.listData,
          total: res.data.total
        })
      }
    })
  }
  onPageChange = (pageNumber, pageSize) => {
    this.params = {
      ...this.params,
      pageNumber,
      pageSize
    }
    this.getOrderData();
  }
  onShowSizeChange = (pageNumber, pageSize) => {
    this.params = {
      ...this.params,
      pageNumber,
      pageSize
    }
    this.getOrderData();
  }

  //结束订单
  handleFinishOrder = (record) => {
    const { order_id, status, begin_time } = record;
    const { dispatch } = this.props
    //根据orderid 获取最后的坐标点
    if (status == 2) {
      Modal.warning({
        title: '提示',
        content: '该订单已经处于结束状态'
      })
      return
    }
    let position_list = [];
    let lon = '';
    let lat = '';
    let end_location = '';
    dispatch({
      type: 'order/getDetail',
      payload: {
        order_id
      }
    }).then(async res => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        position_list = res.data.position_list
        lon = position_list[position_list.length - 1].lon;
        lat = position_list[position_list.length - 1].lat;
        const BMapGL = window.BMapGL;
        var myGeo = new BMapGL.Geocoder();
        await new Promise((resolve, reject) => {
          myGeo.getLocation(new BMapGL.Point(lon, lat), function (result) {
            if (result) {
              end_location = result.address;
              return resolve(end_location)
            }
          })
        })
        dispatch({
          type: 'order/finishOrder',
          payload: { order_id, begin_time, end_location }
        }).then(res => {
          loginCheck(res);
          if (res.code.toString() === "1") {
            this.getProvinceList()
            this.getOrderList();
            message.success('成功');
          }
        })

      }
    })

  }

  //重置表单
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
  }
  //查询
  getValidateValues = async () => {
    console.log('查询');
    const form = this.formRef.current;
    await form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    const { pageNumber, pageSize, time } = this.state;
    const {
      pid,
      cid,
      status
    } = values
    const params = {
      pid,
      cid,
      time,
      status,
      pageNumber,
      pageSize
    }
    console.log(params);
    const { dispatch } = this.props;
    dispatch({
      type: "order/findOrder",
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)

      if (res.code.toString() == '1') {
        this.setState({
          orderList: res.data.orderList,
          total: res.data.total
        })
      }
    })
  }
  handleSelectTime = (value, dateString) => {
    console.log(value);
    console.log(dateString);
  }
  //点击查看详情 页面跳转
  handleCheck = (record) => {
    const { order_id } = record;
    window.open(`/#/common/order/detail/${order_id}`, '_blank');
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
  handleChange = (value, dateString) => {
    this.setState({
      time: dateString
    })
  }
  render() {
    const {
      orderList,
      total,
      openCityOfProvince,
      provinceList
    } = this.state;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_id',
        align: 'center'
      },
      {
        title: '车辆编号',
        dataIndex: 'car_id',
        align: 'center'
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
        align: 'center'
      },
      {
        title: '手机号码',
        dataIndex: 'phonenumber',
        align: 'center'
      },
      {
        title: '里程',
        dataIndex: 'mileage',
        align: 'center',
        render: (text, record) => {
          return (text == null ? (<a >{text}</a>) : (<a >{text} 公里</a>))
        }
      },
      {
        title: '行程时长',
        dataIndex: 'travel_time',
        align: 'center',
        render: (text, record) => {
          return (text == null ? (<a >{text}</a>) : (<a >{text} min</a>))
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        render: (text, record) => {
          return (text == 1 ? (<span style={{ color: 'green' }}>进行中</span>) : (<span style={{ color: 'red' }}>已结束</span>))
        }
      },
      {
        title: '开始时间',
        dataIndex: 'begin_time',
        align: 'center',
        render: (text, record) => {
          return (<a>{text.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')}</a>)
        }
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        align: 'center',
        render: (text, record) => {
          if (record.status == 1) {
            return (<a ></a>)
          } else {
            return (<a>{text.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')}</a>)
          }
        }
      },
      {
        title: '实付金额',
        dataIndex: 'pay_amount',
        align: 'center',
        render: (text, record) => {
          return (text == null ? (<a >{text}</a>) : (<a >{text} 元</a>))
        }
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          return (<div>
            <a onClick={() => this.handleCheck(record)} style={{ marginRight: 10 }}>查看详情</a>
            <Popconfirm
              title="确定结束该订单吗?"
              onConfirm={() => this.handleFinishOrder(record)}
              okText="确定"
              cancelText="取消"
            >
              <a>结束</a>
            </Popconfirm>
          </div>)
        }
      }
    ];
    const pagination = {
      defaultCurrent: 1,
      showSizeChanger: true,
      showQuickJumper: true,
      total,
      pageSizeOptions: ["5", "10", "15", "20"],
      showTotal: () => `总共 ${total} 条`,
      onChange: this.onPageChange,
      onShowSizeChange: this.onShowSizeChange
    }
    return (
      <div className={styles['wrap']}>
        <Card id='card' >
          <Form
            layout="inline"
            ref={this.formRef}
            onFinish={this.getValidateValues}
            initialValues={{
              "time": [],
              "status": ''
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
              <Select style={{ width: 115 }} >
                {openCityOfProvince.map(item => {
                  return (<Option value={item.cid}>{item.city}</Option>)
                })}
                {openCityOfProvince.length > 0 ? (<Option value="-1">全部</Option>) : ('')}
              </Select>
            </FormItem>
            <FormItem label="订单状态" name="status" style={{ width: 200 }}>
              <Select>
                <Option value={1}>进行中</Option>
                <Option value={2}>已结束</Option>
                <Option value={-1}>全部</Option>
              </Select>
            </FormItem>
            <FormItem label="订单时间" name="time" style={{ width: 600 }}>
              <RangePicker
                placeholder={['请选择开始时间', '请选择结束时间']}
                showTime={{ format: 'HH:mm:ss' }}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={this.handleChange}
              >
              </RangePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" style={{ margin: '0 50px' }} htmlType="submit">查询</Button>
              <Button onClick={() => this.resetValues()}  > 重置</Button>
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Form>
            <Table
              columns={columns}
              bordered
              dataSource={orderList}
              pagination={pagination}
            >
            </Table>
          </Form>
        </Card>
      </ div >
    )
  }

}