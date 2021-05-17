import React from 'react';
import { Row, Col, Modal } from 'antd';
import './index.less';
import * as Util from '../../utils/utils';
import { loginCheck } from '../../utils/utils';
import { connect, routerRedux } from 'dva';
import AccountModal from '../AccountModal';
import PasswordModal from '../PasswordModal'

@connect(({ login }) => ({
  userid: login.userid
}))
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sysTime: '',
      isShowAccountModal: false,
      isShowPasswordModal: false,
      title: ''
    }
  }
  componentWillMount() {
    var timer = '';
    clearTimeout(timer);
    timer = setInterval(() => {
      var sysTime = Util.formatDate(new Date().getTime());
      this.setState({
        sysTime
      })
    }, 1000)
  }
  handleLoginout = () => {
    const { dispatch, userid } = this.props;
    dispatch({
      type: 'login/loginout',
      payload: {
        userid
      }
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
  showModal = () => {
    this.setState({
      isShowOpenModal: true
    })
  }
  handleCancel = () => {
    const { title } = this.state;
    if (title == '账户修改') {
      this.setState({
        isShowAccountModal: false
      })
    } else if (title == '密码修改') {
      this.setState({
        isShowPasswordModal: false
      })
    }

  }
  handleChangeAccount = () => {
    this.setState({
      title: '账户修改',
      isShowAccountModal: true
    })
  }
  handleChangePassword = () => {
    this.setState({
      title: '密码修改',
      isShowPasswordModal: true
    })
  }
  render() {
    // const { username } = this.props;

    const {
      title,
      isShowAccountModal,
      isShowPasswordModal
    } = this.state
    return (
      <div className="header">
        <Row className="header_top">
          <Col className="header_col" span="24">
            <ul>
              <li className='title'>欢迎,{localStorage.getItem('username')}</li>
              <li className='source'>个人资料
                <div className='select'>
                  <p className='item' onClick={this.handleChangeAccount}>账户修改</p>
                  <p className='item' onClick={this.handleChangePassword}>密码修改</p>
                </div>
              </li>
              <li onClick={this.handleLoginout}>退出登录</li>
            </ul>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="24" className="breadcrum_weather">
            <span className="date" >{this.state.sysTime}</span>
          </Col>
        </Row>
        <AccountModal
          title={title}
          isVisible={isShowAccountModal}
          onCancel={this.handleCancel}
        />
        <PasswordModal
          title={title}
          isVisible={isShowPasswordModal}
          onCancel={this.handleCancel}
        >

        </PasswordModal>
      </div >
    )
  }
}