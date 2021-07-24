<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form-model
        :model="site_meta"
        :rules="rules"
        ref='cmsForm'>
        <a-form-model-item
          prop='web_name'
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-model='site_meta.web_name'
            name="web_name"
            placeholder="请输入网站标题！"/>
        </a-form-model-item>
        <a-form-model-item
          prop='post_id'
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label="系统附件保存路径">
          <a-select v-model="site_meta.system_attachment" style="width: 200px">
            <a-select-option v-for="k in topAttachmentCat" :key="k.id" :value="k.slug">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='post_id'
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label="用户附件保存路径">
          <a-select v-model="site_meta.user_attachment" style="width: 200px">
            <a-select-option v-for="k in topAttachmentCat" :key="k.id" :value="k.slug">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='post_id'
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label="文章附件保存路径">
          <a-select v-model="site_meta.post_attachment" style="width: 200px">
            <a-select-option v-for="k in topAttachmentCat" :key="k.id" :value="k.slug">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='question_role'
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label="答题后设置的角色">
          <a-select v-model="site_meta.question_role" style="width: 200px">
            <a-select-option v-for="k in roleList" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label="网站logo"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="value => getUploadSiteMeta(value, 'logo')"
          >
            <img style='height: 150px' prop='logo' v-if="site_meta.logo" :src="getImg(site_meta.logo)" alt="avatar" />
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
            :before-upload="beforeUpload"
            :customRequest="value => getUploadSiteMeta(value, 'header_img')"
          >
            <img style='width: 600px' prop='header_img' v-if="site_meta.header_img" :src="getImg(site_meta.header_img)" alt="avatar" />
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
            v-model='site_meta.seo_title'/>
        </a-form-model-item>
        <a-form-model-item
          prop='seo_description'
          label="网站描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站描述！"
            v-model='site_meta.seo_description'/>
        </a-form-model-item>
        <a-form-model-item
          prop='seo_keywords'
          label="网站关键词"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            rows="4"
            placeholder="请输入网站关键词！"
            v-model='site_meta.seo_keywords'/>
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
import { getAttachmentCatList } from '@/api/attachmentCat'
import { getImg } from '@/utils/util'
import { uploadSiteMeta } from '@/api/upload'
import { getRoleList } from '@/api/role'

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
      'roleList': [],
      'site_meta': {},
      'topAttachmentCat': {},
      'upload_loading': false,
      getImg
    }
  },
  created () {
    this.getRole()
    this.getSetting()
    this.loadTopAttachmentCat()
  },
  methods: {
    async getRole () {
      const roleLists = await getRoleList()
      this.roleList = roleLists.result.data
    },
    async loadTopAttachmentCat () {
      const that = this
      await getAttachmentCatList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          that.topAttachmentCat = res.result.data
          console.log(that.topAttachmentCat)
        })
    },
    async getSetting () {
      const that = this
      await getSettingList({
        'name': 'site_meta'
      }).then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        this.site_meta = res.result.data[0].value
      })
    },
    getUploadSiteMeta (info, value) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      formData.append('id', 0)
      formData.append('user_id', 0)
      formData.append('post_id', 0)
      // 开始上传
      this.upload_loading = true
      uploadSiteMeta(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          that.upload_loading = false
          return []
        }
        that.site_meta[value] = res.result.link
        that.$message.success(res.message)
        that.upload_loading = false
      })
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
            'name': 'site_meta',
            'value': this.site_meta
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
