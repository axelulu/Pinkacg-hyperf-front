<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="问题id">
                <a-input-number v-model="queryParam.id" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="问题分类">
                <a-select v-model="queryParam.category">
                  <a-select-option v-for='(v, k) in topQuestionCat' :key='k' :value="v.slug">
                    {{ v.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="问题标题">
                  <a-input v-model="queryParam.question" placeholder=""/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        :rowKey="record=>record.id"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="id" slot-scope="text">
          {{ text.id }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getQuestionList, updateQuestionList, createQuestionList, deleteQuestionList } from '@/api/question'

import CreateForm from './modules/QuestionCreateForm'
import { getQuestionCatList } from '@/api/questionCat'

const columns = [
  {
    title: '问题id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '问题',
    dataIndex: 'question',
    scopedSlots: { customRender: 'label' }
  },
  {
    title: 'A选项',
    dataIndex: 'A',
    scopedSlots: { customRender: 'A' }
  },
  {
    title: 'B选项',
    dataIndex: 'B',
    scopedSlots: { customRender: 'B' }
  },
  {
    title: 'C选项',
    dataIndex: 'C',
    scopedSlots: { customRender: 'C' }
  },
  {
    title: 'D选项',
    dataIndex: 'D',
    scopedSlots: { customRender: 'D' }
  },
  {
    title: '答案',
    dataIndex: 'answer',
    scopedSlots: { customRender: 'answer' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  false: {
    status: 'default',
    text: '停用'
  },
  true: {
    status: 'success',
    text: '启用'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm
  },
  data () {
    this.columns = columns
    return {
      // create model
      topQuestionCat: [],
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        'id': null,
        'value': null,
        'status': null
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const that = this
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getQuestionList(requestParameters)
          .then(res => {
            if (res.code !== 200) {
              that.$message.error(res.message)
              return []
            }
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    this.loadTopQuestionCat()
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    async loadTopQuestionCat () {
      const that = this
      await getQuestionCatList()
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          that.topQuestionCat = res.result.data
        })
    },
    handleAdd () {
      this.mdl = {
        'status': true
      }
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.setFieldsValue(this.mdl)
      form.validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          if (values.id > 0) {
            // 修改 e.g.
            updateQuestionList(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              res.code === 200 ? this.$message.success(res.message) : this.$message.error(res.message)
            })
          } else {
            // 新增
            createQuestionList(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              res.code === 200 ? this.$message.success(res.message) : this.$message.error(res.message)
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      const form = this.$refs.createModal.form
      const that = this
      this.$confirm({
        title: '你确定要删除项目吗?',
        content: '如果你删除了此项目，将不可恢复！',
        onOk () {
          deleteQuestionList(record).then(res => {
            that.visible = false
            that.confirmLoading = false
            // 重置表单数据
            form.resetFields()
            // 刷新表格
            that.$refs.table.refresh()
            res.code === 200 ? that.$message.success(res.message) : that.$message.error(res.message)
          })
        },
        onCancel () {}
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
