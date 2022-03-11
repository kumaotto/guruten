<template>
  <img :src="url" @click="onClickImg">
</template>

<script>
export default {
  name: 'ImageUrl',
  props: {
    url: { type: String },
  },
  methods: {
    onClickImg() {
      this.$emit('click');
    }
  }
}
</script>

<style module>
</style>