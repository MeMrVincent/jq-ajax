# jQuery 独立 Ajax & Deferred ユーティリティ

[English](README.md) | [简体中文](README.ZH.md) | [日本語](README.JA.md)

- **著者**: Vincent
- **バージョン**: V2 (近代化 & 最適化 Rebuild バージョン)

jQuery から Ajax 関連機能と Deferred（Promise）オブジェクト機能のみを独立させた軽量なネットワークリクエストライブラリです。jQuery 全体を読み込むことなく、ネイティブな JavaScript（Vanilla JS）環境で軽量に Ajax や JSONP クロスドメインリクエストを行いたい開発シーンに最適です。

本プロジェクトでは、用途に合わせて2つの主要なバージョンを提供しています：

1. **V1 レガシー Release 版**：**jQuery 1.11.1** の元難読化パッケージを完全にアンフォールド（デコード）して復元した高互換ベース版（[jQuery.1.11.1.ajax.release.js](./jQuery.1.11.1.ajax.release.js) - 46KB / [jQuery.1.11.1.ajax.release.min.js](./jQuery.1.11.1.ajax.release.min.js) - 21.1KB）。すべての歴史的な構造とブラウザ互換性（レガシーな ActiveXObject を含む）をそのまま維持した、非常に安定した基盤です。
2. **V1 Rebuild 現代最適化版**：V1 Release 版をベースに、レガシーな IE 依存コードや不要なセレクターロジックを排除して再構築した近代化版（[jQuery.1.11.1.ajax.rebuild.js](./jQuery.1.11.1.ajax.rebuild.js) - 43KB / [jQuery.1.11.1.ajax.rebuild.min.js](./jQuery.1.11.1.ajax.rebuild.min.js) - 18.6KB）。

---

## 🚀 Rebuild 版の主な改善点

1. **レガシーな IE6/7/8 依存処理の完全排除**:
   - 古い IE 向けの ActiveXObject フォールバック判定を完全に廃止し、XML パーサーおよび XHR 生成処理をブラウザ標準の `window.XMLHttpRequest` と `DOMParser` に一本化しました。
   - 不要になった `unload` 時のメモリリーク対策（xhrCallbacks キューのクリーンアップ処理）を削除しました。
2. **jQuery.fn.init のスリム化**:
   - Sizzle 選択エンジンの不要な大容量ロジックを排除し、単純な DOM ラッピング、Ready 登録、およびマッチしなかった場合にネイティブな `querySelectorAll` へフォールバックする簡易ロジックに書き換えました。
3. **不要な DOM 操作メソッドの削除**:
   - 外部 DOM 操作に依存する `.load()` メソッドを排除し、Ajax ネットワーク特化のライブラリとして軽量化しました。
4. **100% 互換のネットワーク処理を維持**:
   - `prefilters`（プリフィルター）、`transports`（トランスポートチェーン）、`ajaxHandleResponses`（自動 Content-Type 判定）、`ajaxConvert`（json, xml, html, text 変換）および `jQuery.param` シリアライザを 100% 完備し、機能互換性を完全に維持しています。

---

## 🛠 使用方法

### 1. 直接スクリプトを読み込む（グローバル汚染ゼロ）
スクリプトを読み込むと、本ライブラリは自動的に `window.J$` グローバル名前空間に直接マウントされます。グローバルの `$` や `jQuery` は一切変更または汚染しないため、他のサードパーティライブラリとの競合を完全に防ぎます：
```html
<script type="text/javascript" src="jQuery.1.11.1.ajax.rebuild.min.js"></script>
```

### 2. 標準的な Ajax GET リクエスト
```js
window.J$.ajax({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  method: 'GET',
  dataType: 'json'
})
.done(function(data) {
  console.log('取得成功:', data);
})
.fail(function(xhr, status, error) {
  console.error('取得失敗:', error);
});
```

### 3. 標準的な Ajax POST リクエスト (JSON ペイロード)
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
  console.log('新規作成オブジェクト:', res);
})
.fail(function(xhr, status, error) {
  console.error('POSTリクエスト失敗:', error);
});
```

### 4. クロスドメイン JSONP リクエスト
```js
window.J$.ajax({
  url: 'https://api.github.com/users/MeMrVincent',
  dataType: 'jsonp',
  jsonp: 'callback' // バックエンドに渡すパラメータキー名
})
.done(function(res) {
  console.log('JSONPレスポンス:', res);
})
.fail(function(xhr, status, error) {
  console.error('JSONPリクエスト失敗:', error);
});
```

---

## 💡 設定オプション

| パラメータ | 型 | デフォルト値 | 説明 |
| :--- | :--- | :--- | :--- |
| `url` | `String` | `location.href` | リクエストの送信先APIエンドポイント。 |
| `type` / `method` | `String` | `'GET'` | HTTPリクエストメソッド（GET、POSTなど）。 |
| `dataType` | `String` | `なし` | 期待するレスポンスのデータタイプ（`'json'`, `'jsonp'`, `'xml'`, または `'text'`）。 |
| `contentType` | `String` | `'application/x-www-form-urlencoded; charset=UTF-8'` | リクエスト送信時に設定される Content-Type ヘッダー値。 |
| `data` | `Object` / `String` | `なし` | APIに送信するリクエストパラメータ。 |
| `timeout` | `Number` | `0` | リクエストのタイムアウト時間（ミリ秒）。 |
| `async` | `Boolean` | `true` | 非同期通信を行うかどうか（`false` で同期通信）。 |
