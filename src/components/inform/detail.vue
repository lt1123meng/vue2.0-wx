<template>
  <div>111111111111</div>

</template>

<script>
  import {InformDetail} from 'api/inform'

  export default {
    name: 'detail',
    created() {
      InformDetail(this.$route.params.id, this.$route.params.oid).then((res) => {
        res = JSON.parse(res.data)
        console.log(res)
      })
    },
    deactivated() {
      this.$destroy()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
