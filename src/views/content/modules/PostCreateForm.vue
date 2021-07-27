<template>
  <a-modal
    title="新建规则"
    :width="1000"
    :visible="visible"
    :confirmLoading="loading"
    @ok="handOk"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="ruleForm"
        :rules="rules"
        v-if="model"
        :model="model"
        v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          v-show="model && model.id > 0"
          label="主键ID">
          <a-input v-model="model.id" disabled />
        </a-form-model-item>
        <a-form-model-item
          prop="author"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章作者">
          <a-select v-model="model.author" style="width: 200px">
            <a-select-option v-for="k in postAuthor" :key="k.id" :value="k.id">
              {{ k.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop="title"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章标题">
          <span slot="label">
            title
            <a-tooltip title="这里输入文章标题！">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-model="model.title"/>
        </a-form-model-item>
        <a-form-model-item
          prop="excerpt"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章摘要">
          <a-textarea
            rows="4"
            placeholder="请输入文章摘要！"
            v-model="model.excerpt"/>
        </a-form-model-item>
        <a-form-model-item
          prop="content"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章内容">
          <quill-editor
            v-model="model.content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
          <a-upload
            list-type="picture"
            :multiple="true"
            :customRequest="getUploadPostImg"
            class="upload-list-inline"
          >
            <a-button> <a-icon class="upload" type="upload" /> upload </a-button>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item
          prop="header_img"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章头图">
          <div style="margin-bottom: 40px;margin-right: 2%;float: left;height: 200px;width: 23%;" v-for="(v, k) in model.content_file" :key="k">
            <img style="width: 100%;height: 100%;" :src="v.url ? getImg(v.url) : getImg(v.path + v.filename + &quot;.&quot; + v.type)"/>
            <div>
              <a-button @click="preview(v)" style="margin: 1px;">插入文章</a-button>
              <a-button v-model="model.header_img" @click="setHeaderImg(v, k)" :type="set_header_img === true ? model.header_img === k ? 'primary' : '' : model.header_img === v.url ? 'primary' : ''" style="margin: 1px;">设为封面</a-button>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="menu"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章菜单">
          <a-cascader
            :options="postCategory"
            v-model="model.menu"
            :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
            change-on-select
            placeholder="请输入："
          />
        </a-form-model-item>
        <a-form-model-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章标签">
          <a-select v-model="model.tag" mode="tags" style="width: 100%" placeholder="请输入标签">
            <a-select-option v-for="(v, k) in postTag" :key="k" :value="v.value">
              {{ v.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop="status"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章状态">
          <a-select v-model="model.status" style="width: 200px">
            <a-select-option value="publish">
              发布
            </a-select-option>
            <a-select-option value="draft">
              草稿
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          prop="type"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章类型">
          <a-select v-model="model.type" style="width: 200px">
            <a-select-option value="post">
              文章
            </a-select-option>
            <a-select-option value="music">
              音乐
            </a-select-option>
            <a-select-option value="video">
              视频
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="model && model.type === 'music'"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="音乐">
          <div v-for="(k, v) in model.music" style="margin-bottom: 20px" :key="v">
            <a-form-model-item
              :prop="`music[${v}].name`"
              :rules="[ { required: true, message: '请输入音乐名称!' }, { min: 10, message: '音乐名称不得小于10字符' }, { max: 100, message: '音乐名称不得超过100字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.name" addon-before="链接名称" placeholder="请输入链接名称！" />
            </a-form-model-item>
            <a-form-model-item
              :prop="`music[${v}].link`"
              :rules="[ { required: true, message: '请输入音乐链接!' }, { min: 10, message: '音乐链接不得小于10字符' }, { max: 100, message: '音乐链接不得超过100字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.link" addon-before="下载链接" placeholder="请输入下载链接！"/>
            </a-form-model-item>
          </div>
          <div style="margin-bottom: 6px">
            <a-button @click="addMusic" style="width: 48%;margin-right: 2%" type="primary" block>
              添加
            </a-button>
            <a-button @click="deleteMusic" style="width: 48%;margin-left: 2%" type="danger" block>
              删除
            </a-button>
          </div>
        </a-form-model-item>
        <a-form-model-item
          v-if="model && model.type === 'video'"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="视频">
          <div v-for="(k, v) in model.video" style="margin-bottom: 20px" :key="v">
            <a-form-model-item
              :prop="`video[${v}].name`"
              :rules="[ { required: true, message: '请输入视频名称!' }, { min: 10, message: '视频名称不得小于10字符' }, { max: 100, message: '视频名称不得超过100字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.name" addon-before="视频名称" placeholder="请输入链接名称！" />
            </a-form-model-item>
            <a-form-model-item
              :prop="`video[${v}].link`"
              :rules="[ { required: true, message: '请输入视频链接!' }, { min: 10, message: '视频链接不得小于10字符' }, { max: 100, message: '视频链接不得超过100字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.link" addon-before="视频链接" style="width: 72%;margin-right: 3%" placeholder="请输入下载链接！"/>
              <a-form-model-item
                :prop="`video[${v}].credit`"
                :rules="[ { required: true, message: '请输入积分!' }]"
              >
                所需积分： <a-input-number v-model="k.credit" placeholder="视频积分" style="margin-right: 3%"/>
              </a-form-model-item>
            </a-form-model-item>
          </div>
          <div style="margin-bottom: 6px">
            <a-button @click="addVideo" style="width: 48%;margin-right: 2%" type="primary" block>
              添加
            </a-button>
            <a-button @click="deleteVideo" style="width: 48%;margin-left: 2%" type="danger" block>
              删除
            </a-button>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="download_status"
          v-if="model && model.download_status"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="下载链接">
          <div v-for="(k, v) in model.download" style="margin-bottom: 20px" :key="v">
            <a-form-model-item
              :prop="`download[${v}].name`"
              :rules="[ { required: true, message: '请输入下载链接标题!' }, { min: 3, message: '下载链接标题不得小于3字符' }, { max: 20, message: '文章标题不得超过20字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.name" addon-before="链接名称" placeholder="请输入链接名称！" />
            </a-form-model-item>
            <a-form-model-item
              :prop="`download[${v}].link`"
              :rules="[ { required: true, message: '请输入下载链接!' }, { min: 10, message: '下载链接不得小于10字符' }, { max: 100, message: '下载链接不得超过100字符' }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.link" addon-before="下载链接" placeholder="请输入下载链接！"/>
            </a-form-model-item>
            <a-form-model-item
              :prop="`download[${v}].credit`"
              :rules="[{ validator: checkCredit }]"
              style="margin-bottom: 6px">
              <a-input v-model="k.pwd" addon-before="提取密码" style="width: 30%;margin-right: 3%" placeholder="提取密码"/>
              <a-input v-model="k.pwd2" addon-before="解压密码" style="width: 30%;margin-right: 3%" placeholder="提取密码"/>
              所需积分： <a-input-number v-model="k.credit" placeholder="下载积分" style="margin-right: 3%"/>
            </a-form-model-item>
          </div>
          <div style="margin-bottom: 6px">
            <a-button @click="addDownload" style="width: 48%;margin-right: 2%" type="primary" block>
              添加
            </a-button>
            <a-button @click="deleteDownload" style="width: 48%;margin-left: 2%" type="danger" block>
              删除
            </a-button>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="comment_status"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="评论状态">
          <a-switch v-model="model.comment_status" />
        </a-form-model-item>
        <a-form-model-item
          prop="download_status"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="开启下载">
          <a-switch @change="downloadStatus" v-model="model.download_status" />
        </a-form-model-item>
        <a-form-model-item
          prop="comment_count"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章评论数">
          <a-input-number v-model="model.comment_count"/>
        </a-form-model-item>
        <a-form-model-item
          prop="views"
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 25} }"
          label="文章浏览量">
          <a-input-number v-model="model.views"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getUserList } from '@/api/user'
import { getTagList } from '@/api/tag'
import { getCategoryList } from '@/api/category'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// import { uploadFile } from '@/api/upload'
import { getImg } from '@/utils/util'
import { uploadFile } from '@/api/upload'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [
    {
      'header': 1
    },
    {
      'header': 2
    }
  ],
  [
    {
      'list': 'ordered'
    },
    {
      'list': 'bullet'
    }
  ],
  [
    {
      'script': 'sub'
    },
    {
      'script': 'super'
    }
  ],
  [
    {
      'indent': '-1'
    },
    {
      'indent': '+1'
    }
  ],
  [
    {
      'direction': 'rtl'
    }
  ],

  [
    {
      'size': ['small', false, 'large', 'huge']
    }
  ],
  [
    {
      'header': [1, 2, 3, 4, 5, 6, false]
    }
  ],

  [
    {
      'color': []
    },
    {
      'background': []
    }
  ],
  [
    {
      'font': []
    }
  ],
  [
    {
      'align': []
    }
  ],
  ['link'],
  ['clean']
]

