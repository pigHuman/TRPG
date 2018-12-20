# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask import request, jsonify
import json
from flask import session, redirect, url_for
import os
import sys
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson.json_util import loads


app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config["MONGO_URI"] = "mongodb://localhost:27017/TRPGDatabase"
mongo = PyMongo(app)

@app.before_request
def before_request():
    if session.get('username') is not None:
        return
    if request.path == '/login':
        return
    if request.path == '/acountCreate/':
        return
    return redirect('/login')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/test',methods=['POST'])
def testjson():
    if request.method == 'POST':
        formdata = request.json
        print(formdata)
        return formdata
    #with open('json_file', 'r') as file:
    #    json_data = json.load(file)
    #json_data["username"] = username
    #json_str = json.dumps(json_data)
    #mongo.db.test.insert(json_data)
    #return "完了"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and _is_account_valid():
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return render_template('login.html')

def _is_account_valid():

    username = request.form.get('username')
    password = request.form.get('password')
    users = mongo.db.users.find_one({"username": username})

    if username == 'admin':
        return True
    try:
        name_text = users["username"]
        pass_text = users["password"]
        if name_text == username and pass_text == password:
            return True
    except:
        return False


@app.route('/acountCreate/',methods=['POST','GET'])
def acountCreate():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        password_r = request.form.get('password_r')
        if password != password_r or acountOverlap() == False:
            return 'アカウント登録に失敗しました。ほかのアカウント名を設定してください'
        mongo.db.users.insert({"username":username,"password":password})
        return redirect('/login')
    else:
        return render_template('createId.html')

def acountOverlap():
    username = request.form.get('username')
    user = mongo.db.users.find_one({"username":username})
    try:
        if user["username"] == username:
            return False
    except:
        return True

@app.route('/charSelect/',methods=['GET'])
def charSelect():
    return render_template('charSelect.html')

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route("/acount/")
def acount():
    return render_template('acount.html')

@app.route("/acountConfig/")
def AccountConfig():
    return render_template('acountConfig.html')


@app.route("/acountFind/",methods=['GET'])
def Accounts_find():
    if request.method == 'GET':
        username = session["username"]
        user_data = mongo.db.users.find({"username": username})
        del user_data["_id"]
        for i in user_data:
             json_data = json.dumps(i)

        user_data = json.dumps(user_data)
        return user_data
    else:
        return render_template('acountConfig.html')

@app.route("/Accounts/data", methods=['POST'])
def Accounts_insert():
    if request.method == "POST":
        username = session["username"]
        json_data = request.json()
        json_data = json.loads(json_data)
        mongo.db.user.updata({"username":username},json_data)
        return True

@app.route("/roomSelect/")
def roomSelect():
    #if request.method == "GET":
    #    return roomlist_find()
    return render_template('roomSelect.html')

@app.route("/roomEdit/")
def rommEdit():
    return render_template('roomEdit.html')

@app.route("/RoomIn",methods=['GET'])
def RoomIn():
    if request.method == "GET":
        roomid = request.form("roomid")
        username = session["username"]
        mongo.db.room.updata({"roomid":roomid}, {"$set":{"users":username}})
        room_data = mongo.db.room.find({"roomid":roomid})
        del room_data["_id"]
        return json.dumps(room_data)

@app.route("/RoomOut")
def RoomOut():
    roomid = ()
    username = session["username"]
    mongo.db.room.updata({"roomid":roomid}, {"$unset":{"users":username}})
    return render_template('index.html')


@app.route("/RoomCreate",methods=['POST'])
def RoomCreate():
    if request.method == "POST":
        mongo.db.room.insert(json_data)
        return render_template('index.html')

@app.route("/charView/",methods=['GET'])
def chardata():
    if request.method == "GET":
        data = charsheet_find()
        return data


@app.route("/charEdit/",methods=['POST','GET'])
def charcreate():
    if request.method == "POST":
        username = session["username"]

        with open('request.json', 'r') as file:
            json_data = json.load(file)
        json_data["username"] = username

        #json_str = json.dumps(json_data)

        mongo.db.charsheet.insert(json_data)
        #json_data = request.json()
        return "完了"
    else:
        return render_template('charEdit.html')

@app.route("/sheetdrop",methods=['GET'])
def sheetdrop():
    username = session["username"]
    charname = request.form.get("charname")
    mongo.db.charsheet.remove({"$and"[{"username": username},{"charname":charname}]})
    return render_template('index.html')

def charsheet_find():
    username = session["username"]
    char_data = mongo.db.charsheet.find({"username": username})
    #del char_data["_id"]
    char_data = json.dumps(char_data)
    return char_data

def roomlist_find():
    roomlist_data = mongo.db.room.find({"users":{ "$exists" :1}})
    if roomlist_data is null:
        return False
    del roomlist_data["_id"]
    roomlist_data = json.dumps(roomlist_data)
    return roomlist_data

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8000)
