<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form-model
        :model="cms"
        :rules="rules"
        ref='cmsForm'>
        <a-form-model-item
          label="cms布局"
          :labelCol="{lg: {span: 4}, sm: {span: 4}}"
          :wrapperCol="{lg: {span: 14}, sm: {span: 17} }">
          <a-form style='display: inline-block' v-for="(k, v) in cms" :key="v">
            <a-form-model-item style="margin-bottom: 15px;float: left;width: 23%;margin: 0 1%">
              <a-input prop='name' v-model="k.name" addon-before="cms名称" placeholder="请输入cms名称！" />
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 15px;float: left;width: 23%;margin: 0 1%">
              <a-input prop='icon' v-model="k.icon" addon-before="图标" placeholder="请输入cms图标！" />
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 15px;float: left;width: 23%;margin: 0 1%">
              <a-select prop='menu' v-model="k.menu" style="width: 200px">
                <a-select-option v-for="k in postCategory" :key="k.id" :value="k.value">
                  <span v-if="k.son === 0">{{ k.label }}</span>
                  <span v-else>{{ k.label }}</span>
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item style="margin-bottom: 15px;float: left;width: 23%;margin: 0 1%">
              <a-select prop='style' v-model="k.style" style="width: 200px">
                <a-select-option :value="1">
                  样式一
                </a-select-option>
                <a-select-option :value="2">
                  样式二
                </a-select-option>
                <a-select-option :value="3">
                  样式三
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form>
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
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button @click="handleSubmit" type="primary">提交</a-button>
          <a-button style="margin-left: 8px">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getSettingList, updateSettingList } from '@/api/setting'
import { getCategoryList } from '@/api/category'

export default {
  name: 'index',
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入文章作者！' }],
        icon: [{ required: true, message: '请输入文章作者！' }],
        menu: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        style: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }]
      },
      'postCategory': {},
      'cms': {}
    }
  },
  created () {
    this.PostCategory()
    const that = this
    getSettingList({
      'name': 'site_cms'
    }).then(res => {
      console.log(res)
      if (res.code !== 200) {
        that.$message.error(res.message)
        return []
      }
      console.log(res.result.data[0].value)
      this.cms = res.result.data[0].value
    })
  },
  methods: {
    addDownload () {
      this.cms.push({
        'name': '',
        'link': '',
        'pwd': '',
        'pwd2': '',
        'credit': ''
      })
    },
    deleteDownload () {
      this.cms.pop()
    },
    async PostCategory () {
      const that = this
      await getCategoryList({
        'pageSize': 100000,
        'pageNo': 1
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postCategory = res.result.data
        })
    },
    handleSubmit () {
      const that = this
      this.$refs.cmsForm.validate(valid => {
        if (valid) {
          const data = {
            'name': 'site_cms',
            'value': this.cms
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

<style scoped>

</style>
