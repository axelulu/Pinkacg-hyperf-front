<template>
  <div :class="prefixCls">
    <div style="margin: 10px 0px">
      <a-upload
          list-type="picture"
          :multiple="true"
          :customRequest="getUploadPostImg"
      >
        <a-button> <a-icon class="upload" type="upload" /> upload </a-button>
      </a-upload>
    </div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)">
    </quill-editor>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { uploadPostImg } from '@/api/upload'
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
  ['link', 'image', 'video'],
  ['clean']
]

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    value: {
      type: String
    },
    userId: {
      type: Number
    }
  },
  created () {
    this.content = this.value
  },
  data () {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.upload').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    getUploadPostImg (info) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      formData.append('id', this.userId)
      // 开始上传
      this.upload_loading = true
      uploadPostImg(formData).then((res) => {
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
        quill.insertEmbed(length, 'image', process.env.VUE_APP_API_BASE_SERVER_HOST + res.result.link)
        // 调整光标到最后
        quill.setSelection(length + 1)
        that.$message.success(res.message)
        that.upload_loading = false
      })
    },
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
    },
    onEditorChange ({ quill, html, text }) {
      this.$emit('change', html)
    }
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');

/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  line-height: initial;
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
}
</style>
