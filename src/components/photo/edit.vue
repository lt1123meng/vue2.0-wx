<template>
  <div class="ww">
    <img :src="image">
  </div>

</template>

<script>
  export default {
    name: 'edit',
    data: {
      return: {
        image: ''
      }
    },
    created() {
      if (!this.$parent.image) {
        this.$router.go(-1)
        return
      }
      this.image = this.$parent.image
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>


</style>
