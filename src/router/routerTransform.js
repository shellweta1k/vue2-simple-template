import layout from '@/layout/index.vue';

const loadview = (view) => {
  return () => import(`@/views/${view}.vue`);
};
function dataConvertRoute(item) {
  let { path, component, children, ...meta } = item;
  const name = path;
  component = component ? loadview(component) : layout;
  path = path ? '/' + path : path;
  return {
    name,
    path,
    component,
    children,
    meta,
  };
}
export function dataToRoute(list) {
  function handle(dataList, results = []) {
    for (let i = 0; i < dataList.length; i++) {
      const item = dataConvertRoute(dataList[i]);
      if (item.path) {
        if (item.children && item.children.length !== 0) {
          let child = [];
          child = handle(dataList[i].children);
          item.children = child;
        }
        if (item.meta.menuType === 'M') item.redirect = item.children[0].path;
        results.push(item);
      }
    }
    return results;
  }
  return handle(list);
}
