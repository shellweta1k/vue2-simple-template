<template></template>

<script>
  export default {
    name: 'asideItem',
    props: {
      routerList: {
        type: Array,
        default: () => [],
      },
    },
    mounted() {
      console.log(this.routerList);
    },
    data() {
      return {};
    },
  };
</script>
