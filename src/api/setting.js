import request from '@/utils/request'

export function getSettingList (parameter) {
  return request({
    url: '/' + parameter.name,
    method: 'get'
  })
}

export function updateSettingList (parameter) {
  return request({
    url: '/' + parameter.name,
    method: 'put',
    data: parameter
  })
}
