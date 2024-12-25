// 必要なReactのライブラリをインポート
import React, { useEffect, useState } from "react";
// Axiosを使ってバックエンドAPIと通信（HTTPリクエストを簡単に行うためのライブラリ）
import axios from "axios";
// React Routerを使ってページ遷移を管理（画面遷移やURL管理を簡単にするため）
import { useNavigate } from "react-router-dom";
// Material-UIのコンポーネントをインポート（ReactでスタイリッシュなUIを構築するためのライブラリ）
import {
  Container, // ページ全体を包むレイアウトコンポーネント
  Button, // ボタンコンポーネント
  Checkbox, // チェックボックスコンポーネント
  Typography, // テキスト表示用のコンポーネント
  Paper, // 見た目がカード状になるコンテナ
  Box, // フレックスボックスレイアウトを提供するコンポーネント
  Dialog, // モーダルウィンドウのコンポーネント
  DialogActions, // モーダルのボタン部分を包むコンポーネント
  DialogContent, // モーダルの内容部分を包むコンポーネント
  DialogContentText, // モーダルの説明テキスト用コンポーネント
  DialogTitle, // モーダルのタイトル部分を包むコンポーネント
} from "@mui/material";

// タスク情報の型定義（TypeScriptの機能を使用してデータの構造を定義）
interface Todo {
  id: number; // タスクを一意に識別するID
  title: string; // タスクの名前
  details: string | null; // タスクの詳細情報（文字列またはnullを許容）
  completed: boolean; // タスクが完了しているかどうかを示すフラグ
}

