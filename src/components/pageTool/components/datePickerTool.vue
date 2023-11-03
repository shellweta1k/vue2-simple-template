<template>
  <el-date-picker
    v-model="dateValue"
    :type="config.type"
    :placeholder="placeholder"
    :start-placeholder="config.startPlaceholder"
    :end-placeholder="config.endPlaceholder"
  >
  </el-date-picker>
</template>

<script>
export default {
  props: {
    value: "",
    itemKey: "",
    placeholder: "",
    formValue: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    dateValue: {
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
