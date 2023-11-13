import cache from './cache';
import modal from './modal';
import encrypt from './encrypt';
import hasPermi from './hasPermi';
import docCookies from '@/utils/cookies';
// import {
//   // 时间格式化
//   parseTime,
//   // 重置表单
//   resetForm,
//   // 添加时间范围
//   addDateRange,
//   // 树形结构
//   handleTree,
//   // 深拷贝
//   copyJson,
// } from '@/utils';

// import {
//   // 查找字典数据
//   findDictData,
//   // 获取字典列表
//   getDictList,
// } from '@/utils/dictionary';

export default {
  install(Vue) {
    // 防止xss处理
    // Vue.component("vue-dompurify-html", VueDompurifyHtml);

    // 创建权限处理指令
    Vue.directive('hasPermi', hasPermi);

    // // 全局方法挂载
    // Vue.prototype.parseTime = parseTime; //时间格式化
    // Vue.prototype.resetForm = resetForm; //重置表单
    // Vue.prototype.addDateRange = addDateRange; // 添加时间范围
    // Vue.prototype.handleTree = handleTree; // 树形结构
    // Vue.prototype.copyJson = copyJson; // 深拷贝
    // Vue.prototype.getDictList = getDictList; // 获取字典列表
    // Vue.prototype.findDictData = findDictData; // 查找字典数据

    // 加密
    Vue.prototype.$encrypt = encrypt;
    // 缓存对象
    Vue.prototype.$cache = cache;
    // 模态框对象
    Vue.prototype.$modal = modal;
    Vue.prototype.$cookies = docCookies;
    // html净化
    // Vue.prototype.$htmlPurify = function (htmls) {
    //   if (!htmls) {
    //     return '';
    //   }
    //   return DOMPurify.sanitize(htmls);
    // };

    /**
     * @description: 获取高度
     * @param * publicShareHeight 去掉高度
     * @param * def 默认值
     * @return *
     */
    Vue.prototype.$getHeight = function (publicShareHeight, def) {
      publicShareHeight = publicShareHeight || 80;
      let height = 0;
      if (window.devicePixelRatio >= 1) {
        height = document.body.clientHeight - 80 + 'px';
      } else {
        height = def || 'auto';
      }
      return height;
    };

    /**
     * @description: 删除方法
     * @param * func 方法名
     * @param * queryParams 参数
     * @return *
     */
    Vue.prototype.$handDelData = function (func, queryParams, tips) {
      return new Promise((resolve, reject) => {
        this.$msgbox({
          // title: "提示",
          message: tips ? tips : '此操作将永久删除该内容, 是否继续?',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'model-box--icon',
          type: 'warning',
          customClass: 'model-box--ui',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              func(queryParams)
                .then((res) => {
                  console.log(res);
                  done();
                  instance.confirmButtonLoading = false;
                  resolve(res);
                })
                .catch((err) => {
                  console.log(err);
                  done();
                  instance.confirmButtonLoading = false;
                  reject(err);
                });
            } else {
              done();
              resolve(action);
            }
          },
        })
          .then((action) => {
            console.log(action);
            resolve(action);
          })
          .catch((err) => {
            console.log(err);
            resolve(err);
          });
      });
    };

    /**
     * @description: 导出方法
     * @param * func 方法名
     * @param * queryParams 参数
     * @param * title 标题
     * @return *
     */
    Vue.prototype.$handExport = function (func, queryParams, title, suffix) {
      suffix = suffix || '.xlsx';
      // 获取时间
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let times = year + '年' + month + '月' + day + '日';
      modal
        .confirm('是否确认导出条件查询数据项？')
        .then(() => {
          modal.loading('正在导出数据请稍后...');
          func(queryParams).then((resp) => {
            const link = document.createElement('a');
            const blob = new Blob([resp], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            if (navigator.msSaveBlob) {
              // deal with IE 11, data是第一步toBlob的结果值
              window.navigator.msSaveOrOpenBlob(blob, `${title + times}` + suffix);
              modal.closeLoading();
              return;
            }
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', decodeURI(`${title + times}` + suffix));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            modal.closeLoading();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    /**
     * @description: 设置属性值
     * @param * item 对象
     * @param * key 键值
     * @param * def 默认值
     * @return *
     */
    Vue.filter('setAttrVal', function (item, key, def) {
      if ([undefined, null, ''].includes(def)) {
        def = '-';
      }

      // 处理数字0
      if (!key && typeof item == 'number') {
        item = item == 0 ? '0' : item;
      }

      if (item && key && item[key]) {
        return item[key];
      } else if (item && !key) {
        return item;
      }
      return def;
    });

    /**
     * @description: 设置序号
     * @param * index 当前索引
     * @param * currentPage 页码
     * @param * pageSize 数量
     * @return *
     */
    Vue.filter('setSortVal', function (index, currentPage, pageSize) {
      return currentPage > 1 ? index + 1 + (currentPage - 1) * pageSize : index + 1;
    });
  },
};
