# Separate Ajax Methods from jQuery

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **Author**: Vincent
- **Version**: V2 (Modernized & Pruned Rebuild Version)

An isolated, lightweight Ajax and Deferred utility library. We provide two major variants under this project:

1. **V1 Legacy Release Version**: Hand-cleaned and reverse de-obfuscated version based on **jQuery 1.11.1** ([jQuery.1.11.1.ajax.release.js](./jQuery.1.11.1.ajax.release.js) - 46KB / [jQuery.1.11.1.ajax.release.min.js](./jQuery.1.11.1.ajax.release.min.js) - 21.1KB). Keeps the most authentic structure and full old-browser compatibilities (includes ActiveXObject fallbacks).
2. **V1 Rebuild Modern Version**: Modernized and pruned upgrade version based on the V1 Release ([jQuery.1.11.1.ajax.rebuild.js](./jQuery.1.11.1.ajax.rebuild.js) - 43KB / [jQuery.1.11.1.ajax.rebuild.min.js](./jQuery.1.11.1.ajax.rebuild.min.js) - 18.6KB). Pruned all deprecated IE ActiveXObject fallbacks, redundant `.load()` DOM actions, and Sizzle query selector bloat.

It is designed for pure native JavaScript (Vanilla JS) web environments where you need JSON/JSONP requests without importing the full jQuery package.

---

## 🚀 Key Improvements in Rebuild Version

1. **Pruned IE6/7/8 Legacy Quirk Hacks**:
   - Completely removed ActiveXObject fallbacks. Replaced XML parser and XHR generator with native standard `window.XMLHttpRequest` and `DOMParser` objects.
   - Removed obsolete browser unload memory leak handler logic.
2. **Purified jQuery.fn.init**:
   - Stripped Sizzle query engine dependencies. Rewrote the selector initializer to perform simple DOM wrapping, ready functions, and native `querySelectorAll` fallbacks.
3. **Purged Dead DOM Actions**:
   - Removed `.load()` method which requires extra DOM manipulations, keeping the network client highly lightweight.
4. **Preserved 100% Core Pipelines**:
   - Preserves all standard request options, prefilters, converters, self-deduced types, Deferred Promise callbacks, and nested query string parameter serializers.

---

## 🛠 How to Use

### 1. Direct Inclusion (Zero Pollution)
Once included, the library automatically binds directly to `window.J$`. It does not pollute or touch the global `$` or `jQuery` namespaces, avoiding any conflicts with other scripts:
```html
<script type="text/javascript" src="jQuery.1.11.1.ajax.rebuild.min.js"></script>
```

### 2. Standard XHR GET Request
```js
window.J$.ajax({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'GET',
  dataType: 'json'
})
.done(function(data) {
  console.log('Success:', data);
})
.fail(function(xhr, status, error) {
  console.error('Error:', error);
});
```

### 3. Standard XHR POST Request (JSON Payload)
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
  console.log('Created Post:', res);
})
.fail(function(xhr, status, error) {
  console.error('POST failed:', error);
});
```

### 4. Cross-domain JSONP Request
```js
window.J$.ajax({
  url: 'https://api.github.com/users/MeMrVincent',
  dataType: 'jsonp',
  jsonp: 'callback' // Name of query parameter
})
.done(function(res) {
  console.log('JSONP response:', res);
})
.fail(function(xhr, status, error) {
  console.error('JSONP failed:', error);
});
```

---

## 💡 Configuration Options

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `url` | `String` | `location.href` | Endpoint address of the target API. |
| `type` / `method` | `String` | `'GET'` | HTTP request type (GET, POST, etc.). |
| `dataType` | `String` | `empty` | Expected data return type (`'json'`, `'jsonp'`, `'xml'`, or `'text'`). |
| `contentType` | `String` | `'application/x-www-form-urlencoded; charset=UTF-8'` | Content-type header sent in request. |
| `data` | `Object` / `String` | `empty` | Request query payload parameters. |
| `timeout` | `Number` | `0` | Request timeout limit in milliseconds. |
| `async` | `Boolean` | `true` | Set to `false` for synchronous requests. |
