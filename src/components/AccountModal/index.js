import React from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import styles from './index.less';
import { loginCheck, NewsTips } from '../../utils/utils';
import { connect } from 'dva';

const FormItem = Form.Item;
@connect(({ staff }) => ({

}))
export default class AccountModal extends React.Component {
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
    const { username } = values;
    const { dispatch } = this.props;
    const params = {
      newname: username,
      userid: localStorage.getItem('userid')
    }
    dispatch({
      type: 'user/alterUsername',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === '1') {
        localStorage.setItem('username', username)
        // NewsTips('修改失败', { type: 'error' })
        message.success('修改用户名成功');
        this.closeModal();
      } else {
        // NewsTips('修改失败', { type: 'error' })
        message.success('修改用户名失败');
      }
    })
  }
  checkUsername = (rule, value, callback) => {
    const { dispatch } = this.props;
    const username = localStorage.getItem('username');
    console.log(username, 'username');
    dispatch({
      type: 'user/usernameIsRepeat',
      payload: {
        username,
        newname: value
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() !== '1') {
        callback('该用户名已存在!')
      } else {
        callback()
      }
    })

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
      >
        <div className={styles['wrapper']}>
          <Form
            layout="horizontal"
            ref={this.formRef}
            name="control-ref"
            preserve={false}
            onFinish={this.getValidateValues}
            initialValues={{
              'username': localStorage.getItem('username')
            }}
          >
            <FormItem label="修改用户名" {...fromItemLayout} name="username" rules={[
              {
                required: true,
                message: '用户名不能为空'
              }, {
                validator: this.checkUsername
              }
            ]}>
              <Input></Input>
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