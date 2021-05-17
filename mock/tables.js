import mockjs from 'mockjs';

export default {
  'GET /admin/tables': (req, res) => {
    res.send(mockjs.mock({
      code: "1",
      status: "200",
      "data|30": [
        {
          "id|+1": 0,
          "username": '@cname',
          "sex|1-2": 1,
          "state|1-4": 1,
          "hobbies|1-6": 1,
          birthday: '2020-01-01',
          address: '北京市',
          time: '09:00',
          "key|+1": 0
        }
      ],
      message: "成功"
    }))
  }
}