import mockjs from 'mockjs';

export default {
  //获取用户信息列表
  'GET /admin/user': (req, res) => {
    const query = req.query;
    let arr = [[], [], [], [], [], []];
    for (let i = 1; i <= 6; i++) {
      arr[i] = mockjs.mock({
        'list|10': [{
          'user_id|+1': 1001,
          'username': '@cname',
          'sex|1-2': 1,
          'status|1-2': 1,
          'hobbies|1-5': 3,
          'birthday': '@date("yyyy-MM-dd")',
          'address': '@county(true)',
          'phonenumber': /1[0-9]{10}/,
          'entry_time': '@date("yyyy-MM-dd")',
          'key|+1': 1
        }]
      })
    }
    res.send({
      'code': '1',
      'data': {
        'page': query.pageNumber,
        'pageSize': query.pageSize,
        'total': 60,
        'list': arr[query.pageNumber].list
      },
      message: '成功'
    })
  },
  //查询用户
  'GET /admin/user_detail': (req, res) => {
    res.send({
      code: '1',
      data: "",
      message: '查询成功'
    })
  },
  //新增员工
  'POST /admin/add_user': (req, res) => {
    const params = req.body;
    console.log(params);
    console.log(req);
    res.send({
      code: '1',
      data: "",
      message: '添加成功'
    })
  },
  //编辑员工
  'PUT /admin/editor_user': (req, res) => {
    const params = req.body;
    console.log(params);
    console.log(req);
    res.send({
      code: '1',
      data: "",
      message: '修改成功'
    })
  },
  //查看员工详情

  //删除员工
  'DELETE /admin/delete_user': (req, res) => {
    const params = req.body;
    console.log(params);
    console.log(req);
    res.send({
      code: '1',
      data: "",
      message: '删除成功'
    })
  }
}