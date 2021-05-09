<template>
  <div>
    <div>
      <span>分区与版块：</span>

      <el-cascader
        v-model="selectedOptions"
        :options="options"
        :props="props"
        ref="checked"
        @change="change()"
      ></el-cascader>

      <el-button type="primary" @click="clickAddDialog">添加</el-button>
      <el-dialog
        :visible.sync="addDialog"
        title="添加版块"
        width="30%">
        <span>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-form-item label="版块名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

          </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addSubmit('ruleForm')">确 定</el-button>
        </span>

      </el-dialog>
    </div>


    <div style="margin-top: 10px">
      <el-table
        :border=true
        :data="tableData"
        style="width: 1000px">
        <el-table-column label="序号" type="index"/>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)">修改
            </el-button>
            <el-dialog
              :visible.sync="updateDialog"
              title="修改版块"
              width="30%">
              <span>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                  <el-form-item label="版块名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-form>
              </span>

              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="updateSubmit('ruleForm')">确 定</el-button>
              </span>

            </el-dialog>
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
import {apiAddForums, apiDeleteForums, apiGetForums, apiGetSubForums, apiUpdateForums} from "../request/api";
import {Message} from "element-ui";

export default {
  name: "SubPlate",
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
      addDialog: false,
      updateDialog: false,
      tableData: [],
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入板块名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ]
      },
      id: '',
      platsId:''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      apiGetSubForums().then(response => {
        self.options = getTreeData(response.result)
        // this.$forceUpdate();
      })
    },
    change(){
      const self = this
      this.platsId = this.selectedOptions[this.selectedOptions.length-1]
      apiGetForums({
        fup: this.selectedOptions[this.selectedOptions.length-1]
      }).then(response => {
        self.tableData = response.result
      })
    },
    clickAddDialog() {
      if (this.platsId === '' || this.platsId == null) {
        Message.warning("请先选择分区与板块")
      } else {
        this.addDialog = true
      }
    },
    cancel() {
      this.addDialog = false
      this.ruleForm.name = ''
      this.updateDialog = false
    },
    addSubmit(formName) {
      const self = this

      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiAddForums({
            type: 'sub',
            name: this.ruleForm.name,
            fup: this.platsId
          }).then(response => {
            self.addDialog = false
            self.tableData = response.result
            Message.success("添加子板块成功")
            self.ruleForm.name = '';
          })
        } else {
          Message.warning("请修改子板块名称")
          return false;
        }
      });
    },
    handleUpdate(index, row) {
      console.log(row)
      this.updateDialog = true
      this.ruleForm.name = row.name
      this.id = row.id
    },
    handleDelete(index, row) {
      const self = this
      apiDeleteForums({
        id: row.id
      }).then(response => {
        self.tableData = response.result
        Message.success("删除成功")
      })
    },
    updateSubmit(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiUpdateForums({
            id: self.id,
            name: this.ruleForm.name,
          }).then(response => {
            self.updateDialog = false
            self.tableData = response.result
            Message.success("修改成功")
            self.ruleForm.name = '';
            self.id = ''
          })
        } else {
          Message.warning("请修改子板块名称")
          return false;
        }
      });
    }
  }
}
function getTreeData(data) {
  // 循环遍历json数据
  for(let i=0;i<data.length;i++){

    if(data[i].children.length<1){
      // children若为空数组，则将children设为undefined
      data[i].children=undefined;
    }else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);
    }
  }
  return data;
}
</script>

<style scoped>

</style>
