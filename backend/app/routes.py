# FlaskのBlueprintをインポートしてルート管理を分離
from flask import Blueprint, request, jsonify
# モデルをインポート（UserとTodo）
from .models import User, Todo
# データベース操作用のインスタンスをインポート
from . import db

# ルート管理用のBlueprintを作成
main = Blueprint('main', __name__)

# ユーザーのサインアップ用エンドポイント
@main.route('/signup', methods=['POST'])
def signup():
    # クライアントからのリクエストデータをJSON形式で取得
    data = request.get_json()
    # Userモデルの新しいインスタンスを作成
    new_user = User(username=data['username'], password=data['password'])
    # データベースに新しいユーザーを追加
    db.session.add(new_user)
    db.session.commit()  # 変更を保存
    # 成功メッセージをJSON形式で返す
    return jsonify({'message': 'User created!'})

# ユーザーのサインイン用エンドポイント
@main.route('/signin', methods=['POST'])
def signin():
    # クライアントからのリクエストデータをJSON形式で取得
    data = request.get_json()
    # データベースから該当するユーザーを検索
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:  # ユーザーが存在する場合
        return jsonify({'message': 'User authenticated!', 'user_id': user.id})
    # ユーザーが存在しない場合
    return jsonify({'message': 'Invalid credentials'}), 401

# タスクの一覧取得と新規作成用エンドポイント
@main.route('/todos', methods=['GET', 'POST'])
def todos():
    if request.method == 'GET':  # タスク一覧の取得
        todos = Todo.query.all()  # データベースからすべてのタスクを取得
        return jsonify([
            {
                'id': todo.id,
                'title': todo.title,
                'details': todo.details,  # 詳細情報を含める
                'completed': todo.completed
            } for todo in todos
        ])
    elif request.method == 'POST':  # 新しいタスクの作成
        data = request.get_json()
        new_todo = Todo(
            title=data['title'],  # タスクのタイトル
            details=data.get('details'),  # タスクの詳細（オプション）
            user_id=data['user_id']  # ユーザーID
        )
        db.session.add(new_todo)
        db.session.commit()  # 変更を保存
        return jsonify({'message': 'Todo created!'})

# タスクの更新と削除用エンドポイント
@main.route('/todos/<int:todo_id>', methods=['PATCH', 'DELETE'])
def update_or_delete_todo(todo_id):
    # タスクIDに対応するタスクをデータベースから取得
    todo = Todo.query.get(todo_id)
    if not todo:  # 該当するタスクが存在しない場合
        return jsonify({'error': 'Todo not found'}), 404

    if request.method == 'PATCH':  # タスクの更新
        data = request.get_json()
        if 'title' in data:
            todo.title = data['title']  # タイトルを更新
        if 'details' in data:
            todo.details = data['details']  # 詳細を更新
        if 'completed' in data:
            todo.completed = data['completed']  # 完了状態を更新
        db.session.commit()  # 変更を保存
        return jsonify({'message': 'Todo updated!'})

    elif request.method == 'DELETE':  # タスクの削除
        db.session.delete(todo)  # タスクを削除
        db.session.commit()  # 変更を保存
        return jsonify({'message': 'Todo deleted!'})
