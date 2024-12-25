-- データベースの初期化スクリプト

-- 使用するデータベースを作成
CREATE DATABASE IF NOT EXISTS todo_db;

-- 作成したデータベースを使用
USE todo_db;

-- ユーザー情報を保存するテーブルを作成
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ユーザーID（自動増加）
    username VARCHAR(80) NOT NULL UNIQUE, -- ユーザー名（一意で必須）
    password VARCHAR(200) NOT NULL -- パスワード（必須）
);

-- タスク情報を保存するテーブルを作成
CREATE TABLE IF NOT EXISTS todo (
    id INT AUTO_INCREMENT PRIMARY KEY, -- タスクID（自動増加）
    title VARCHAR(200) NOT NULL, -- タスクのタイトル（必須）
    details VARCHAR(500), -- タスクの詳細（オプション）
    completed BOOLEAN DEFAULT FALSE, -- タスクの完了状態（デフォルトは未完了）
    user_id INT NOT NULL, -- ユーザーID（外部キー）
    FOREIGN KEY (user_id) REFERENCES user(id) -- 外部キー制約（ユーザーテーブルのIDを参照）
);
