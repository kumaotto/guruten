<template>
  <div>
    <button
      :class="[$style.button, {[$style.isButtonRed]: isButtonRed}]"
      :disabled="disabled"
      @click="onClick"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: { type: Boolean, default: false},
    isButtonRed: { type: Boolean, default: false }
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
}
</script>

<style module>
.button {
  background-color: #C4C4C4;
  border: none;
  padding: 10px 50px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  cursor: pointer;
}
.button::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 10%;
  width: 7px;
  height: 7px;
  border-top: 2px solid #222;
  border-right: 2px solid #222;
  transform: rotate(45deg);
  margin-top: -5px;
}
.isButtonRed {
  background-color: #E84848;
  color: #fff;
  border: none;
  padding: 10px 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  cursor: pointer;
}
.isButtonRed::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 10%;
  width: 7px;
  height: 7px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  margin-top: -5px;
}
</style>