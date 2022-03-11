<template>
  <div :class="$style.root">
    <div :class="$style.tagField">
      <div
        :class="$style.createdTag"
        v-for="(tag, index) in tags"
        :key="index"
      >
        <span>{{ tag.text }}</span>
        <a href="#" :class="$style.tagRemove" @click.stop.prevent="remove(index)">
          <svg xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 50 50" version="1.1" width="15px" height="15px">
            <g id="surface1">
              <path style=" " d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z "/>
            </g>
          </svg>
        </a>
      </div>
      <div>
        <input
          :class="$style.input"
          type="text"
          ref="input"
          :placeholder="placeholder"
          @keyup.enter="enter($event.target)"
          @keypress="canEnter = true"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagField',
  data() {
    return {
      tags: [],
      prevValue: '',
      caneEnter: false,
      draggingItem: null,
    };
  },
  props: {
    placeholder: { type: String },
    value: { type: String, required: true },
  },
  methods: {
    propToData() {
      this.tags.length = 0;
      this.prevValue = this.value.split(/,/);
      this.value.split(/,/).forEach(str => this.add(str));
    },
    enter(target) {
      if (!this.canEnter) return;

      if (typeof target.value === "string" && target.value.trim() !== "") {
        this.add(target.value.trim().replace(/,/, ""));
        target.value = "";
      }
      this.canEnter = false;
    },
    remove(index) {
      this.tags.splice(index, 1);
    },
    add(str) {
      this.tags.push({index: this.tags.length, text: str});
      this.$emit('input', this.tags);
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    value: (newVal, oldVal) => {
      if (this.tags.join(",") !== newVal) {
        this.propToData();
      }
    },
    mounted() {
      this.propToData();
    },
    update() {
      let newVal = this.tags.map(tag => tag.text).join(",");
      if (!this.prevValue || this.preValue !== newVal) {
        this.$emit('input', newVal);
        this.prevValue = newVal;
      }
    }
  }
}
</script>

<style module>
.root {
  margin: 10px 0;
}
.tagField {
  width: 740px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
}
.createdTag {
  width: fit-content;
  margin: auto 0;
  margin-left: 10px;
  font-size: 0.9rem;
  background-color: #D4D4D4;
  border-radius: 25px;
  padding: 3px 8px;
}
.tagRemove {
  height: 100%;
  margin: auto 0;
}
.tag {
  width: 700px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.input {
  border: none;
  padding: 10px 20px;
  outline: none;
}
</style>