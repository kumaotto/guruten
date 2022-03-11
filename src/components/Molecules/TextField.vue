<template>
  <div :class="$style.root">
    <input
      :class="$style.input"
      v-model="inputText"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'TextFiled',
  props: {
    placeholder: { type: String },
    value: { type: String }
  },
  computed: {
    inputText: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  }
}
</script>

<style module>
.root {
  margin: 10px 0;
}
.input {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 700px;
  outline: none;
}
</style>