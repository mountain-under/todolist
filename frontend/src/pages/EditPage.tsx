// Reactの基本ライブラリをインポート
import React, { useState } from "react";
// React Routerを使用して現在のページ情報を取得し、ページ遷移を管理
import { useLocation, useNavigate } from "react-router-dom";
// Axiosを使用してバックエンドAPIと通信
import axios from "axios";
// Material-UIのコンポーネントをインポート（UI構築用）
import {
  Container, // ページ全体を包むレイアウトコンポーネント
  TextField, // テキスト入力用コンポーネント
  Button, // ボタンコンポーネント
  Typography, // テキスト表示用のコンポーネント
  Box, // フレックスボックスレイアウトを提供するコンポーネント
  Paper, // カードスタイルのコンテナ
} from "@mui/material";

// タスクデータの型定義
interface Todo {
  id: number; // タスクの一意の識別子
  title: string; // タスクのタイトル
  details: string | null; // タスクの詳細（nullを許容）
}

// EditPageコンポーネントの定義
const EditPage: React.FC = () => {
  // 現在のページ情報を取得
  const location = useLocation();
  // ページ遷移を管理するためのフック
  const navigate = useNavigate();

  // 前のページから渡された選択されたタスク情報を取得
  const { selectedTodos } = location.state as { selectedTodos: Todo[] };
  // 選択されたタスクの状態を管理（複数のタスクを編集可能）
  const [todos, setTodos] = useState<Todo[]>(selectedTodos);

  // タスクを保存する関数
  const handleSave = async () => {
    try {
      // 複数のタスクを並列で更新（Promise.allを使用）
      await Promise.all(
        todos.map((todo) =>
          axios.patch(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
            title: todo.title, // タスクのタイトルを更新
            details: todo.details, // タスクの詳細を更新
          })
        )
      );
      navigate("/list"); // 保存完了後、リストページに遷移
    } catch (err) {
      // エラー発生時の処理
      console.error("Failed to save tasks");
    }
  };

  // テキスト入力フィールドが変更されたときにタスクの状態を更新する関数
  const handleInputChange = (id: number, field: string, value: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, [field]: value } : todo // 該当するタスクのみ更新
      )
    );
  };

  // JSXでUIを定義
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}> {/* ページ全体を包むコンテナ */}
      {/* ページタイトル */}
      <Typography variant="h4" gutterBottom>
        タスク編集
      </Typography>

      {/* 編集対象のタスク一覧を表示 */}
      {todos.map((todo) => (
        <Paper
          key={todo.id} // 各タスクにユニークなキーを指定
          elevation={3} // カードの影を設定
          style={{ padding: "1rem", marginBottom: "1rem" }}
        >
          <Box display="flex" flexDirection="column" gap={2}> {/* 縦方向のレイアウト */}
            {/* タスクのタイトルを編集するテキストフィールド */}
            <TextField
              label="タイトル" // フィールドのラベル
              variant="outlined" // 枠線付きスタイル
              fullWidth // 横幅をコンテナに合わせる
              value={todo.title} // 入力値はstateとバインド
              onChange={(e) =>
                handleInputChange(todo.id, "title", e.target.value) // 入力値変更時にstateを更新
              }
            />

            {/* タスクの詳細を編集するテキストフィールド */}
            <TextField
              label="詳細" // フィールドのラベル
              variant="outlined" // 枠線付きスタイル
              fullWidth // 横幅をコンテナに合わせる
              multiline // 複数行入力を許可
              rows={3} // 表示する行数を指定
              value={todo.details || ""} // 入力値はstateとバインド
              onChange={(e) =>
                handleInputChange(todo.id, "details", e.target.value) // 入力値変更時にstateを更新
              }
            />
          </Box>
        </Paper>
      ))}

      {/* ボタンの配置 */}
      <Box display="flex" justifyContent="flex-end" gap={2}> {/* ボタンを右揃え */}
        {/* キャンセルボタン（リストページに戻る） */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/list")}
        >
          キャンセル
        </Button>

        {/* 保存ボタン（編集した内容を保存） */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </Box>
    </Container>
  );
};

// コンポーネントをエクスポート
export default EditPage;
