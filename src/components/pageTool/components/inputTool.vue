<template>
  <el-input
    v-model="inputValue"
    :placeholder="placeholder"
    :clearable="true"
  ></el-input>
</template>

<script>
export default {
  props: {
    placeholder: "",
    itemKey: {
      type: String,
      default: () => "inputTool",
    },
    value: "",
    config: {
      type: Object,
      default: () => {},
    },
    formValue: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.formValue[this.itemKey] = val;
      },
    },
  },
};
</script>
