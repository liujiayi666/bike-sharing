import mockjs from 'mockjs';
export default {
  'GET /admin/open_city': (req, res) => {
    const query = req.query;
    let arr = [[], [], [], [], [], []];
    for (let i = 1; i <= 6; i++) {
      arr[i] = mockjs.mock({
        'list|10': [{
          'city_id|+1': 1,
          'city_name': '@city',
          'use_model|1-2': 1,
          'business_model|1-2': 1,
          'franchisee_authorization_model|1-2': 1,
          'admin|1-2': [{
            'admin_id|+1': 1001,
            'admin_name': '@cname'
          }],
          'open_time': '@datetime',
          'operate_time': '@datetime',
          'operate_user_name': '@cname',
          'key|+1': 1
        }]
      })
    }
    res.send(mockjs.mock({
      code: '1',
      data: {
        'page': query.pageNumber,
        'pageSize': query.pageSize,
        'total': 60,
        'list': arr[query.pageNumber].list
      },
      message: '成功'
    }))
  },
  'PUT /admin/open': (req, res) => {
    res.send({
      code: '1',
      data: "",
      message: 'put成功'
    })
  }
}