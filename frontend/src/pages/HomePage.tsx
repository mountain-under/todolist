// Reactの基本ライブラリをインポート
import React, { useState } from "react";
// Axiosを使ってバックエンドAPIと通信
import axios from "axios";
// ページ遷移を管理するためにReact RouterのuseNavigateをインポート
import { useNavigate } from "react-router-dom";
// Material-UIのコンポーネントをインポートしてスタイリング
import { Container, TextField, Button, Typography, Box } from "@mui/material";

// HomePageコンポーネント（このページでは新しいタスクを追加します）
const HomePage: React.FC = () => {
  // ユーザーが入力したタスク名を管理するstate
  const [task, setTask] = useState(""); // 初期値は空文字
  // ユーザーが入力した詳細情報を管理するstate
  const [details, setDetails] = useState(""); // 初期値は空文字
  // 入力エラー時のメッセージを管理するstate
  const [error, setError] = useState(""); // 初期値は空文字
  // ページ遷移用のフック
  const navigate = useNavigate();

  // フォーム送信時にタスクを追加する関数
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のデフォルト動作（ページリロード）を防止

    // タスク名が入力されているかをチェック
    if (!task.trim()) { // trim()で前後の空白を除去
      setError("タスク名は必須です。"); // エラーメッセージを設定
      return; // 処理を終了
    }
    setError(""); // エラーメッセージをクリア

    // ローカルストレージからユーザーIDを取得
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID is not set"); // エラーメッセージをコンソールに出力
      return; // 処理を終了
    }

    try {
      // タスクをバックエンドAPIに送信して保存
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        title: task, // タスク名
        details: details, // 詳細情報
        user_id: parseInt(userId), // ユーザーID（文字列を整数に変換）
      });

      // 入力フィールドをリセット
      setTask(""); // タスク名を空にする
      setDetails(""); // 詳細を空にする
      navigate("/list"); // タスク一覧ページに遷移
    } catch (err) {
      console.error("Failed to add task"); // タスク追加失敗時のエラー出力
    }
  };

  // JSXで画面のUIを定義
  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}> {/* 中央揃えのコンテナ */}
      {/* ページタイトル */}
      <Typography variant="h4" gutterBottom>
        新しいタスクを追加
      </Typography>

      {/* タスク追加用フォーム */}
      <form onSubmit={handleAddTask}> {/* フォーム送信時にhandleAddTaskを呼び出す */}
        {/* タスク名入力フィールド */}
        <TextField
          label="タスク名" // ラベル
          variant="outlined" // 枠線付きスタイル
          fullWidth // 横幅をコンテナに合わせる
          value={task} // 入力値はtaskステートにバインド
          onChange={(e) => setTask(e.target.value)} // 入力値変更時にtaskを更新
          margin="normal" // マージン設定
          error={!!error} // エラーがある場合に赤枠を表示
          helperText={error} // エラーメッセージを表示
        />

        {/* 詳細情報入力フィールド */}
        <TextField
          label="詳細" // ラベル
          variant="outlined" // 枠線付きスタイル
          fullWidth // 横幅をコンテナに合わせる
          multiline // 複数行入力を可能にする
          rows={4} // 行数を指定
          value={details} // 入力値はdetailsステートにバインド
          onChange={(e) => setDetails(e.target.value)} // 入力値変更時にdetailsを更新
          margin="normal" // マージン設定
        />

        {/* タスク追加ボタン */}
        <Box mt={2}> {/* 上部にマージンを追加 */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            追加
          </Button>
        </Box>

        {/* タスク一覧ページへの遷移ボタン */}
        <Box mt={2}> {/* 上部にマージンを追加 */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/list")} // ボタン押下時にタスク一覧ページへ遷移
          >
            タスク一覧へ
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default HomePage; // HomePageコンポーネントをエクスポート
