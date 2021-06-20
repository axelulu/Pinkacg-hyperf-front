<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="所属文章">
          <a-select v-decorator="['post_ID', {rules: [{required: true, message: '请输入文章id！'}]}]" style="width: 200px">
            <a-select-option v-for="k in commentPost" :key="k.id" :value="k.id">
              {{ k.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属用户">
          <a-select v-decorator="['user_id', {rules: [{required: true, message: '请输入用户id！'}]}]" style="width: 200px">
            <a-select-option v-for="k in commentUser" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="父评论">
          <a-select v-decorator="['parent', {rules: [{required: true, message: '请输入父评论！'}]}]" style="width: 200px">
            <a-select-option :value="0">
              顶级评论
            </a-select-option>
            <a-select-option v-for="k in comment" :key="k.id" :value="k.id">
              评论id:{{ k.id }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="评论内容">
          <a-textarea
            rows="4"
            placeholder="请输入评论内容！"
            v-decorator="[
              'content',
              {rules: [{ required: true, message: '请输入评论内容！' }]}
            ]"/>
        </a-form-item>
        <a-form-item label="评论喜欢数">
          <a-input-number v-decorator="['like', {rules: [{required: true, message: '请输入评论喜欢数！'}]}]"/>
        </a-form-item>
        <a-form-item label="启用">
          <a-switch v-decorator="['status', { valuePropName: 'checked' }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getPostList } from '@/api/post'
import { getUserList } from '@/api/user'
import { getCommentList } from '@/api/comment'

// 表单字段
const fields = ['id', 'post_ID', 'content', 'parent', 'user_id', 'like', 'status', 'updated_at']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      commentUser: [],
      commentPost: [],
      comment: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.CommentPost()
    this.CommentUser()
    this.Comment()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.CommentPost()
      this.CommentUser()
      this.Comment()
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    async CommentPost () {
      const that = this
      await getPostList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.commentPost = res.result.data
        })
    },
    async CommentUser () {
      const that = this
      await getUserList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.commentUser = res.result.data
        })
    },
    async Comment () {
      const that = this
      await getCommentList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.comment = res.result.data
        })
    }
  }
}
</script>
