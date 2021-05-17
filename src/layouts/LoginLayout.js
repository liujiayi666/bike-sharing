import React from 'react';
import Bind from "lodash-decorators/bind";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { connect, routerRedux } from 'dva';
import styles from './LoginLayout.less';
import { JSEncrypt } from "jsencrypt";
import { NewsTips } from '../utils/utils';

const FormItem = Form.Item;

@connect(({ login }) => ({
  publicKey: login.publicKey
}))
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getPublicKey()
  }
  @Bind
  getPublicKey() {
    const { dispatch } = this.props;
    dispatch({
      type: "login/getPublicKey",
      payload: {}
    }).then(res => {
      if (res.code.toString() === "1") {
        localStorage.setItem("publicKey", res.data.publicKey)
      } else {
        console.log('错误');
      }
    })
  }
  @Bind
  onFinish = (values) => {
    console.log('tijiao');
    const { publicKey, dispatch } = this.props
    //公钥 加密 
    if (publicKey) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const username = encrypt.encrypt(values.username);
      const password = encrypt.encrypt(values.password);
      console.log(username);
      console.log(password);
      dispatch({
        type: 'login/userLogin',
        payload: {
          username,
          password
        }
      }).then(res => {
        if (res.code.toString() === "1") {
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('userid', res.data.userid)
          dispatch(
            routerRedux.push({
              pathname: '/admin/home',
              state: {
                username: res.data.username
              }
            })
          )
        } else {
          message.error('用户名或密码错误')
          // NewsTips("登录失败", { type: "error" });
        }
      })
    } else {
      NewsTips("请重新刷新页面", { type: "error" });
    }
  }
  @Bind
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //重置
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
  }
  render() {
    return (
      <div className={styles["login-wrapper"]} >
        <Form
          name="login"
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          className={styles["form"]}
        >
          <FormItem
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！'
              }
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！'
              }
            ]}
          >
            <Input.Password />
          </FormItem>
          <FormItem >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button onClick={() => this.resetValues()} className={styles["reset"]} > 重置</Button>
          </FormItem>
        </Form>
      </div >
    )
  }

}
export default Login;