// タスクリストを表示するListPageコンポーネントの定義
const ListPage: React.FC = () => {
  // タスク一覧を保存する状態変数（初期値は空の配列）
  const [todos, setTodos] = useState<Todo[]>([]);
  // 選択されたタスクのIDを保存する状態変数（初期値は空の配列）
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  // 削除確認ダイアログが開いているかどうかを示す状態変数（初期値はfalse）
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  // React Routerのnavigate関数（ページ遷移を実行するための関数）
  const navigate = useNavigate();

  // コンポーネントが初めて表示されたときにタスクデータを取得する
  useEffect(() => {
    // 非同期関数としてタスクを取得する処理を定義
    const fetchTodos = async () => {
      try {
        // バックエンドAPIからタスク一覧を取得
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
        // 取得したタスクデータを状態変数にセット
        setTodos(response.data);
      } catch (err) {
        // データ取得に失敗した場合のエラーログ
        console.error("Failed to fetch tasks");
      }
    };
    // 定義したタスク取得関数を実行
    fetchTodos();
  }, []); // []を指定することで、コンポーネントが初めてマウントされたときにのみ実行

  // チェックボックスの選択状態を切り替える関数
  const toggleSelect = (id: number) => {
    // 選択状態を更新
    setSelectedTodos((prev) =>
      prev.includes(id) // 現在選択されているかどうかを確認
        ? prev.filter((todoId) => todoId !== id) // 選択解除
        : [...prev, id] // 新たに選択
    );
  };

  // タスクを完了状態に更新する関数
  const handleCompleteTask = async (id: number) => {
    try {
      // APIを呼び出してタスクの状態を完了に変更
      await axios.patch(`${process.env.REACT_APP_API_URL}/todos/${id}`, { completed: true });
      // ローカルの状態を更新
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
      );
    } catch (err) {
      // 完了処理が失敗した場合のエラーログ
      console.error("Failed to complete task");
    }
  };

  // タスクを未完了状態に戻す関数
  const handleUncompleteTask = async (id: number) => {
    try {
      // APIを呼び出してタスクの状態を未完了に変更
      await axios.patch(`${process.env.REACT_APP_API_URL}/todos/${id}`, { completed: false });
      // ローカルの状態を更新
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed: false } : todo))
      );
    } catch (err) {
      // 未完了処理が失敗した場合のエラーログ
      console.error("Failed to uncomplete task");
    }
  };

  // 編集ページに遷移する関数
  const handleEditTask = () => {
    // 選択されたタスクを取得
    const selectedTasks = todos.filter((todo) => selectedTodos.includes(todo.id));
    // 編集ページに遷移し、選択されたタスクをstateとして渡す
    navigate("/edit", { state: { selectedTodos: selectedTasks } });
  };

  // 選択されたタスクを削除する関数
  const handleDeleteSelected = async () => {
    // 削除確認ダイアログを閉じる
    setOpenConfirmDialog(false);
    try {
      // 選択されたタスクをすべて削除
      await Promise.all(
        selectedTodos.map((id) => axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`))
      );
      // ローカルの状態を更新（削除したタスクを除外）
      setTodos((prev) => prev.filter((todo) => !selectedTodos.includes(todo.id)));
      // 選択リストをクリア
      setSelectedTodos([]);
    } catch (err) {
      // 削除処理が失敗した場合のエラーログ
      console.error("Failed to delete tasks");
    }
  };

  // JSXでUIを定義（画面に表示される内容）
  return (
    <Container> {/* ページ全体を包むコンテナ */}
      {/* タイトル表示 */}
      <Typography variant="h4" gutterBottom>
        タスクリスト
      </Typography>

      {/* 操作ボタンの表示 */}
      <Box mb={2}> {/* ボタン間のスペースを確保 */}
        {/* ホームに戻るボタン */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
          style={{ marginRight: "1rem" }}
        >
          ホームに戻る
        </Button>
        {/* 編集ボタン */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditTask}
          disabled={selectedTodos.length === 0} // 選択されたタスクがない場合は無効化
        >
          編集
        </Button>
        {/* 削除ボタン */}
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenConfirmDialog(true)}
          disabled={selectedTodos.length === 0} // 選択されたタスクがない場合は無効化
          style={{ marginLeft: "1rem" }}
        >
          削除
        </Button>
      </Box>

      {/* タスクリストの表示 */}
      {todos.map((todo) => (
        <Paper key={todo.id} elevation={3} style={{ padding: "1rem", margin: "0.5rem 0" }}> {/* 各タスクをカードとして表示 */}
          <Box display="flex" justifyContent="space-between" alignItems="center"> {/* タスクカードのレイアウト */}
            <Box display="flex" alignItems="center"> {/* タスク名と詳細情報の部分 */}
              {/* タスク選択用のチェックボックス */}
              <Checkbox
                checked={selectedTodos.includes(todo.id)} // チェックボックスの状態を反映
                onChange={() => toggleSelect(todo.id)} // チェックボックスの状態を更新
                disabled={todo.completed} // 完了したタスクは選択不可
              />
              {/* タスク名と詳細を表示する部分 */}
              <Box>
                <Typography
                  variant="h6"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none", // 完了タスクには取り消し線を表示
                  }}
                >
                  {todo.title} {/* タスク名 */}
                </Typography>
                {todo.details && ( /* 詳細情報が存在する場合のみ表示 */
                  <Typography variant="body2" color="textSecondary">
                    {todo.details} {/* タスクの詳細情報 */}
                  </Typography>
                )}
              </Box>
            </Box>
            {/* 完了/未完了ボタンの切り替え */}
            <Box>
              {todo.completed ? (
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => handleUncompleteTask(todo.id)}
                >
                  完了取り消し
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleCompleteTask(todo.id)}
                >
                  完了
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      ))}

      {/* 削除確認ダイアログの表示 */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}> {/* ダイアログの開閉状態 */}
        <DialogTitle>削除の確認</DialogTitle> {/* ダイアログのタイトル */}
        <DialogContent>
          <DialogContentText>
            選択したタスクを本当に削除しますか？この操作は取り消せません。
          </DialogContentText> {/* 削除の確認メッセージ */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary"> {/* キャンセルボタン */}
            キャンセル
          </Button>
          <Button onClick={handleDeleteSelected} color="error"> {/* 削除ボタン */}
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListPage; // このコンポーネントを他のファイルで使えるようにエクスポート
