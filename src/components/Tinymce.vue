<template>
  <editor
    api-key="rson1yk0rinyo635y3lwk17ouanpvk6ghhk1e15mda05ymth"
    :init="init"
  />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "Tinymce",
  components: {Editor},
  data() {
    return {
      init: {
        height: 250,
        menubar: false,
        language: 'zh_CN',
        plugins: [
          "emoticons image"
        ],
        toolbar:
          'emoticons image',
        images_upload_url: '',
        images_upload_handler: (blobInfo, success) => {
          this.upload(blobInfo, (e) => {
            success(e)
          })
        }
      },

    }
  },
  methods: {
    upload(blobInfo, fn) {
      let formData = new FormData()
      formData.append('file', blobInfo.blob())
      //这里为自己的上传接口调用方法

    }
  }
}
</script>

<style scoped>

</style>
