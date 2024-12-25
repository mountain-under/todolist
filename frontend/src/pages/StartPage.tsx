// Reactの基本ライブラリをインポート
import React from "react";
// React RouterのLinkコンポーネントを使用してページ遷移を簡単に実現
import { Link } from "react-router-dom";
// Material-UIのコンポーネントをインポート（UI構築用）
import {
  Container, // ページ全体を包むレイアウトコンポーネント
  Typography, // テキスト表示用のコンポーネント
  Button, // ボタンコンポーネント
  Box, // フレックスボックスレイアウトを提供するコンポーネント
} from "@mui/material";

// StartPageコンポーネントの定義
const StartPage: React.FC = () => {
  // JSXでUIを定義
  return (
    <Container
      maxWidth="sm" // コンテナの最大幅を設定（小型デバイス向け）
      style={{ textAlign: "center", marginTop: "3rem" }} // 中央揃えとマージン設定
    >
      {/* ウェルカムメッセージのタイトル */}
      <Typography variant="h3" gutterBottom>
        ようこそ！Todoアプリへ
      </Typography>

      {/* ボタンを配置するボックス */}
      <Box mt={4}> {/* 上部にマージンを追加 */}
        {/* サインインボタン */}
        <Button
          variant="contained" // 塗りつぶしスタイル
          color="primary" // プライマリカラー（テーマ設定による）
          component={Link} // ボタンをリンクとして動作させる
          to="/signin" // サインインページへのパス
          style={{ marginRight: "1rem" }} // ボタン間のスペースを確保
        >
          サインイン
        </Button>

        {/* サインアップボタン */}
        <Button
          variant="outlined" // 枠線スタイル
          color="secondary" // セカンダリカラー（テーマ設定による）
          component={Link} // ボタンをリンクとして動作させる
          to="/signup" // サインアップページへのパス
        >
          サインアップ
        </Button>
      </Box>
    </Container>
  );
};

// コンポーネントをエクスポート（他のファイルで使用可能にする）
export default StartPage;
