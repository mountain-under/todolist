# __init__.pyファイルで初期化されたdbインスタンスをインポート
from . import db

# Userモデルの定義
class User(db.Model):
    # ユーザーID（主キー）
    id = db.Column(db.Integer, primary_key=True)
    # ユーザー名（80文字以内で一意、必須項目）
    username = db.Column(db.String(80), unique=True, nullable=False)
    # パスワード（200文字以内、必須項目）
    password = db.Column(db.String(200), nullable=False)

# Todoモデルの定義
class Todo(db.Model):
    # タスクID（主キー）
    id = db.Column(db.Integer, primary_key=True)
    # タスクのタイトル（200文字以内、必須項目）
    title = db.Column(db.String(200), nullable=False)
    # タスクの詳細（500文字以内、必須ではない）
    details = db.Column(db.String(500), nullable=True)
    # タスクの完了状態（デフォルトは未完了）
    completed = db.Column(db.Boolean, default=False)
    # ユーザーID（外部キーとしてUserモデルのIDを参照）
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
