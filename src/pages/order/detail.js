import React from 'react';
import { Card, Row, Col, ConfigProvider } from 'antd';
import './detail.less';
import { connect } from 'dva';
import { loginCheck } from '../../utils/utils';
@connect(({ order }) => ({
  orderInfo: order.orderDetail,
}))
export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: this.props.match.params.order_id,
      orderInfo: {},
      centerPoint: {}
    }
  }
  componentDidMount() {
    this.getOrderDetail();
    this.getCenterPointByOrderId();
  }
  //获取订单详情
  getOrderDetail = () => {
    const { order_id } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/getDetail',
      payload: {
        order_id
      }
    }).then((res) => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        console.log(res.data);
        this.setState({
          orderInfo: res.data.detailList
        }, () => {
          this.renderMap(res.data);
        })
      }
    })
  }
  //获取城市中心坐标
  getCenterPointByOrderId = () => {
    const { order_id } = this.state
    const { dispatch } = this.props;
    dispatch({
      type: "order/centerPointByOrderId",
      payload: {
        order_id
      }
    }).then(res => {
      loginCheck(res);

      if (res.code.toString() === "1") {
        this.setState({
          centerPoint: res.data.centerPoint
        })
      }
    })
  }
  //render地图
  renderMap = (result) => {
    const { centerPoint } = this.state;
    const BMapGL = window.BMapGL;
    this.map = new BMapGL.Map("orderDetailMap");
    // this.point = new BMapGL.Point(116.404, 39.915);
    this.point = new BMapGL.Point(centerPoint.lat, centerPoint.lon);
    //设置地图中心
    // this.map.centerAndZoom(this.point, 15);
    //调用控件
    this.addControl(this.map);
    //调用绘制路线图方法
    this.drawBikeRoute(result.position_list);
    this.drawServiceArea(result.area_list);
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
  //绘制路线图
  drawBikeRoute = (positionList) => {
    let map = this.map;
    const BMapGL = window.BMapGL;
    let startPoint = '';
    let endPoint = '';
    //设置起点 终点 坐标
    if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new BMapGL.Point(first.lon, first.lat);
      let startIcon = new BMapGL.Icon('assets/start_point.png', new BMapGL.Size(23, 25), {
        imageSize: new BMapGL.Size(23, 25),
        anchor: new BMapGL.Size(23, 25)
      });
      // 创建标注对象并添加到地图  
      var startMarker = new BMapGL.Marker(startPoint, { icon: startIcon });
      map.addOverlay(startMarker);// 将标注添加到地图中
      endPoint = new BMapGL.Point(last.lon, last.lat);
      let endIcon = ''
      if (this.state.orderInfo.status == '1') {
        endIcon = new BMapGL.Icon('assets/bike.jpg', new BMapGL.Size(23, 25), {
          imageSize: new BMapGL.Size(23, 25),
          anchor: new BMapGL.Size(23, 25)
        });
      } else {
        endIcon = new BMapGL.Icon('assets/end_point.png', new BMapGL.Size(23, 25), {
          imageSize: new BMapGL.Size(23, 25),
          anchor: new BMapGL.Size(23, 25)
        });
      }

      // 创建标注对象并添加到地图  
      var endMarker = new BMapGL.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endMarker);// 将标注添加到地图中
    } else {
      return;
    }
    //画折线
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new BMapGL.Point(point.lon, point.lat));
    }
    var polyline = new BMapGL.Polyline(trackPoint, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
    map.addOverlay(polyline);
    //设置地图中心
    this.map.centerAndZoom(endPoint, 10);
  }
  //绘制服务区
  drawServiceArea = (area) => {
    let trackPoint = [];
    let map = this.map;
    for (let i = 0; i < area.length; i++) {
      let point = area[i];
      trackPoint.push(new BMapGL.Point(point.lon, point.lat));
    }
    var polygon = new BMapGL.Polygon(trackPoint, {
      strokeColor: "#CE0000",
      strokeWeight: 4,
      strokeOpacity: 0.4,
      fillColor: '#ff8605'
    });
    map.addOverlay(polygon);
  }

  render() {
    const { orderInfo } = this.state;
    return (
      <div className="detail">
        <Card>
          <div className="orderDetailMap" id="orderDetailMap">地图信息</div>
          <div className="detail-items one">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div>用车模式</div>
                <div>{orderInfo.use_model == 1 ? '指定停车点模式' : '禁停区模式'}</div>
              </li>
              <li>
                <div>订单编号</div>
                <div>{orderInfo.order_id}</div>
              </li>
              <li>
                <div>车辆编号</div>
                <div>{orderInfo.car_id}</div>
              </li>
              <li>
                <div>用户名</div>
                <div>{orderInfo.user_name}</div>
              </li>
              <li>
                <div>手机号码</div>
                <div>{orderInfo.phonenumber}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items two">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div>行程起点</div>
                <div>{orderInfo.start_location}</div>
              </li>
              <li>
                <div>行程终点</div>
                <div>{orderInfo.end_location == '' ? '-------' : orderInfo.end_location}</div>
              </li>
              <li>
                <div>行驶里程</div>
                <div>{orderInfo.mileage == null ? '' : `${orderInfo.mileage}公里`}</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }

}