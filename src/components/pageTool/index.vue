<template>
  <div class="pageTool-container">
    <slot name="tabs"></slot>
    <div class="page-header" v-if="searchItems.length > 0">
      <el-form
        ref="searchForm"
        label-position="left"
        label-width="auto"
        :model="value"
        :inline="true"
        class="form-inline">
        <el-form-item v-for="item in searchItems" :key="item.key" :label="item.label" :prop="item.key">
          <component
            :is="item.type + 'Tool'"
            v-model="value[item.key]"
            :itemKey="item.key"
            :formValue="value"
            :placeholder="item.placeholder"
            :config="item.config"></component>
        </el-form-item>
        <el-form-item v-if="searchItems.length !== 0">
          <div class="form-func">
            <el-button class="commit" type="primary" icon="el-icon-search" @click="searchFunc">查询</el-button>
            <el-button @click="formReset" class="reset" type="primary" icon="el-icon-refresh-right">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="right-block">
        <slot name="func"></slot>
      </div>
    </div>
    <div class="page-mian">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      inputTool: () => import('./components/inputTool.vue'),
      selectTool: () => import('./components/selectTool.vue'),
      datePickerTool: () => import('./components/datePickerTool.vue'),
      treeSelectTool: () => import('./components/treeSelectTool.vue'),
    },
    props: {
      searchItems: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        defaultValue: this.value && JSON.parse(JSON.stringify(this.value)),
      };
    },
    mounted() {},
    methods: {
      searchFunc() {
        this.$emit('search');
      },
      formReset() {
        for (const key in this.value) {
          this.value[key] = this.defaultValue[key];
        }
        this.$emit('search');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pageTool-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #fff;
    padding: 0 18px;
    box-sizing: border-box;
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19px 0;
    box-sizing: border-box;
    height: 70px;
    width: 100%;
    ::v-deep .form-inline {
      height: 100%;
      .el-form-item {
        margin-right: 0px;
        height: 100%;
        padding-right: 30px;
        margin-bottom: 0px;
        .el-form-item__label-wrap {
          margin-left: 0px !important;
          .el-form-item__label {
            float: left;
            font-family: 'Source Han Sans CN';
            font-weight: 400;
            font-size: 15px;
            text-align: left;
            color: #000;
            padding-right: 14px;
          }
        }

        .el-form-item__content {
          height: 100%;
          .el-input {
            font-family: 'Source Han Sans CN';
            font-weight: 400;
            font-size: 15px;
            text-align: left;
            color: #000;
            height: 100%;
            display: flex;
            .el-input__inner {
              height: 32px;
              line-height: 32px;
              width: 179px;
            }
          }
          .el-date-editor {
            width: 228px;
          }
        }
      }
      .form-func {
        display: flex;
        align-items: center;
        .el-button {
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          font-size: 15px;
          text-align: left;
          height: 32px;
          width: 88px;
          box-sizing: border-box;
          border-radius: 16px;
          display: flex;
          align-items: center;
          i {
            font-size: 16px !important;
          }
        }
        .commit {
          color: #fff;
          background: linear-gradient(270deg, #13c0b9 0%, #84dbcd 100%);
          border: none;
        }
        .reset {
          background: #e9feff;
          border: 1px solid #15bcb4;
          color: #14bcb4;
        }
      }
    }
    .right-block {
      height: 100%;
      display: flex;
      align-items: center;
      ::v-deep .el-button {
        font-size: 0;
        border: none;
        padding: 0px 6px 0px 8px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        background: linear-gradient(272.63deg, #1fc3bb 0%, #84dbcd 100%);
        min-width: 109px;
        span {
          font-family: 'Source Han Sans CN';
          font-weight: 400;
          font-size: 15px;
          text-align: left;
          color: #fff;
        }
        i {
          font-size: 16px !important;
        }
      }
    }
  }
  .page-mian {
    flex: 1;
  }
</style>
