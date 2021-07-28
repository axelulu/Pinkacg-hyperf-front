<template>
  <a-modal
    title="附件编辑"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handOk"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref='ruleForm'
        :rules="rules"
        v-if="model"
        :model="model"
        v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-model-item
          v-show="model && model.id > 0"
          label="主键ID">
          <a-input v-model="model.id" disabled />
        </a-form-model-item>
        <a-form-model-item
          prop='cat'
          label="文件分类">
          <a-select v-model="model.cat" style="width: 200px">
            <a-select-option v-for='(v, k) in topAttachmentCat' :key='k' :value="v.slug">
              {{ v.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='user_id'
          label="附件作者">
          <a-select v-model="model.user_id" style="width: 200px">
            <a-select-option v-for="k in postAuthor" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='post_id'
          label="所属文章">
          <a-select v-model="model.post_id" style="width: 200px">
            <a-select-option v-for="k in commentPost" :key="k.id" :value="k.id">
              {{ k.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop='header_img'
          label="附件上传">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="getUploadPostImg"
          >
            <img width='200px' v-if="model.path || header_img" :src="header_img ? getImg(header_img) : getImg(model.path + model.filename + '.' + model.type)" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import QuillEditor from '@/components/Editor/QuillEditor'
import { getUserList } from '@/api/user'
import { getImg } from '@/utils/util'
import { uploadImgFile } from '@/api/upload'
import { getAttachmentCatList } from '@/api/attachmentCat'
import { getPostList } from '@/api/post'

// 表单字段
const fields = ['id', 'newFile', 'title', 'user_id', 'post_id', 'size', 'cat', 'type', 'path', 'filename', 'original_name', 'updated_at']

export default {
  components: {
    QuillEditor
  },
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
      default: () => false
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
      rules: {
        cat: [{ required: true, message: '请输入文件分类！' }],
        post_id: [{ required: true, message: '请输入文章id！' }],
        user_id: [{ required: true, message: '请输入文件作者id！' }]
      },
      header_img: '',
      topAttachmentCat: {},
      commentPost: {},
      postAuthor: {},
      form: this.$form.createForm(this),
      getImg
    }
  },
  created () {
    this.PostAuthor()
    this.CommentPost()
    this.loadTopAttachmentCat()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.PostAuthor()
      this.CommentPost()
      this.loadTopAttachmentCat()
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
    handOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.setFieldsValue(this.model)
          this.$emit('ok')
        } else {
          this.$message.error('请输入完整数据！')
          return false
        }
      })
    },
    getUploadPostImg (info) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      formData.append('id', this.model.id)
      // 开始上传
      this.upload_loading = true
      uploadImgFile(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          that.upload_loading = false
          return []
        }
        that.header_img = res.result.link
        that.model.newFile = res.result.data
        console.log(that.model)
        that.form.setFieldsValue(that.model)
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
    async PostAuthor () {
      const that = this
      await getUserList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postAuthor = res.result.data
        })
    }
  }
}
</script>
