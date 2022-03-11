<template>
  <div :class="$style.root">
    <textarea
      :class="$style.textarea"
      v-model="inputText"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'TextAreaFiled',
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
.textarea {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 700px;
  outline: none;
  height: 140px;
  appearance: none;
  resize: none;
}
</style>