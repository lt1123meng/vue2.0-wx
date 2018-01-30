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
    data() {
      return {
        image: ''
      }
    },
    mounted() {
      this.$refs.button.click()
    },
    deactivated() {
      this.$destroy()
    },
    methods: {
      click() {
        this.$refs.file.click()
      },
      chooseImage(e) {
        var reader = new FileReader()
        // 新建FileReader对象
        reader.readAsDataURL(e.target.files[0])
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
