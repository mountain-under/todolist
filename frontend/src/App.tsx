// Reactの基本ライブラリをインポート
import React from "react";
// React Routerをインポートしてアプリのルーティングを設定
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// ページコンポーネントをインポート
import StartPage from "./pages/StartPage"; // 開始ページ
import SignInPage from "./pages/SignInPage"; // サインインページ
import SignUpPage from "./pages/SignUpPage"; // サインアップページ
import HomePage from "./pages/HomePage"; // ホームページ
import ListPage from "./pages/ListPage"; // タスクリストページ
import EditPage from "./pages/EditPage"; // タスク編集ページ

// アプリケーション全体を管理するコンポーネント
const App: React.FC = () => {
  return (
    // React Routerを使用してルーティングを管理
    <Router>
      <Routes>
        {/* ルートごとにページコンポーネントを割り当て */}
        <Route path="/" element={<StartPage />} /> {/* トップページ（開始ページ） */}
        <Route path="/signin" element={<SignInPage />} /> {/* サインインページ */}
        <Route path="/signup" element={<SignUpPage />} /> {/* サインアップページ */}
        <Route path="/home" element={<HomePage />} /> {/* ホームページ */}
        <Route path="/list" element={<ListPage />} /> {/* タスクリストページ */}
        <Route path="/edit" element={<EditPage />} /> {/* タスク編集ページ */}
      </Routes>
    </Router>
  );
};

// Appコンポーネントをエクスポート（他のファイルで使用可能にする）
export default App;
