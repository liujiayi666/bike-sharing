import React from 'react';
import { Button, Card, Table, Form, Input, Select, Pagination, Modal, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import Bind from "lodash-decorators/bind";
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
import zhCN from 'antd/lib/locale/zh_CN';
import { loginCheck } from '../../utils/utils';
@connect(({ city, login, staff, user }) => ({
  opencity: city.opencity,
  userid: login.userid
}))
export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowOpenCity: false,
      provinceList: [],
      cityData: [],
      staffData: [],
      openCityData: [],
      pageSize: 10,
      pageNumber: 1,
      openCityOfProvince: [],
      total: '',
      title: '',
      type: '',
      record: {},
      staffIdArr: []
    };
    this.formRef = React.createRef();
  }
  componentDidMount = () => {
    this.getProvinceList();
    this.findAllStaffs();
    this.getOpenCityList();
  }
  @Bind
  //获取开通城市列表
  getOpenCityList = () => {
    const { dispatch } = this.props;
    const { pageSize, pageNumber } = this.state;
    dispatch({
      type: "city/getOpenCityList",
      payload: {
        pageSize,
        pageNumber
      }
    }).then(res => {
      if (res.code.toString() === "1") {
        this.setState({
          openCityData: res.data.openCityData,
          total: res.data.total
        })
      }
    })
  }
  @Bind
  //获取省份列表
  getProvinceList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'city/getProvinceList',
      payload: {}
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        this.setState({
          provinceList: res.data
        })
      } else {
        return
      }
    })
  }
  @Bind
  //获取对应城市列表  开通城市时 使用  是没有开通的城市
  getCityList = (pid) => {
    const { dispatch } = this.props
    dispatch({
      type: 'city/getCityList',
      payload: {
        pid
      }
    }).then(res => {
      console.log(res);
      loginCheck(res);
      if (res.code.toString() === "1") {
        this.setState({
          cityData: res.data
        })
      } else {
        return
      }
    })
  }

  @Bind
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
      console.log(res);
      if (res.code.toString() === "1") {
        loginCheck(res);
        this.setState({
          openCityOfProvince: res.data
        })
      } else {
        return
      }
    })
  }

  @Bind
  //查询所有城市管理员
  findAllStaffs = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'staff/findAllStaffs',
      payload: {}
    }).then(res => {
      console.log(res);
      if (res.code.toString() === "1") {
        loginCheck(res);
        this.setState({
          staffData: res.data.staffData
        })
      } else {
        return;
      }
    })

  }

  //页码改变
  onPageChange = (pageNumber, pageSize) => {
    this.setState({
      pageNumber,
      pageSize
    }, () => {
      this.getOpenCityList();
    })
  }

  onShowSizeChange = (pageNumber, pageSize) => {
    this.setState({
      pageNumber,
      pageSize
    }, () => {
      this.getOpenCityList();
    })
  }
  //点击开通按钮
  handleClick = () => {
    this.setState({
      isShowOpenCity: true,
      title: '开通城市',
      type: 'open'
    })
  }

  //提交开通城市表单
  getValidateValues = async () => {
    console.log('开通');
    const form = this.formRef.current;
    await form.validateFields();
    const values = form.getFieldsValue();
    // const { city_id, business_model, use_model } = values;
    //保存获取到的数据到后台 提示成功
    const { dispatch } = this.props;
    const {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode,
      manage_staffid
    } = values;
    console.log(values);
    //获取当前登录者id
    const operator_id = localStorage.getItem("userid");
    const params = {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode,
      operator_id,
      manage_staffid
    }
    // const staffids = manage_staffid.split(',');
    dispatch({
      type: 'city/addOpenCity',
      payload: {
        params
      }
    }).then((res) => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        message.success('城市开通成功');
        this.setState({
          isShowOpenCity: false
        }, () => {
          this.getOpenCityList();
        })
        dispatch({
          type: 'city/updateCityStatus',
          payload: {
            cid: res.data.cityid
          }
        }).then(res => {
          if (res.code.toString() === "1") {
            dispatch({
              type: 'staff/updateStaffOfCity',
              payload: {
                cid,
                staffids: params.manage_staffid
              }
            })
          } else return
        })

      } else {
        message.error('保存失败')
      }
    })

  }

  @Bind
  //重置表单
  resetValues = () => {
    const form = this.formRef.current;
    form.resetFields();
  }
  //查询 findOpenCity
  @Bind
  handleSubmit = () => {
    const { pageSize, pageNumber } = this.state;
    const form = this.formRef.current;
    form.validateFields();
    const values = form.getFieldsValue();
    const {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode
    } = values;
    console.log(cid, 'cid');
    const { dispatch } = this.props;
    dispatch({
      type: 'city/findOpenCity',
      payload: {
        pid,
        cid,
        bike_modelcode,
        business_modelcode,
        league_accreditcode,
        pageSize,
        pageNumber
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        this.setState({
          openCityData: res.data.findData,
          total: res.data.total
        })
      }
    })
    // findOpenCity
  }
  //查询城市名称
  @Bind
  findCityName = (cid) => {
    console.log(cid, 'cid');
    const { dispatch } = this.props;
    dispatch({
      type: "city/findCityName",
      payload: {
        cid
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        console.log(res.data.city);
        return res.data.city
      } else {
        return;
      }
    })
  }
  @Bind
  //根据操作者id 查找名字
  findUsernameById = (operator_id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/findUsernameById',
      payload: {
        operator_id
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() === "1") {
        return res.data.username
      }
    })
  }
  @Bind
  //编辑城市信息
  editOpenCity = (record) => {
    console.log('编辑');
    const { dispatch } = this.props
    this.setState({
      isShowOpenCity: true,
      title: '编辑城市',
      type: 'edit',
      record
    })
    //根据cid查找城市管理员的id 
    dispatch({
      type: 'city/findStaffsIdByCid',
      payload: {
        cid: record.cid
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() == "1") {
        this.setState({
          record: {
            ...record,
            staffIdArr: res.data.staffids
          }
        })
      }
    })

  }
  //编辑开通城市信息
  editSubmit = () => {
    console.log('编辑');
    const form = this.formRef.current;
    form.validateFields();
    const values = form.getFieldsValue();
    const { dispatch } = this.props;
    const {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode,
      manage_staffid
    } = values;
    const operator_id = localStorage.getItem("userid");
    const params = {
      pid,
      cid,
      bike_modelcode,
      business_modelcode,
      league_accreditcode,
      operator_id,
      manage_staffid
    }
    console.log(params);
    console.log('---');
    //根据id 查找名字
    dispatch({
      type: 'city/updateOpenCityInfo',
      payload: {
        params
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() == "1") {
        this.setState({
          isShowOpenCity: false,
        }, () => {
          this.getOpenCityList()
        })
      } else {
        return
      }
    })
  }
  @Bind
  confirm = (record) => {
    console.log(record);
    const { dispatch } = this.props;
    dispatch({
      type: 'city/closeCity',
      payload: {
        cid: record.cid
      }
    }).then(res => {
      loginCheck(res);
      if (res.code.toString() == '1') {
        this.getOpenCityList()
      } else {
        return
      }
    })
  }
  render() {
    const {
      provinceList,
      cityData,
      staffData,
      pageNumber,
      pageSize,
      openCityData,
      openCityOfProvince,
      total,
      title,
      type,
      record
    } = this.state;
    const columns = [
      {
        title: '城市名称',
        dataIndex: 'city',
        width: 110,
        render: (text, record) => {
          //根据cid  查询城市名称
          return (<a> {text}</a >)
        }
      },
      {
        title: '用车模式',
        dataIndex: 'bike_modelcode',
        width: 140,
        render: (text, record) => {
          return text === 0 ? '指定停车点模式' : '禁停区模式'
        }
      },
      {
        title: '运营模式',
        dataIndex: 'business_modelcode',
        width: 80,
        render: (text, record) => {
          return text === 1 ? '自营' : '加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'league_accreditcode',
        width: 80,
        render: (text, record) => {
          return text === 0 ? '授权' : '未授权'
        }
      },
      {
        title: '城市管理员',
        dataIndex: 'manage_names',
        width: 120,
        render: (text, record) => {
          return (<a>{text}</a>)
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
        width: 200,
        render: (text, record) => {
          return (<a>{text.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')}</a>)
        }
      },
      {
        title: '操作人',
        dataIndex: 'username',
        width: 100,
        render: (text, record) => {
          return (<a > {text}</a>)
        }
      },
      {
        title: '操作',
        width: 100,
        render: (text, record) => {
          return (
            <div className={styles['edit-wapper']}>
              <a onClick={() => this.editOpenCity(record)} >编辑</a>
              <Popconfirm
                title="确定关闭该城市吗?"
                onConfirm={() => this.confirm(record)}
                okText="确定"
                cancelText="取消"
              >
                <a>关闭</a>
              </Popconfirm>
            </div>
          )
        }
      }
    ];
    const pagination = {
      pageSize,
      pageNumber,
      showSizeChanger: true,
      showQuickJumper: true,
      total,
      pageSizeOptions: ["5", "10", "15", "20"],
      showTotal: () => `总共 ${total} 条`,
      onChange: this.onPageChange,
      onShowSizeChange: this.onShowSizeChange
    }
    const fromItemLayout = {
      labelCol: {
        span: 5,
        offset: 2
      },
      wrapperCol: {
        span: 10,
        offset: 1
      }
    }
    return (
      <div className={styles["wrap"]}>
        <Card className="cards_wrap">
          <Form
            layout="inline"
            ref={this.formRef}
            onFinish={this.handleSubmit}
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
              <Select style={{ width: 115 }} >
                {openCityOfProvince.map(item => {
                  return (<Option value={item.cid}>{item.city}</Option>)
                })}
                {openCityOfProvince.length > 0 ? (<Option value="-1">全部</Option>) : ''}

              </Select>
            </FormItem>
            <FormItem label="用车模式" name="bike_modelcode" rules={[
              {
                required: true,
                message: '请选择用车模式'
              }
            ]}>
              <Select style={{ width: 135 }}>
                <Option value="0">指定停车点模式</Option>
                <Option value="1">禁停区模式</Option>
                <Option value="2">全部</Option>
              </Select>
            </FormItem>
            <FormItem label="营业模式" name="business_modelcode" rules={[
              {
                required: true,
                message: '请选择营业模式'
              }
            ]}>
              <Select style={{ width: 85 }}>
                <Option value="0">加盟</Option>
                <Option value="1">自营</Option>
                <Option value="2">全部</Option>
              </Select>
            </FormItem>
            <FormItem label="加盟商授权状态" name="league_accreditcode" rules={[
              {
                required: true,
                message: '请选择加盟商授权状态'
              }
            ]}>
              <Select style={{ width: 85 }}>
                <Option value="0">授权</Option>
                <Option value="1">未授权</Option>
                <Option value="2">全部</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" style={{ margin: '0 24px' }} htmlType="submit">查询</Button>
              <Button onClick={() => this.resetValues()} > 重置</Button>
            </FormItem>
          </ Form >
        </Card>
        <Card>
          <Button
            type="primary"
            style={{ marginBottom: 15 }}
            onClick={this.handleClick}
          >开通城市</Button>
          <Table
            columns={columns}
            dataSource={openCityData}
            bordered
            pagination={pagination}
          />
        </Card>
        <Modal
          title={title}
          visible={this.state.isShowOpenCity}
          destroyOnClose
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          footer={null}
        >
          <Form
            layout="horizontal"
            ref={this.formRef}
            name="control-ref"
            preserve={false}
            onFinish={type == 'edit' ? this.editSubmit : this.getValidateValues}
            initialValues={{
              'pid': type == "open" ? '' : record.pid,
              'cid': type == "open" ? '' : record.cid,
              'bike_modelcode': type == "open" ? '' : record.bike_modelcode,
              'business_modelcode': type == "open" ? '' : record.business_modelcode,
              'league_accreditcode': type == "open" ? '' : record.league_accreditcode,
              'manage_staffid': type == "open" ? [] : record.staffIdArr
            }}
          >
            <FormItem label="选择省份" {...fromItemLayout} name="pid" rules={[
              {
                required: true,
                message: '请选择省份'
              }
            ]}>
              {type == 'open' ? (<Select onSelect={(value) => this.getCityList(value)}>
                {provinceList.map(item => {
                  return (<Option value={item.pid}>{item.province_name}</Option>)
                })}
              </Select>) :
                (
                  <Select defaultValue={record.pid} value={record.pid} disabled >
                    <Option value={record.pid} >{record.provincename}</Option>
                  </Select>
                )}

            </FormItem>
            <FormItem label="选择城市"  {...fromItemLayout} name="cid" rules={[
              {
                required: true,
                message: '请选择城市'
              }
            ]}>
              {type == 'open' ? (<Select style={{ width: 85 }}>
                {cityData.map(item => {
                  return (<Option value={item.cid}>{item.city}</Option>)
                })}
              </Select>) :
                (
                  <Select defaultValue={record.cid} value={record.cid} disabled>
                    <Option value={record.cid} >{record.city}</Option>
                  </Select>
                )}

            </FormItem>
            <FormItem label="用车模式" {...fromItemLayout} name="bike_modelcode" rules={[
              {
                required: true,
                message: '请选择内容'
              }
            ]} >
              <Select>
                <Option value={0}>指定停车点模式</Option>
                <Option value={1}>禁停区模式</Option>
              </Select>
            </FormItem>
            <FormItem label="运营模式" {...fromItemLayout} name="business_modelcode" rules={[
              {
                required: true,
                message: '请选择内容'
              }
            ]}>
              <Select>
                <Option value={1}>自营</Option>
                <Option value={0}>加盟</Option>
              </Select>
            </FormItem>
            <FormItem label="加盟商授权状态" {...fromItemLayout} name="league_accreditcode" rules={[
              {
                required: true,
                message: '请选择内容'
              }
            ]}>
              <Select style={{ width: 85 }}>
                <Option value={0}>授权</Option>
                <Option value={1}>未授权</Option>
              </Select>
            </FormItem>
            <FormItem label="城市管理员" {...fromItemLayout} name="manage_staffid" rules={[
              {
                required: true,
                message: '请选择内容'
              }
            ]} >
              <Select
                mode="tags"
              >
                {staffData.map(item => {
                  return (<Option value={item.staff_id}>{item.staff_name}</Option>)
                })}
              </Select>
            </FormItem>
            <FormItem>
              <div className={styles['button-wrapper']}>
                <Button style={{ margin: '0 24px' }} onClick={() => {
                  this.setState({
                    isShowOpenCity: false
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


