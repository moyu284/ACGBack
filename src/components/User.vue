<template>
  <div>
    <div style="margin-top: 10px">
      <el-table
        :border=true
        :data="tableData"
        style="width: 1000px">
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span>
              {{ scope.row.username }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span>
              {{ scope.row.email }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            <span>
              {{ scope.row.phone }}
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
              title="修改用户信息"
              width="30%">
              <span>
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="userPw">
                    <el-input v-model="ruleForm.userPw"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
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
import {
  apiDeleteUser,
  apiGetAllUser,
  apiUpdateUser
} from "../request/api";
import {Message} from "element-ui";

export default {
  name: "User",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码不能少于6位'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.userPw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (value !== '') {
          const reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'));
          }
        }
        callback();
      }, 1000);
    };
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (value !== '') {
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }, 1000);
    };
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
        userName: '',
        userPw: '',
        checkPass: '',
        email: '',
        phone: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 50, message: '长度最低5字符,最大50字符', trigger: 'blur'}
        ],
        userPw: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkPhone, trigger: 'blur'}
        ]
      },
      id: '',
      platsId: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      apiGetAllUser().then(response => {
        self.tableData = response.result
        // this.$forceUpdate();
      })
    },
    cancel() {
      this.addDialog = false
      this.ruleForm.name = ''
      this.updateDialog = false
    },
    handleUpdate(index, row) {
      console.log(row)
      this.updateDialog = true
      this.ruleForm.userName = row.username
      this.ruleForm.userPw = row.userpw
      this.ruleForm.checkPass = row.userpw
      this.ruleForm.email = row.email
      this.ruleForm.phone = row.phone
      this.id = row.id
    },
    handleDelete(index, row) {
      const self = this
      apiDeleteUser({
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
          apiUpdateUser({
            id: this.id,
            username: this.ruleForm.userName,
            userpw: this.ruleForm.userPw,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone
          }).then(response => {
            self.updateDialog = false
            self.tableData = response.result
            Message.success("修改成功")
            self.ruleForm.userName = ''
            self.ruleForm.userPw = ''
            self.ruleForm.checkPass = ''
            self.ruleForm.email = ''
            self.ruleForm.phone = ''
            self.id = ''
          })
        } else {
          Message.warning("请检查用户信息是否合规")
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
