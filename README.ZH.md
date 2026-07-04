# jQuery 独立 Ajax & Deferred 方法库

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **作者**: Vincent
- **版本**: V2 (重构与重塑现代升级版)

这是一个从 jQuery 中抽离出来的独立 Ajax 与 Deferred（Promise）工具库。适用于不需要引入完整 jQuery 包、但又有轻量级 Ajax 或 JSONP 跨域网络请求需求的原生 JavaScript（Vanilla JS）网页开发场景。

本项目目前提供两个主流演进版本：

1. **V1 经典 Release 版本**：基于 **jQuery 1.11.1** 原版混淆包完全反混淆展开的黄金版本（[jQuery.1.11.1.ajax.release.js](./jQuery.1.11.1.ajax.release.js) - 46KB / [jQuery.1.11.1.ajax.release.min.js](./jQuery.1.11.1.ajax.release.min.js) - 21.1KB）。保留了全部的历史结构与完美兼容性（包含古老的 ActiveXObject 降级），是绝对高稳定的基准底牌。
2. **V1 Rebuild 现代优化版**：基于 Release 版本进行现代化升级与死代码净化重塑后的版本（[jQuery.1.11.1.ajax.rebuild.js](./jQuery.1.11.1.ajax.rebuild.js) - 43KB / [jQuery.1.11.1.ajax.rebuild.min.js](./jQuery.1.11.1.ajax.rebuild.min.js) - 18.6KB）。彻底清除了老旧 IE 的 ActiveXObject 降级、内存泄漏回收包袱，并大幅度精炼了选择器初始化逻辑。

---

## 🚀 Rebuild 版本核心提升

1. **剔除 IE6/7/8 历史糟粕**：
   - 彻底移除了 ActiveXObject 实例化判定，将 XML 解析器和 XHR 发生器统一使用原生现代标准的 `window.XMLHttpRequest` 和 `DOMParser` 对象。
   - 删除了针对 IE 独占的 `unload` 卸载事件以回收 xhrCallbacks 队列的多余监听。
2. **净化 jQuery.fn.init 构造**：
   - 剥离了原本针对各种复杂 HTML/ID 匹配的大段 Sizzle 降级依赖，将选择器初始化器改写为仅提供基础 of DOM 节点包装、Ready 注册以及在匹配失败时向原生 `querySelectorAll` 优雅退避的分支。
3. **清除死代码 DOM load 绑定**：
   - 移除了强依赖外部 DOM 操纵方法的 `.load()` 接口，维持 Ajax 网络库极度纯粹的技术定位。
4. **100% 完整保留核心网络管道**：
   - 完美保留了 `prefilters` (预处理器链)、`transports` (XHR / Script 运行器链)、`ajaxHandleResponses`（自动根据 Content-Type 推导响应类型）、`ajaxConvert`（多格式转换引擎，支持 json, xml, html, text）以及 `jQuery.param` 深层对象查询参数序列化，与 Release 版本核心功能完全对齐。

---

## 🛠 使用方法

### 1. 直接引入使用（零污染）
引入脚本后，本库会自动直接挂载到全局的 `window.J$` 命名空间下，不碰触且不污染全局的 `$` 或 `jQuery`，天然防止与任何第三方库冲突：
```html
<script type="text/javascript" src="jQuery.1.11.1.ajax.rebuild.min.js"></script>
```

### 2. 标准 Ajax GET 请求
```js
window.J$.ajax({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'GET',
  dataType: 'json'
})
.done(function(data) {
  console.log('请求成功:', data);
})
.fail(function(xhr, status, error) {
  console.error('请求失败:', error);
});
```

### 3. 标准 Ajax POST 请求 (JSON 负载)
```js
window.J$.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts',
  type: 'POST',
  dataType: 'json',
  data: {
    title: 'Vincent Rebuild POST Test',
    body: 'It works perfectly!'
  }
})
.done(function(res) {
  console.log('创建成功对象:', res);
})
.fail(function(xhr, status, error) {
  console.error('POST失败:', error);
});
```

### 4. JSONP 跨域请求
```js
window.J$.ajax({
  url: 'https://api.github.com/users/MeMrVincent',
  dataType: 'jsonp',
  jsonp: 'callback' // 传递给后端的参数键名
})
.done(function(res) {
  console.log('JSONP 响应数据:', res);
})
.fail(function(xhr, status, error) {
  console.error('JSONP 跨域失败:', error);
});
```

---

## 💡 配置参数

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `url` | `String` | `location.href` | 目标 API 请求端点地址。 |
| `type` / `method` | `String` | `'GET'` | HTTP 请求方式（GET, POST 等）。 |
| `dataType` | `String` | `空` | 预期返回的数据格式（`'json'`, `'jsonp'`, `'xml'`, 或 `'text'`）。 |
| `contentType` | `String` | `'application/x-www-form-urlencoded; charset=UTF-8'` | 发送请求时所声明 of Content-Type 头。 |
| `data` | `Object` / `String` | `空` | 发送给接口的负载请求参数。 |
| `timeout` | `Number` | `0` | 请求超时限制（毫秒）。 |
| `async` | `Boolean` | `true` | 是否为异步请求（设置为 `false` 会切换为同步）。 |
