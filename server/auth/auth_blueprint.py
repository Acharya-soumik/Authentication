from flask import Blueprint
from flask import Response
import os
import base64
import json
import hashlib
from database.db import *
import math
import jwt
from flask import request
from database.db import *

auth = Blueprint("auth", __name__)


def generate_salt():
    salt = os.urandom(16)
    return base64.b64encode(salt)


def hashed_pass(password, salt):
    hash = hashlib.md5()
    new_str = password+salt
    hash.update(new_str.encode('utf-8'))
    return hash.hexdigest()


def create_user(name, email, pasword, salt):
    cursor = mysql.connection.cursor()
    cursor.execute("""insert into user (name,email,password,salt,created_at) values (%s,%s,%s,%s,now())""",
                   (name, email, pasword, salt))
    mysql.connection.commit()
    cursor.close()
    return


def register(name, password, email):
    if len(email) < 5:
        return {"error": True, "status": 400, "message": "invalid credentials"}
    else:
        cursor = mysql.connection.cursor()
        cursor.execute(
            """select * from user where email = %s limit 1""", (email,))
        res = cursor.fetchall()
        if (res):
            return {"error": True, "status": 400, "message": "user already exists"}
    salt = generate_salt()
    new_pass = hashed_pass(password, salt)
    create_user(name, email, new_pass, salt)
    return {"error": False, "status": 200, "message": "registration successfull"}


def check_auth(email, password):
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from user where email = %s""", (email,))
    res = cursor.fetchall()
    if not res:
        return {"error": True, "status": 400, "message": "invalid email"}
    else:
        data = list()
        for i in res:
            data.append(i)
        salt = data[0]["salt"]
        user_pass = data[0]["password"]
        _hashed = hashed_pass(password, salt)
        if _hashed == user_pass:
            token = jwt.encode(
                {"user_id": data[0]["id"], "email": data[0]["email"]}, "rage", algorithm="HS256")
            return {"error": False, "status": 200, "login": str(token), "message": "login successfull"}
        else:
            return {"error": True, "status": 200, "message": "wrong password"}


@auth.route("/login")
def login():
    email = request.json["email"]
    password = request.json["password"]
    res = check_auth(email, password)
    return json.dumps(res)


@auth.route("/signup", methods=["POST"])
def signup():
    name = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]
    res = register(name, password, email)
    return json.dumps(res)
