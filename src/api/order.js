import request from '@/utils/request'

const api = {
  orderList: '/order/index',
  orderCreate: '/order/create',
  orderUpdate: '/order/update',
  orderDelete: '/order/delete'
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
    url: api.orderUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteOrderList (parameter) {
  return request({
    url: api.orderDelete + '/' + parameter.id,
    method: 'delete'
  })
}
