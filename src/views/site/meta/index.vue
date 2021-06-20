<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
              'web_name',
              {rules: [{ required: true, message: '网站标题' }]}
            ]"
            name="web_name"
            placeholder="请输入网站标题！"/>
        </a-form-item>
        <a-form-item
          label="网站名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            placeholder="请输入网站名称！"
            v-decorator="[
              'seo_title',
              {rules: [{ required: true, message: '请输入网站名称！' }]}
            ]"/>
        </a-form-item>
        <a-form-item
          label="网站描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站描述！"
            v-decorator="[
              'seo_description',
              {rules: [{ required: true, message: '请输入网站关键词！' }]}
            ]"/>
        </a-form-item>
        <a-form-item
          label="网站关键词"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站关键词！"
            v-decorator="[
              'seo_keywords',
              {rules: [{ required: true, message: '请输入网站关键词！' }]}
            ]"/>
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getSettingList, updateSettingList } from '@/api/setting'

export default {
  name: 'BaseForm',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.getSetting()
  },
  methods: {
    async getSetting () {
      const that = this
      await getSettingList().then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        that.form.setFieldsValue(res.result.data[0].value)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      const that = this
      this.form.validateFields((err, values) => {
        console.log(err)
        const data = {
          'name': 'site_setting',
          'value': values
        }
        console.log(data)
        updateSettingList(data).then(res => {
          res.code === 200 ? that.$message.success(res.message) : that.$message.error(res.message)
        })
      })
    }
  }
}
</script>
