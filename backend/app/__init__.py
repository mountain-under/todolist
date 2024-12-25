# Flaskライブラリをインポートしてアプリケーションの初期化を行う
from flask import Flask
# SQLAlchemyライブラリをインポートしてデータベース操作を容易にする
from flask_sqlalchemy import SQLAlchemy
# CORSライブラリをインポートしてクロスオリジンリソース共有を有効化
from flask_cors import CORS

# SQLAlchemyのインスタンスを作成
# データベース操作のためのグローバルなオブジェクト
db = SQLAlchemy()

# アプリケーションの工場関数を定義
# 複数のインスタンスを作成できるようにするための設計
def create_app():
    # Flaskアプリケーションのインスタンスを作成
    app = Flask(__name__)
    
    # CORS設定を有効化（他のオリジンからのリクエストを許可）
    CORS(app)
    
    # データベースの接続URIを設定
    # MySQLデータベースを使用し、ユーザー名、パスワード、ホスト、ポート、データベース名を指定
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:password@db:3306/todo_db'
    
    # SQLAlchemyのトラック変更機能を無効化（パフォーマンス向上のため）
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # SQLAlchemyオブジェクトをアプリケーションに紐付け
    db.init_app(app)
    
    # ルート（エンドポイント）を含むモジュールをインポート
    from .routes import main
    # Blueprintをアプリケーションに登録（ルートの管理を簡素化）
    app.register_blueprint(main)
    
    # 初期化されたアプリケーションを返す
    return app
