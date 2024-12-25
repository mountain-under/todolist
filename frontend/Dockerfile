# ベースイメージ
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクト全体をコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "start"]

# ポートの公開
EXPOSE 3000
