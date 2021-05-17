import React from 'react';
import { Button, Card, Table, Form, Input, Radio, Modal, message, Select, DatePicker, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import { loginCheck, NewsTips } from '../../utils/utils';

@connect(({ staff }) => ({

}))
export default class userManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffListData: [],
      pageSize: 10,
      pageNumber: 1,
      total: '',
      title: '',
      isShowAddStaff: false,
      entry_time: [],
      isNamePass: false,
      isPhonenumberPass: false,
      isIDcardPass: false,
      type: '',
      selectTime: [],
      record: {
        ID_card: "",
        address: "",
        entry_time: "",
        phonenumber: "",
        sex: "",
        staff_id: "",
        staff_name: "",
      }
    }
    this.formRef = React.createRef();

  }
  componentDidMount() {
    this.getStaffList();
  }
  //获取员工数据
  getStaffList = () => {
    const { dispatch } = this.props;
    const { pageSize, pageNumber } = this.state
    dispatch({
      type: 'staff/findAllStaffsOfPaging',
      payload: {
        pageSize,
        pageNumber
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.setState({
          staffListData: res.data.staffData,
          total: res.data.total
        })
      }
    })
  }

  //页码改变
  onPageChange = (pageNumber, pageSize) => {
    this.setState({
      pageNumber,
      pageSize
    }, () => {
      this.getStaffList();
    })
  }
  //size改变
  onShowSizeChange = (pageNumber, pageSize) => {
    this.setState({
      pageNumber,
      pageSize
    }, () => {
      this.getStaffList();
    })
  }

  //查询时 获取时间
  handleSelectTime = (value, dateString) => {
    console.log(value);
    console.log(dateString);
    this.setState({
      selectTime: dateString
    })
  }
  //查询
  handleCheck = () => {
    const { selectTime } = this.state;
    const { dispatch } = this.props;
    const form = this.formRef.current;
    form.validateFields();
    const values = form.getFieldsValue();
    const {
      staff_name,
      sex
    } = values;
    const params = {
      staff_name,
      sex,
      entry_time: selectTime
    }
    dispatch({
      type: 'staff/findStaff',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === '1') {
        this.setState({
          staffListData: res.data.staffData,
          total: res.data.total
        })
      } else {
        return
      }
    })
  }
  //打开模态框
  openModel = () => {
    this.setState({
      isShowAddStaff: true,
      title: '添加员工',
      type: 'add'
    })
  }
  //选择入职时间
  onChange = (date, dateString) => {
    this.setState({
      entry_time: dateString
    })
  }
  //检查名字有没有重复
  validatorName = (rule, value, callback) => {
    const { record } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'staff/isStaffnameRepeat',
      payload: {
        staff_name: value,
        staff_id: record.staff_id
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() !== '1') {
        callback('该名字已存在！')
      } else {
        callback();
      }
    })
  }
  //检查电话号码有没有重复
  validatorPhonenumber = (rule, value, callback) => {
    const { dispatch } = this.props;
    const { record } = this.state;
    dispatch({
      type: 'staff/isStaffPhonenumberRepeat',
      payload: {
        phonenumber: value,
        staff_id: record.staff_id
      }
    }).then(res => {
      loginCheck(res)

      if (res.code.toString() !== '1') {
        callback('该电话号码已存在！')
      } else {
        callback()
      }
    })
  }
  //检查身份证有无重复
  validatorIDcard = (rule, value, callback) => {
    const { dispatch } = this.props;
    const { record } = this.state;
    dispatch({
      type: 'staff/isStaffIDcardRepeat',
      payload: {
        ID_card: value,
        staff_id: record.staff_id
      }
    }).then(res => {
      loginCheck(res)

      if (res.code.toString() !== '1') {
        callback('该身份证号已存在！')
      } else {
        callback()
      }
    })
  }
  //保存添加员工
  saveStaff = () => {
    const form = this.formRef.current;
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    const { dispatch } = this.props;
    const { entry_time } = this.state;
    const {
      staff_name,
      sex,
      phonenumber,
      ID_card,
      address
    } = values;
    const params = {
      staff_name,
      sex,
      phonenumber,
      ID_card,
      address,
      entry_time
    }
    dispatch({
      type: 'staff/addStaff',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)

      if (res.code.toString() == '1') {
        message.success('添加员工成功');
        this.setState({
          isShowAddStaff: false
        }, () => {
          this.getStaffList()
        })
      }
    })

  }
  //重置表单
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
    this.getStaffList()
  }
  //编辑  打开模态框
  openEditModal = (record) => {
    this.setState({
      type: 'edit',
      isShowAddStaff: true,
      record,
      title: "编辑员工"
    })
  }
  //提交编辑
  editStaff = () => {
    const { dispatch } = this.props;
    const { record } = this.state;
    console.log(record);
    console.log('---s');
    const form = this.formRef.current;
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
    const {
      staff_name,
      phonenumber,
      address,
    } = values
    const params = {
      staff_name,
      phonenumber,
      address,
      staff_id: record.staff_id
    }
    dispatch({
      type: 'staff/editStaff',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() === '1') {
        this.setState({
          isShowAddStaff: false
        }, () => {
          this.getStaffList()
        })
      }
    })
  }
  //删除员工
  deleteStaff = (record) => {
    console.log(record);
    const { staff_id, staff_name } = record
    const { dispatch } = this.props;
    dispatch({
      type: "staff/deleteStaff",
      payload: {
        staff_id,
        staff_name
      }
    }).then(res => {
      loginCheck(res)
      if (res.code.toString() == '1') {
        this.getStaffList();
        NewsTips('删除成功', { type: 'success' })
      } else {
        NewsTips('删除失败', { type: 'error' })
      }
    })
  }
  render() {
    const {
      total,
      staffListData,
      title,
      isShowAddStaff,
      type,
      record
    } = this.state
    const columns = [
      {
        title: '员工工号',
        dataIndex: 'staff_id',
        width: 150,
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex: 'staff_name',
        width: 150,
        align: 'center'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 120,
        align: 'center'
      },
      {
        title: '手机号码',
        dataIndex: 'phonenumber',
        align: 'center',
        width: 180
      },
      {
        title: '入职时间',
        dataIndex: 'entry_time',
        width: 250,
        align: 'center',

      },
      {
        title: '现住址',
        dataIndex: 'address',
        align: 'center',

      },
      {
        title: '身份证号码',
        dataIndex: 'ID_card',
        width: 250,
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'ID_card',
        width: 250,
        align: 'center',
        render: (text, record) => {
          return (
            <div className={styles['operate']}>
              <a className={styles['edit']} onClick={() => this.openEditModal(record)}>编辑</a>
              <Popconfirm
                title="确定删除该员工吗?"
                onConfirm={() => { this.deleteStaff(record) }}
                okText="确定"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
            </div >
          )
        }
      }
    ];
    const pagination = {
      defaultCurrent: 1,
      showSizeChanger: true,
      showQuickJumper: true,
      total,
      pageSizeOptions: ["5", "10", "15", "20"],
      showTotal: () => `总共${total}条`,
      onChange: this.onPageChange,
      onShowSizeChange: this.onShowSizeChange
    }
    const fromItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <div className={styles["wrap"]}>
        <Card>
          <Form
            layout="inline"
            ref={this.formRef}
            initialValues={{
              'staff_name': '',
              'sex': '',
              'entry_time': []
            }}
          >
            <FormItem label="员工姓名" style={{ margin: '0 50px' }} name="staff_name" >
              <Input placeholder="请输入查询管理员姓名"></Input>
            </FormItem>
            <FormItem label="性别" style={{ margin: '0 50px' }} name="sex" >
              <Select style={{ width: 85 }}>
                <Option value='男'>男</Option>
                <Option value='女'>女</Option>
                <Option value='-1'>全部</Option>
              </Select>
            </FormItem>
            <FormItem label="入职时间范围" style={{ margin: '0 50px' }} name="entry_time" >
              <RangePicker
                placeholder={['请选择开始时间', '请选择结束时间']}
                onChange={this.handleSelectTime}
                // style={{ width: 400 }}
                format="YYYY-MM-DD">
              </RangePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" style={{ margin: '0 15px' }} onClick={this.handleCheck} htmlType="submit">查询</Button>
            </FormItem>
            <FormItem>
              <Button style={{ margin: '0 15px' }} onClick={this.resetValues}>重置</Button>
            </FormItem>
          </Form>
        </Card>
        <Card>
          <Button type={'primary'} onClick={this.openModel}>添加员工</Button>
          <Table
            columns={columns}
            bordered
            pagination={pagination}
            dataSource={staffListData}
            style={{ marginTop: 20 }}
          />
        </Card>
        <Modal
          title={title}
          visible={isShowAddStaff}
          destroyOnClose
          onCancel={() => {
            this.setState({
              isShowAddStaff: false,
              entry_time: []
            })
          }}
          footer={null}
        >
          <Form
            layout="horizontal"
            ref={this.formRef}
            name="control-ref"
            preserve={false}
            onFinish={type == 'add' ? this.saveStaff : this.editStaff}
            initialValues={{
              'staff_name': type == 'add' ? '' : record.staff_name,
              'sex': type == 'add' ? '' : record.sex,
              'phonenumber': type == 'add' ? '' : record.phonenumber,
              'entry_time': type == 'add' ? '' : moment(record.entry_time),
              'address': type == 'add' ? '' : record.address,
              'ID_card': type == 'add' ? '' : record.ID_card,
            }}
          >
            <FormItem label="姓名" {...fromItemLayout} name="staff_name" rules={[
              {
                required: true,
                message: '请输入员工姓名'
              }, {
                validator: this.validatorName
              }
            ]}>
              <Input placeholder="请输入员工姓名" disabled={type == 'add' ? false : true}></Input>
              {/* <Input placeholder="请输入员工姓名"></Input> */}
            </FormItem>
            <FormItem label="性别"  {...fromItemLayout} name="sex" rules={[
              {
                required: true,
                message: '请选择性别'
              }
            ]}>
              <RadioGroup onChange={this.onChange} disabled={type == 'add' ? false : true}>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="电话号码" {...fromItemLayout} name="phonenumber" rules={[
              {
                required: true,
                message: '请输入电话号码'
              }, {
                validator: this.validatorPhonenumber
              }, {
                pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                message: '请输入正确的手机号'
              }
            ]} >
              <Input placeholder="请输入电话号码"></Input>
            </FormItem>
            <FormItem label="入职时间" {...fromItemLayout} name="entry_time" rules={[
              {
                required: true,
                message: '请选择入职时间'
              }
            ]}>
              <DatePicker
                onChange={this.onChange}
                disabled={type == 'add' ? false : true}
              />
            </FormItem>
            <FormItem label="身份证号码" {...fromItemLayout} name="ID_card" rules={[
              {
                required: true,
                message: '请输入身份证号码'
              }, {
                validator: this.validatorIDcard
              }, {
                len: 18,
                message: '请输入18位身份证号码'
              }
            ]}>
              <Input placeholder="请输入身份证号码" disabled={type == 'add' ? false : true}></Input>
            </FormItem>
            <FormItem label="现住址" {...fromItemLayout} name="address" rules={[
              {
                required: true,
                message: '请输入现住址'
              }
            ]} >
              <Input placeholder="请输入现住址"></Input>
            </FormItem>
            <FormItem>
              <div className={styles['button-wrapper']}>
                <Button style={{ margin: '0 24px' }} onClick={() => {
                  this.setState({
                    isShowAddStaff: false
                  })
                }}>取消</Button>
                <Button type="primary" style={{ margin: '0 24px' }} htmlType="submit">确定</Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div >
    )
  }
}
