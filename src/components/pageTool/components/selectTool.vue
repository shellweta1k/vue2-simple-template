<template>
  <el-select v-model="selectValue" :placeholder="placeholder">
    <el-option
      v-for="item in config.options"
      :key="item.label"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    itemKey: "",
    value: "",
    formValue: {
      type: Object,
      default: () => {},
    },
    placeholder: "",
  },
  computed: {
    selectValue: {
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
