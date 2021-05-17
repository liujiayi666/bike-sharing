import React from 'react';
import { Row, Col, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import CommonHeader from '../components/CommonHeader';
import { connect } from 'dva';

@connect(({ login }) => ({
  username: login.username
}))
class Common extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { username } = this.props
    return (
      <ConfigProvider locale={zhCN}>
        <Row className="simple-page" >
          <CommonHeader username={username} />
        </Row >
        <Row className="content">
          {this.props.children}
        </Row>
      </ConfigProvider>
    )
  }
}
export default Common;