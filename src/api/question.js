import request from '@/utils/request'

const api = {
  questionList: '/question/index',
  questionCreate: '/question/create',
  questionUpdate: '/question/update',
  questionDelete: '/question/delete'
}

export default api

export function getQuestionList (parameter) {
  return request({
    url: api.questionList,
    method: 'get',
    params: parameter
  })
}

export function createQuestionList (parameter) {
  return request({
    url: api.questionCreate,
    method: 'post',
    data: parameter
  })
}

export function updateQuestionList (parameter) {
  return request({
    url: api.questionUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteQuestionList (parameter) {
  return request({
    url: api.questionDelete + '/' + parameter.id,
    method: 'delete'
  })
}
