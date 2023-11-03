<template>
  <page-tool v-model="dataForm" :searchItems="searchItems"> </page-tool>
</template>

<script>
  export default {
    data() {
      return {
        searchItems: [
          {
            type: 'input',
            key: 'name',
            placeholder: '请输入名称',
          },
        ],
        dataForm: {
          name: '',
        },
      };
    },
  };
</script>
