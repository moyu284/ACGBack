<template>
  <div>
    <div>
      <span>分区与板块：</span>

      <el-cascader
        ref="checked"
        v-model="selectedOptions"
        :options="options"
        :props="props"
        style="width: 250px"
        @change="change()"
      ></el-cascader>

    </div>


    <div style="margin-top: 10px">
      <el-table
        :border=true
        :data="tableData"
        style="width: 1000px">
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column label="主题">
          <template slot-scope="scope">
            <span>
              {{ scope.row.subject }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="作者">
          <template slot-scope="scope">
            <span>
              {{ scope.row.author }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="发表时间">
          <template slot-scope="scope">
            <span>
              {{ scope.row.addtime | formatDate }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import {
  apiDeleteTopic,
  apiGetAllForums,
  apiGetTopic,
} from "../request/api";
import {Message} from "element-ui";
import {formatDate} from "../public/FormatDate";

export default {
  name: "Topic",
  data() {
    return {
      selectedOptions: [],
      options: [],
      props: {
        checkStrictly: false,
        value: 'code',
        label: 'name',
        children: 'children'
      },
      tableData: [],
      id: '',
      platsId: ''
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      apiGetAllForums().then(response => {
        self.options = getTreeData(response.result)
        // this.$forceUpdate();
      })
    },
    change() {
      const self = this
      this.platsId = this.selectedOptions[this.selectedOptions.length - 1]
      console.log(this.platsId)
      apiGetTopic({
        id: this.selectedOptions[this.selectedOptions.length - 1]
      }).then(response => {
        self.tableData = response.result
      })
    },
    handleDelete(index, row) {
      const self = this
      apiDeleteTopic({
        id: row.id
      }).then(response => {
        self.tableData = response.result
        Message.success("删除成功")
      })
    }
  }
}

function getTreeData(data) {
  // 循环遍历json数据
  for (let i = 0; i < data.length; i++) {

    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);
    }
  }
  return data;
}
</script>

<style scoped>

</style>
