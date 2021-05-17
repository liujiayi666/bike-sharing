import React from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import styles from './index.less';
import { loginCheck, NewsTips } from '../../utils/utils';
import { connect } from 'dva';
import { JSEncrypt } from "jsencrypt";

const InputPassword = Input.Password;
const FormItem = Form.Item;
@connect(({ user }) => ({

}))
export default class PasswordModal extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef();
  }
  closeModal = () => {
    const { onCancel } = this.props
    onCancel();
  }
  getValidateValues = () => {
    const form = this.formRef.current;
    const values = form.getFieldsValue();
    // const { password, newpassword } = values;
    const userid = localStorage.getItem('userid')
    const publicKey = localStorage.getItem('publicKey')
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const passWord = encrypt.encrypt(values.password);
    const newPassword = encrypt.encrypt(values.newpassword);
    const params = {
      passWord,
      newPassword,
      userid
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'user/alterPassword',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === '1') {
        message.success('密码修改成功')
        this.closeModal();
      } else {
        message.error('密码不正确')
        form.resetFields();
      }
    })

  }
  passwordIsEqual = (rule, value, callback) => {
    const form = this.formRef.current;
    const values = form.getFieldsValue();
    const { newpassword } = values
    console.log(newpassword);
    if (value === newpassword) {
      callback()
    } else {
      callback('两次密码不一致，请重新输入！')
    }

  }
  render() {
    const fromItemLayout = {
      labelCol: {
        span: 10,
        offset: 0
      },
      wrapperCol: {
        span: 20,
        offset: 1
      }
    }
    const { isVisible, title } = this.props

    return (
      <Modal
        title={title}
        visible={isVisible}
        onCancel={this.closeModal}
        width={400}
        footer={null}
        destroyOnClose
      >
        <div className={styles['wrapper']}>
          <Form
            layout="horizontal"
            ref={this.formRef}
            name="control-ref"
            preserve={false}
            onFinish={this.getValidateValues}
            initialValues={{
              // 'username': localStorage.getItem('username')
            }}
          >
            <FormItem label="原始密码" {...fromItemLayout} name="password" rules={[
              {
                required: true,
                message: '密码不能为空'
              }, {
                validator: this.checkPassword
              }
            ]}>
              <InputPassword></InputPassword>
            </FormItem>
            <FormItem label="新密码" {...fromItemLayout} name="newpassword" rules={[
              {
                required: true,
                message: '请输入新密码'
              }, {
                validator: this.checkPassword
              }, {
                min: 6,
                max: 12,
                message: '请输入6至12位的新密码'
              }
            ]}>
              <InputPassword></InputPassword>
            </FormItem>
            <FormItem label="确认新密码" {...fromItemLayout} name="newpasswordAgain" rules={[
              {
                required: true,
                message: '请输入确认密码'
              }, {
                validator: this.passwordIsEqual
              }
            ]}>
              <InputPassword></InputPassword>
            </FormItem>
            <FormItem>
              <div className={styles['button-wrapper']}>
                <Button type="primary" style={{ margin: '0 24px' }} htmlType="submit">确定</Button>
                <Button style={{ margin: '0 24px' }} onClick={this.closeModal}>取消</Button>
              </div>
            </FormItem>
          </Form>

        </div>

      </Modal >


    )
  }
}