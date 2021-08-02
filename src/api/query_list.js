import request from '@/utils/request'

const api = {
  queryPostList: '/query_list/query_list_query'
}

export default api

export function queryPostsList (parameter) {
  return request({
    url: api.queryPostList,
    method: 'post',
    data: parameter
  })
}
