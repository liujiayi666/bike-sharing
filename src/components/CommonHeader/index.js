import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import LogoSvg from '../../../public/logo-ant.svg';
import { connect } from 'dva';
import { loginCheck } from '../../utils/utils';
@connect(({ staff }) => ({

}))
export default class CommonHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLoginout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/loginout',
      payload: {}
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() == '1') {
        dispatch(
          routerRedux.push({
            pathname: '/login'
          })
        )
      }
    })
  }
  render() {
    return (
      <Row className="simple-top">
        <Col span="6">
          <div className="logo">
            <img src={LogoSvg} alt="logo" title="首页" />
            <h1>共享单车管理平台</h1>
          </div>
        </Col>
        <Col span="18">
          <div className="login-message">
            <span>欢迎,{localStorage.getItem('username')} </span>
            <a onClick={this.handleLoginout}>退出登录</a>
          </div>
        </Col>
      </Row>
    )
  }
}
