<template>
  <editor
    api-key="rson1yk0rinyo635y3lwk17ouanpvk6ghhk1e15mda05ymth"
    :init="init"
    v-model="tinymceHtml"
  />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import {apiUploadImage} from "../request/api";

export default {
  name: "Tinymce",
  components: {Editor},
  data() {
    return {
      QiniuData: {
        key: "", //图片名字处理
        token: "" //七牛云token
      },
      domain: "http://up-z2.qiniup.com", // 七牛云的上传地址
      qiniuaddr: "http://qrz58znv6.hn-bkt.clouddn.com", // 七牛云的图片外链地址
      tinymceHtml: '',
      init: {
        height: 250,
        menubar: false,
        language: 'zh_CN',
        plugins: [
          "emoticons image link"
        ],
        toolbar:
          'emoticons image link',
        images_upload_url: '',
        images_upload_handler: (blobInfo, success, failure) => {
          this.imgUpload(blobInfo, success, failure);
        }
      },

    }
  },
  methods: {
    imgUpload: function (blobInfo, success, failure) {
      let formData = new FormData()
      console.log(blobInfo.filename())
      formData.append('img', blobInfo.blob())
      console.log(formData)
      apiUploadImage(formData)
        .then(response => {
          success(response.result)
        }).catch(err => {
        failure(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
