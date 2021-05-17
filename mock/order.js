import mockjs from 'mockjs';
export default {
  'GET /admin/order': (req, res) => {
    const query = req.query;
    let arr = [[], [], [], [], [], []];
    for (let i = 1; i <= 6; i++) {
      arr[i] = mockjs.mock({
        'list|10': [{
          'order_id|+1': 1001,
          'car_id|+1': 2020001,
          'user_name': '@cname',
          'phonenumber': /1[0-9]{10}/,
          'mileage|1-200': 100,
          'travel_time': '@date("HH:mm:ss")',
          'status|1-2': 1,
          'begin_time': '@datetime',
          'end_time': '@datetime',
          'order_amount|3-5000': 5,
          'pay_amount|0-5000': 3,
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
  'DELETE /admin/order_cancel': (req, res) => {
    res.send(
      {
        code: '1',
        data: "",
        message: '删除订单成功'
      }
    )
  },
  'GET /admin/order/detail': (req, res) => {
    const query = req.query;
    let arr = [[], [], [], [], [], []];
    for (let i = 0; i <= 5; i++) {
      arr[i] = mockjs.mock({
        'order_id': `100${i + 1}`,
        'car_id': `202000${i + 1}`,
        'start_location': '北京市昌平区回龙观都东大街',
        'end_location': '北京市海淀区奥林匹克公园',
        'city_id': `${i + 1}`,
        'phonenumber': /1[0-9]{10}/,
        'user_name': '@cname',
        'mileage|1-90000': 100,
        'begin_time': '@datetime',
        'end_time': '@datetime',
        'bike_gps': '116.348785，40.382083',
        'total_time': 224,
        'user_model|1-2': 1,
        'position_list': [
          {
            'lon': 116.404,
            'lat': 39.915
          },
          {
            'lon': 116.7542943,
            'lat': 39.543565
          },
          {
            'lon': 116.5634665,
            'lat': 39.78665
          },
          {
            'lon': 116.766532,
            'lat': 39.3652
          },
          {
            'lon': 116.789809,
            'lat': 39.46
          },
          {
            'lon': 116.975635,
            'lat': 39.94343
          }
        ],
        'area': [
          {
            'lon': 116.100,
            'lat': 39.00,
            'ts': null
          },
          {
            'lon': 116.324,
            'lat': 39.1390,
            'ts': null
          },
          {
            'lon': 116.5464,
            'lat': 39.234,
            'ts': null
          },
          {
            'lon': 116.643277,
            'lat': 39.43,
            'ts': null
          },
          {
            'lon': 116.676,
            'lat': 39.89,
            'ts': null
          }
        ]
      })
    }
    var newArr = arr.filter((item) => {
      return item.order_id == query.orderId;
    });
    res.send({
      'code': '1',
      'data': newArr[0],
      message: '成功'
    })
  }

}