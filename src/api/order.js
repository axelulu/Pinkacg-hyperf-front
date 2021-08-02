import request from '@/utils/request'

const api = {
  orderList: '/order/order_query',
  orderCreate: '/order/order_create',
  orderUpdate: '/order/order_update',
  orderDelete: '/order/order_delete'
}

export default api

export function getOrderList (parameter) {
  return request({
    url: api.orderList,
    method: 'get',
    params: parameter
  })
}

export function createOrderList (parameter) {
  return request({
    url: api.orderCreate,
    method: 'post',
    data: parameter
  })
}

export function updateOrderList (parameter) {
  return request({
    url: api.orderUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteOrderList (parameter) {
  return request({
    url: api.orderDelete,
    method: 'delete',
    data: parameter
  })
}
