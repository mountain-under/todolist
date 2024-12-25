// Reactの基本ライブラリをインポート
import React, { useState } from "react";
// Axiosを使用してバックエンドAPIと通信
import axios from "axios";
// React Routerを使用してページ遷移を管理
import { useNavigate } from "react-router-dom";
// Material-UIのコンポーネントをインポート（UI構築用）
import {
  Container, // ページ全体を包むレイアウトコンポーネント
  TextField, // テキスト入力用コンポーネント
  Button, // ボタンコンポーネント
  Typography, // テキスト表示用のコンポーネント
  Box, // フレックスボックスレイアウトを提供するコンポーネント
  Alert, // エラーメッセージや通知表示用コンポーネント
} from "@mui/material";

// サインインページコンポーネントの定義
const SignInPage: React.FC = () => {
  // ユーザー名を保存する状態変数
  const [username, setUsername] = useState(""); // 初期値は空文字列
  // パスワードを保存する状態変数
  const [password, setPassword] = useState(""); // 初期値は空文字列
  // エラーメッセージを保存する状態変数
  const [error, setError] = useState(""); // 初期値は空文字列
  // ページ遷移を管理するためのフック
  const navigate = useNavigate();

  // サインインボタンがクリックされたときに実行される関数
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト動作（ページリロード）を防止

    try {
      // バックエンドAPIにサインインリクエストを送信
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
        username, // ユーザー名
        password, // パスワード
      });

      // サインインが成功した場合の処理
      if (response.data.user_id) {
        localStorage.setItem("user_id", response.data.user_id.toString()); // ユーザーIDをローカルストレージに保存
        navigate("/home"); // ホームページに遷移
      }
    } catch (err: any) {
      // サインインが失敗した場合の処理
      setError(err.response?.data?.message || "認証に失敗しました"); // エラーメッセージを設定
    }
  };

  // JSXでUIを定義
  return (
    <Container maxWidth="sm" style={{ marginTop: "3rem" }}> {/* ページ全体を包むコンテナ */}
      {/* ページタイトル */}
      <Typography variant="h4" gutterBottom>
        サインイン
      </Typography>

      {/* サインインフォーム */}
      <form onSubmit={handleSignIn}> {/* フォーム送信時にhandleSignInを呼び出す */}
        {/* ユーザー名入力フィールド */}
        <TextField
          label="ユーザー名" // 入力フィールドのラベル
          variant="outlined" // 枠線付きスタイル
          fullWidth // 横幅をコンテナに合わせる
          value={username} // 入力値はstateとバインド
          onChange={(e) => setUsername(e.target.value)} // 入力値変更時にstateを更新
          margin="normal" // フィールド間のマージンを設定
          required // 必須入力フィールド
        />

        {/* パスワード入力フィールド */}
        <TextField
          label="パスワード" // 入力フィールドのラベル
          type="password" // 入力内容を非表示にする
          variant="outlined" // 枠線付きスタイル
          fullWidth // 横幅をコンテナに合わせる
          value={password} // 入力値はstateとバインド
          onChange={(e) => setPassword(e.target.value)} // 入力値変更時にstateを更新
          margin="normal" // フィールド間のマージンを設定
          required // 必須入力フィールド
        />

        {/* エラーメッセージの表示 */}
        {error && <Alert severity="error">{error}</Alert>} {/* エラーがある場合に表示 */}

        {/* サインインボタン */}
        <Box mt={2}> {/* 上部にマージンを追加 */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            サインイン
          </Button>
        </Box>
      </form>
    </Container>
  );
};

// コンポーネントをエクスポート（他のファイルで使用可能にする）
export default SignInPage;
