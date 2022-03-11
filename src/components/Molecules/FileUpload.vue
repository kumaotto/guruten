<template>
  <div :class="$style.root">
    <img :src="image" />
    <input
      :class="$style.input"
      ref="input"
      type="file"
      :accept="accept"
      :path:="path"
      :filesLengthLimit="filesLengthLimit"
      :fileSizeLimit="fileSizeLimit"
      :fileItems="fileItems"
      @change="onFileChange($event)"
      @dragover="updateDragDropFocus(true)"
      @dragleave="updateDragDropFocus(false)"
      @dragenter="updateDragDropFocus(true)"
    >
  </div>
</template>

<script>
import "firebase/storage";

export default {
  name: 'Top',
  model: {
    prop: 'fileItems',
    event: 'change',
  },
  props: {
    accept: { type: String, default: '*/*' },
    fileItems: { type: Array },
    path: { type: String, default: 'test/' },
    fileSizeLimit: { type: Number, required: true },
    filesLengthLimit: { type: Number, required: true },
  },
  data() {
    return {
      dragDropFocus: false,
      image: '',
    };
  },
  methods: {
    updateDragDropFocus(focus) {
      if (!this.loading) {
        this.dragDropFocus = focus;
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
      this.$emit('uploadFile', files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      }
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style module>
.root {
  padding: 15px 0;
}
.input {
  margin: 0 auto;
  margin-top: 6px;
  display: block;
}
img {
  width: 200px;
  height: auto;
}
</style>