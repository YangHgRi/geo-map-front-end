import * as VueRouter from "vue-router";
import {createRouter} from "vue-router";
import humps from 'humps';

// 获取组件 src/components 下所有组件
let files = require.context('./components', false, /\.vue$/);
// 自动生成路由记录
let autoRoutes = [];

files.keys().forEach(fileName => {
    // 获取 vue 文件路径
    let component = files(fileName).default;
    // 文件路径去除开头的 .
    let filePathWithOutDot = "/" + fileName.substring(2, fileName.length - 4);
    // 先去掉路径开头的 '/'，避免下一步将 '/' 识别为第一个字符并在其后添加 '-'
    let path = filePathWithOutDot.substring(1);
    // 大驼峰命名的文件名改为 小写+‘-’连接
    path = humps.decamelize(path, {separator: '-'});
    // 将 '/' 加回来，恢复路径格式
    path = '/' + path;
    autoRoutes.push({
        // 这就是为什么每个需要注册到侧栏的组件都需要配置 zh_label 属性
        name: component.name, path: path, component: component, meta: {zh_label: component.zh_label},
    });
});
// 手动创建的路由记录
let manualRoutes = [
    {path: '/', redirect: '/home'},
];
// 合并手动和自动创建的路由记录
let totalRoutes = manualRoutes.concat(autoRoutes);
// 创建路由器
const router = createRouter({
    history: VueRouter.createWebHashHistory(), routes: totalRoutes,
});
// 路由页面标题命名为路由器中配置的 name
router.beforeEach((to, from, next) => {
    if (to.meta.zh_label) {
        document.title = to.meta.zh_label || "未命名";
    }
    next();
});
// 暴露 router 对象
export default router;