<template>
  <div class="photo-outer-wrapper">
    <div class="q">
      <button ref="button" @click="click"></button>
      <input type="file" ref="file" class="choose-image" @change="chooseImage">
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'main',
    data: {
      return: {
        image: ''
      }
    },
    mounted() {
      console.log(this.$refs.file)
      debugger
      this.$refs.button.click()
      console.log(this)
      console.log(window)
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
      click() {
        console.log('1111')
        this.$refs.file.click()
      },
      chooseImage(e) {
        console.log(e)
        debugger
        var reader = new FileReader()
        // 新建FileReader对象
        reader.readAsDataURL(e.target.files[0])
        // 读取为base64
        // 以下代码可以删除
        reader.onloadstart = () => {
          console.log('start')
          // 开始读取
        }
        reader.onprogress = (e) => {
          // 这个是定时触发的事件，文件较大的时候较明显
          var p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%'
          console.log(p)
          console.log('uploading')
          // 文件较大，就会出现多个uploading
        }
        reader.onabort = () => {
          console.log('abort')
          // 用作取消上传功能
        }
        reader.onerror = () => {
          console.log('error')
          // 文件读取出错的时候触发，暂模拟不出
        }
        reader.onload = () => {
          console.log('load complete')
          // 完成
        }
        // 预览代码，没在onload里面写的原因是我不想
        reader.onloadend = (e) => {
          this.image = reader.result
          this.$router.replace('/ph/p_e')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
