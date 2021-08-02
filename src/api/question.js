import request from '@/utils/request'

const api = {
  questionList: '/question/question_query',
  questionCreate: '/question/question_create',
  questionUpdate: '/question/question_update',
  questionDelete: '/question/question_delete'
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
    url: api.questionUpdate,
    method: 'put',
    data: parameter
  })
}

export function deleteQuestionList (parameter) {
  return request({
    url: api.questionDelete,
    method: 'delete',
    data: parameter
  })
}
