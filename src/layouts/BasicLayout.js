import React from 'react';
import { Row, Col, ConfigProvider } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavLeft from '../components/NavLeft';
import '../style/common.less';
import zhCN from 'antd/lib/locale/zh_CN';
import { connect } from 'dva';

@connect(({ login }) => ({
  username: login.username
}))
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabName: ""
    }
  }

  render() {
    const { tabName } = this.state;
    const { username } = this.props
    return (
      <ConfigProvider locale={zhCN}>
        <Row className="container" >
          <Col span={4} className="nav-left" >
            <NavLeft tabName={tabName} />
          </Col>
          <Col span={20} className="main">
            <Header username={username} />
            <Row className="content" style={{ height: '88%' }}>
              {this.props.children}
            </Row>
          </Col>
        </Row >
      </ConfigProvider>
    )
  }
}
export default BasicLayout;