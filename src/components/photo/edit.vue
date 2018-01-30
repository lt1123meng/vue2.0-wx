<template>
  <div class="photo-edit-wrapper">
    <div class="cropper-wrapper">
      <vue-cropper
        class="cropper"
        ref="cropper"
        :img="image"
        :autoCrop="cropper.autoCrop"
      ></vue-cropper>
    </div>
    <div class="button-wrapper">
      <button class="button" @click="getBase">确定</button>
    </div>
  </div>

</template>

<script>
  import VueCropper from 'vue-cropper'

  export default {
    name: 'edit',
    data() {
      return {
        image: '',
        cropper: {
          autoCrop: true
        }
      }
    },
    created() {
      if (!this.$parent.image) {
        this.$router.go(-1)
        return
      }
      this.image = this.$parent.image
    },
    methods: {
      getBase() {
        this.$refs.cropper.getCropData((data) => {
          // do something
          console.log(data)
        })
      }
    },
    components: {
      VueCropper
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/variable";
  @import "../../common/less/mixin";

  .photo-edit-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    padding: 12px;
    box-sizing: border-box;
    width: 100%;
    background-color: @body-color;
    .cropper-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%;
      .cropper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    .button-wrapper {
      margin-top: 22px;
      .button {
        .button-bg(@blue-color);
        width: 100%;
        border-radius: 4px;
      }
    }
  }
</style>
