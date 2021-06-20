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
      <a-form-model v-if="model" :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-model-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-model="model.id" disabled />
        </a-form-model-item>
        <a-form-model-item label="头像">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :data="{ 'id': userId }"
            action="/admin/upload/uploadAvatar"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="model.avatar" :src="'http://localhost:9501/' + model.avatar" alt="avatar" />
            <div v-else>
              <a-icon :type="upload_loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="名称">
          <span slot="label">
            name&nbsp;
            <a-tooltip title="这里输入的昵称将展示给所有人！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model="model.name"/>
        </a-form-model-item>
        <a-form-model-item label="用户名">
          <span slot="label">
            Nickname&nbsp;
            <a-tooltip title="这里输入的用户名是你的唯一uid！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model="model.username"/>
        </a-form-model-item>
        <a-form-model-item label="邮箱">
          <a-input v-model="model.email"/>
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="model.telephone" style="width: 100%" >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="model.password" type="password" />
        </a-form-model-item>
        <a-form-model-item label="用户角色">
          <a-select v-model="model.user_role" style="width: 200px">
            <a-select-option v-for="k in roleList" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="ip">
          <a-input v-model="model.ip" />
        </a-form-model-item>
        <a-form-model-item label="启用">
          <a-switch v-model="model.check" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getRoleList } from '@/api/role'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// 表单字段
const fields = ['id', 'avatar', 'name', 'username', 'email', 'telephone', 'password', 'ip', 'user_role', 'check', 'updated_at']

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
      userId: null,
      roleList: {},
      confirmDirty: false,
      upload_loading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.handleRole()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.userId = this.model.id
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    async handleRole () {
      const roleLists = await getRoleList()
      this.roleList = roleLists.result.data
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.upload_loading = true
        return
      }
      const res = info.file.response
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.model.avatar = imageUrl
          if (res.code !== 200) {
            this.$message.error(res.message)
            return []
          }
          this.$message.info(res.message)
          this.upload_loading = false
        })
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
    }
  }
}
</script>
