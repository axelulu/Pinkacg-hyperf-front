<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form-model
        :model="site_footer"
        :rules="rules"
        ref='cmsForm'>
        <a-form-model-item
          prop='link'
          label="底部链接"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入底部链接！"
            v-model='site_footer.link'/>
        </a-form-model-item>
        <a-form-model-item
          prop='notice'
          label="网站声明"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站声明！"
            v-model='site_footer.notice'/>
        </a-form-model-item>
        <a-form-model-item
          prop='about'
          label="网站关于我们"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站关于我们！"
            v-model='site_footer.about'/>
        </a-form-model-item>
        <a-form-model-item
          prop='connect'
          label="网站联系我们"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站联系我们！"
            v-model='site_footer.connect'/>
        </a-form-model-item>
        <a-form-model-item
          prop='footer'
          label="网站联系我们"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站联系我们！"
            v-model='site_footer.footer'/>
        </a-form-model-item>
        <a-form-model-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button @click='handleSubmit' htmlType="submit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getSettingList, updateSettingList } from '@/api/setting'

export default {
  name: 'BaseForm',
  data () {
    return {
      rules: {
        link: [{ required: true, message: '请输入底部链接！' }],
        notice: [{ required: true, message: '请输入声明！' }],
        about: [{ required: true, message: '请输入关于我们！' }],
        footer: [{ required: true, message: '请输入底部版权信息！' }],
        connect: [{ required: true, message: '请输入联系我们！' }]
      },
      'site_footer': {},
      'upload_loading': false
    }
  },
  created () {
    this.getSetting()
  },
  methods: {
    async getSetting () {
      const that = this
      await getSettingList({
        'site': 'site_footer'
      }).then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        this.site_footer = res.result.data[0].value
      })
    },
    handleSubmit () {
      const that = this
      this.$refs.cmsForm.validate(valid => {
        if (valid) {
          const data = {
            'name': 'site_footer',
            'value': this.site_footer
          }
          updateSettingList(data).then(res => {
            res.code === 200 ? that.$message.success(res.message) : that.$message.error(res.message)
          })
        }
      })
    }
  }
}
</script>
