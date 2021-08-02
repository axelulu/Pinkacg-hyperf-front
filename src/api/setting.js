import request from '@/utils/request'

export function getSettingList (parameter) {
  return request({
    url: '/setting/' + parameter.name + '/setting_query',
    method: 'get',
    params: parameter
  })
}

export function updateSettingList (parameter) {
  return request({
    url: '/setting/' + parameter.name + '/setting_update',
    method: 'put',
    data: parameter
  })
}

export function getColumnList (parameter) {
  return request({
    url: '/tool/getColumnList',
    method: 'post',
    data: parameter
  })
}