// 表单字段
const fields = ['id', 'author', 'title', 'content', 'content_file', 'excerpt', 'type', 'status', 'comment_status', 'download_status', 'menu', 'tag', 'guid', 'comment_count', 'download', 'music', 'video', 'header_img', 'views', 'updated_at']

export default {
  components: {
    quillEditor
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
      default: () => {
        return {
          'download': null
        }
      }
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
      content: null,
      editorOption: {
        placeholder: '请在这里输入', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true, // 语法检测
        modules: {
          toolbar: {
            container: toolbarOptions
            // handlers: {
            //   'image': function (value) {
            //     if (value) {
            //       document.querySelector('.upload').click()
            //     } else {
            //       this.quill.format('image', false)
            //     }
            //   }
            // }
          }
        }
      },
      rules: {
        views: [{ required: true, message: '请输入文章浏览量！' }],
        comment_count: [{ required: true, message: '请输入评论数量！' }],
        download_status: [{ required: true, message: '请输入下载状态！' }],
        comment_status: [{ required: true, message: '请输入评论状态！' }],
        type: [{ required: true, message: '请速入文章类型！' }],
        status: [{ required: true, message: '请输入文章状态！' }],
        menu: [{ type: 'array', required: true, message: '请输入菜单！' }],
        tag: [{ type: 'array', required: true, message: '请输入标签！' }],
        header_img: [{ required: true, message: '请输入文章头图！' }],
        excerpt: [
          {
            required: true,
            message: '请输入文章摘要!'
          },
          {
            min: 10,
            message: '文章摘要不得小于10字符'
          },
          {
            max: 200,
            message: '文章摘要不得超过200字符'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入文章内容!'
          },
          {
            min: 50,
            message: '文章内容不得小于20字符'
          },
          {
            max: 10000,
            message: '文章内容不得超过10000字符'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入文章标题!'
          },
          {
            min: 5,
            message: '文章标题不得小于5字符'
          },
          {
            max: 100,
            message: '文章标题不得超过100字符'
          }
        ],
        author: [{ required: true, message: '请输入文章作者！' }]
      },
      postAuthor: {},
      postTag: {},
      postCategory: {},
      roleList: {},
      form: this.$form.createForm(this),
      header_img: '',
      set_header_img: false,
      getImg
    }
  },
  created () {
    this.PostAuthor()
    this.PostTag()
    this.PostCategory()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.set_header_img = false
      this.PostAuthor()
      this.PostTag()
      this.PostCategory()
      if (!this.header_img) {
        this.header_img = this.model.header_img
      }
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    checkCredit (rule, value, callback) {
      if (value > 0 && value < 21) {
        callback()
        return
      }
      callback('积分必须在1到20之间!')
    },
    setHeaderImg (v, k) {
      this.model.header_img = k
      this.set_header_img = true
    },
    preview (file) {
      let urlLink = ''
      if (file.url) {
        urlLink = file.url
      } else {
        urlLink = file.path + file.filename + '.' + file.type
      }
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      if (quill.getSelection() === null) {
        quill.focus()
      }
      const length = quill.getSelection().index
      // 插入图片，res为服务器返回的图片链接地址
      quill.insertEmbed(length, 'image', getImg(urlLink))
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    getUploadPostImg (info) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      // 开始上传
      this.upload_loading = true
      uploadFile(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          that.upload_loading = false
          return []
        }
        // 获取富文本组件实例
        const quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        if (quill.getSelection() === null) {
          quill.focus()
        }
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', getImg(res.result.link))
        // 调整光标到最后
        quill.setSelection(length + 1)
        info.file.thumbUrl = res.result.link
        this.model.content_file.push(res.result.data)
        that.$message.success(res.message)
        that.upload_loading = false
      })
    },
    handOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('ok')
        } else {
          this.$message.error('请输入完整数据！')
          return false
        }
      })
    },
    downloadStatus (e, item) {
      if (e === true) {
        this.model.download = [{
          'name': '',
          'link': '',
          'pwd': '',
          'pwd2': '',
          'credit': ''
        }]
      }
    },
    changeContent (val) {
      this.model.content = val
    },
    addDownload () {
      this.model.download.push({
        'name': '',
        'link': '',
        'pwd': '',
        'pwd2': '',
        'credit': ''
      })
    },
    deleteDownload () {
      if (this.model.download.length > 1) {
        this.model.download.pop()
      } else {
        this.$message.warn('至少要保留一个')
      }
    },
    addMusic () {
      this.model.music.push({
        'name': '',
        'link': ''
      })
    },
    deleteMusic () {
      if (this.model.music.length > 1) {
        this.model.music.pop()
      } else {
        this.$message.warn('至少要保留一个')
      }
    },
    addVideo () {
      this.model.video.push({
        'name': '',
        'link': '',
        'credit': ''
      })
    },
    deleteVideo () {
      if (this.model.video.length > 1) {
        this.model.video.pop()
      } else {
        this.$message.warn('至少要保留一个')
      }
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
    },
    async PostTag () {
      const that = this
      await getTagList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postTag = res.result.data
        })
    },
    async PostCategory () {
      const that = this
      await getCategoryList({
        'son': 0
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postCategory = res.result.data
        })
    }
  }
}
</script>
<style>
.ant-upload-list {
  display: none;
}
</style>
