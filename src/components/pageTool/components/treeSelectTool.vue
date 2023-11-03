<template>
  <treeselect
    v-model="treeValue"
    :options="config.options"
    :normalizer="normalizer"
    :show-count="true"
    :placeholder="placeholder"
    style="width: 179px"
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    placeholder: "",
    value: "",
    itemKey: {
      type: String,
      default: () => "treeSelectTool",
    },
    formValue: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    treeValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.formValue[this.itemKey] = val;
      },
    },
  },

  methods: {
    normalizer(node) {
      if (node.list && !node.list.length) {
        delete node.list;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.list,
      };
    },
  },
};
</script>
