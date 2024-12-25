// Reactの基本ライブラリをインポート
import React from "react";
// ReactアプリをDOMにレンダリングするためのライブラリをインポート
import ReactDOM from "react-dom/client";
// アプリケーション全体を定義するコンポーネントをインポート
import App from "./App";

// ルートDOMノードを取得し、それをReactアプリケーションのエントリーポイントとして使用
// getElementByIdはindex.html内の<div id="root">を取得
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Reactアプリケーションをレンダリング
// <App />はアプリ全体のコンポーネントで、React Routerを利用してページを切り替える
root.render(<App />);
