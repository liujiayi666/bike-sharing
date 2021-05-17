import React from 'react';
import { Button, Card, Table, Form, Input, Select, Pagination, Modal, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { loginCheck, NewsTips } from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ city, login, staff, user }) => ({
  opencity: city.opencity,
  userid: login.userid
}))
export default class BikeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      cityData: [],
      openCityOfProvince: [],
      centerPoint: {},
      point: [],
      allPoint: []
    }
    this.formRef = React.createRef();
  }
  componentDidMount = () => {
    this.getProvinceList();
    this.getAllMarker();
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
  //获取对应城市列表  开通城市时 使用  是没有开通的城市
  getCityList = (pid) => {
    const { dispatch } = this.props
    dispatch({
      type: 'city/getCityList',
      payload: {
        pid
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === "1") {
        this.setState({
          cityData: res.data
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
      type: 'bikeMap/getLonLatOfCity',
      payload: {
        cid: value
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.setState({
          centerPoint: res.data.centerpoint,
          point: res.data.point
        }, () => {
          this.renderMap(this.state.centerPoint, this.state.point)
        })
      } else {
        Modal.warning({
          title: '提示',
          content: '抱歉！暂无该城市信息'
        })
      }
    })
  }
  //获取所有标记点
  getAllMarker = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bikeMap/getAllMarker',
      payload: {}
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.setState({
          allPoint: res.data.point
        }, () => {
          this.renderAllMap(this.state.allPoint)
        })
      }
    })
  }
  renderAllMap = (allPoint) => {
    const BMapGL = window.BMapGL;
    this.map = new BMapGL.Map("bikeMap");
    // this.map.centerAndZoom(new BMapGL.Point(102.89916, 30.367481), 5.8);
    this.map.centerAndZoom(new BMapGL.Point(102.457625, 38.103267), 5.8);
    let markerArr = []
    allPoint.map(item => {
      var marker = new BMapGL.Marker(new BMapGL.Point(item.lon, item.lat))
      markerArr.push(marker)
    })
    markerArr.map(item => {
      this.map.addOverlay(item)
    })
    //调用控件
    this.addControl(this.map);
  }
  renderMap = (centerPoint, point) => {
    const BMapGL = window.BMapGL;
    this.map = new BMapGL.Map("bikeMap");
    this.point = new BMapGL.Point(centerPoint.lon, centerPoint.lat);
    //设置地图中心
    this.map.centerAndZoom(this.point, 15);
    this.map.enableScrollWheelZoom(true);
    //创建标记点
    let markerArr = []
    point.map(item => {
      var marker = new BMapGL.Marker(new BMapGL.Point(item.lon, item.lat))
      markerArr.push(marker)
    })
    markerArr.map(item => {
      this.map.addOverlay(item)
    })
    //调用控件
    this.addControl(this.map);
  }
  //添加控件
  addControl = () => {
    const BMapGL = window.BMapGL;
    let map = this.map;
    map.enableScrollWheelZoom(true);
    var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
  }

  //重置
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
    this.getAllMarker()
  }
  render() {
    const {
      provinceList,
      openCityOfProvince
    } = this.state
    return (
      <div className={styles['wrap']}>
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
        <Card>
          <div className={styles['bikeMap']} id="bikeMap">地图信息</div>
        </Card>
      </div>
    )
  }
}