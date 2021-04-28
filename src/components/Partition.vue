<template>
  <div>
    <div>
      <el-button type="primary" @click="addDialog = true">添加</el-button>
      <el-dialog
        :visible.sync="addDialog"
        title="添加分区"
        width="30%">
        <span>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-form-item label="分区名称" prop="name">
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
              title="修改分区"
              width="30%">
              <span>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                  <el-form-item label="分区名称" prop="name">
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
import {apiAddForums, apiDeleteForums, apiGetForums, apiUpdateForums} from "../request/api";
import {Message} from "element-ui";

export default {
  name: "Partition",
  data() {
    return {
      addDialog: false,
      updateDialog: false,
      tableData: [],
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入分区名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ]
      },
      id:''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      apiGetForums({
        fup: 0
      }).then(response => {
        self.tableData = response.result
      })
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
            type: 'group',
            name: this.ruleForm.name,
            fup: 0
          }).then(response => {
            self.addDialog = false
            self.tableData = response.result
            Message.success("添加分区成功")
            self.ruleForm.name = '';
          })
        } else {
          Message.warning("请修改分区名称")
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
    handleDelete(index,row){
      const self = this
      apiDeleteForums({
        id: row.id
      }).then(response => {
        self.tableData = response.result
        Message.success("删除成功")
      })
    },
    updateSubmit(formName){
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
          Message.warning("请修改分区名称")
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
