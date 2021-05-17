import { Component } from 'react';

export default [
  {
    path: "/admin",
    component: "@/layouts/BasicLayout",
    routes: [
      {
        path: "/admin/city",
        component: '@/pages/city'
      },
      {
        path: "/admin/order",
        component: '@/pages/order'
      },
      {
        path: "/admin/staff",
        component: '@/pages/staff'
      },
      {
        path: "/admin/bikeMap",
        component: '@/pages/bikeMap'
      },
      {
        path: "/admin/home",
        component: '@/pages/home'
      },
      {
        component: "@/pages/nomatch"
      }
    ]
  },
  {
    path: "/common",
    component: "@/layouts/Common",
    routes: [
      {
        path: "/common/order/detail/:order_id",
        component: '@/pages/order/detail'
      },

      {
        component: "@/pages/nomatch"
      }
    ]
  },
  {
    path: '/login',
    component: '@/layouts/LoginLayout'
  }

];
