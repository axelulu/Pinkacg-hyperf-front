<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form-model
        :model="site_setting"
        :rules="rules"
        ref='cmsForm'>
        <a-form-model-item
          prop='web_name'
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-model='site_setting.web_name'
            name="web_name"
            placeholder="请输入网站标题！"/>
        </a-form-model-item>
        <a-form-model-item
          label="网站logo"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/admin/upload/uploadSiteMeta"
            :data='{ "id": 1 }'
            :before-upload="beforeUpload"
            @change="value => handleChange(value, 'logo')"
          >
            <img style='height: 150px' prop='logo' v-if="site_setting.logo" :src="'http://localhost:9501/' + site_setting.logo" alt="avatar" />
            <div v-else>
              <a-icon :type="upload_loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item
          label="网站头部图片"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/admin/upload/uploadSiteMeta"
            :data='{ "id": 1 }'
            :before-upload="beforeUpload"
            @change="value => handleChange(value, 'header_img')"
          >
            <img style='width: 600px' prop='header_img' v-if="site_setting.header_img" :src="'http://localhost:9501/' + site_setting.header_img" alt="avatar" />
            <div v-else>
              <a-icon :type="upload_loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item
          prop='seo_title'
          label="网站名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            placeholder="请输入网站名称！"
            v-model='site_setting.seo_title'/>
        </a-form-model-item>
        <a-form-model-item
          prop='seo_description'
          label="网站描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站描述！"
            v-model='site_setting.seo_description'/>
        </a-form-model-item>
        <a-form-model-item
          prop='seo_keywords'
          label="网站关键词"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站关键词！"
            v-model='site_setting.seo_keywords'/>
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
        cms: [{ required: true, message: '请输入文章作者！' }],
        logo: [{ required: true, message: '请输入文章作者！' }],
        seo_title: [{ required: true, message: '请输入文章作者！' }],
        seo_description: [{ required: true, message: '请输入文章作者！' }],
        seo_keywords: [{ required: true, message: '请输入文章作者！' }]
      },
      'site_setting': {},
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
        'site': 'site_setting'
      }).then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        this.site_setting = res.result.data[0].value
      })
    },
    handleChange (info, value) {
      if (info.file.status === 'uploading') {
        this.upload_loading = true
        return
      }
      const res = info.file.response
      if (info.file.status === 'done') {
        this.site_setting[value] = res.result.link
        if (res.code !== 200) {
          this.$message.error(res.message)
          return []
        }
        this.$message.info(res.message)
        this.upload_loading = false
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('你只能上传jpep与png文件!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大于2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleSubmit () {
      const that = this
      this.$refs.cmsForm.validate(valid => {
        if (valid) {
          const data = {
            'name': 'site_setting',
            'value': this.site_setting
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
