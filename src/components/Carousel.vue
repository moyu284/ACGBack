<template>
  <div>
    <div>
      <el-button type="primary" @click="clickButton">上传</el-button>
      <span>最多设置5张轮播图</span>
      <el-dialog
        :visible.sync="dialogVisible"
        title="上传图片"
        width="30%">
        <span>
             <el-upload
               ref="upload"
               :auto-upload=false
               :file-list="fileList"
               :limit="1"
               :on-exceed="handleExceed"
               :on-success="successUpload"
               action="http://localhost:8081/image/imageUpload"
               class="upload-demo"
               list-type="picture">
             <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,一次只能上传一张</div>
             </el-upload>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>

      </el-dialog>
    </div>


    <div style="margin-top: 10px">
      <el-table
        :border=true
        :data="tableData"
        style="width: 1000px">
        <el-table-column label="序号" type="index"/>
        <el-table-column
          label="缩略图"
          width="180">
          <template slot-scope="scope">
            <center>
              <el-image
                :preview-src-list="scope.row.pathArray"
                :src="scope.row.path"
                style="width: 50px; height: 50px">
              </el-image>
            </center>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          width="600px">
          <template slot-scope="scope">
            {{ scope.row.path }}
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
import {Message} from "element-ui";
import {apiDeleteCarouse, apiGetCarouseList, apiUploadCarouse} from "../request/api";
import router from "../router";

export default {
  name: "Carousel",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      apiGetCarouseList().then(response => {
        self.tableData = response.result
      })
    },
    clickButton() {
      if (this.tableData.length >= 5) {
        Message.warning("最多设置5张轮播图")
      } else {
        this.dialogVisible = true
      }
    },
    handleDelete(index, row) {
      const self = this
      apiDeleteCarouse({
        id: row.id
      }).then(response => {
        self.tableData = response.result
        Message.success("删除成功")
      })
    },
    handleExceed(files, fileList) {
      Message.warning(`最多上传1张图片`);
    },
    cancel() {
      this.dialogVisible = false
      this.fileList = []
    },
    submit() {
      const self = this
      this.dialogVisible = false
      this.$refs.upload.submit();
    },
    successUpload(response, file, fileList) {
      const self = this
      console.log(response)
      if (response.code === 500){
        Message({
          message: response.message,
          type: 'error',
          duration: 1000
        })
        this.fileList = []
      }else {
        this.fileList = []
        apiUploadCarouse({
          path: response.result
        }).then(response => {
          self.tableData = response.result
          Message.success("上传成功")
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
