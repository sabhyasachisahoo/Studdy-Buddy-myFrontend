from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
import random

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Dummy user data
user_data = {
    "name": "Priyanshu Tiwary",
    "profilePic": "/profile.jpg",
    "profession": "Software Developer",
    "comment": "Passionate about learning!",
    "linkedin": "https://linkedin.com/in/priyanshu",
    "github": "https://github.com/priyanshu",
    "website": "https://priyanshu.dev",
    "twitter": "https://twitter.com/priyanshu",
    "rating": 1923,
    "totalProblemsSolved": 1355,
    "easySolved": 453,
    "mediumSolved": 772,
    "hardSolved": 130,
    "problemSolvingProgress": 80
}

leaderboard = [
    {"name": "Alice", "score": 1985},
    {"name": "Bob", "score": 1870},
    {"name": "Priyanshu", "score": 1923},
]

notifications = [
    {"message": "New coding contest this weekend!"},
    {"message": "You unlocked a new achievement!"}
]

@app.route('/api/userData', methods=['GET'])
def get_user_data():
    return jsonify(user_data)

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(leaderboard)

@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

@socketio.on('connect')
def handle_connect():
    print("Client connected")
    emit("updateUserData", user_data)
    emit("updateLeaderboard", leaderboard)
    emit("newNotification", notifications)

@socketio.on('solve_problem')
def solve_problem(data):
    user_data["totalProblemsSolved"] += 1
    user_data["problemSolvingProgress"] += 1
    socketio.emit("updateUserData", user_data)

@socketio.on('new_contest_rating')
def new_contest_rating(data):
    user_data["rating"] = data["new_rating"]
    socketio.emit("updateUserData", user_data)

@socketio.on('new_notification')
def new_notification(data):
    notifications.append({"message": data["message"]})
    socketio.emit("newNotification", notifications)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=3000)
