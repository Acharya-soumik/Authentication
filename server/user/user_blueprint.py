from database.db import *
import os
from flask import request, Blueprint
import json
import jwt

user = Blueprint("user", __name__)


@user.route("/details", methods=["POST"])
def details():
    token = request.headers.get('Authorization')
    token_encoded = token.split(' ')[1]
    decode_data = jwt.decode(
        token_encoded, 'rage', algorithms=['HS256'])
    user_id = decode_data["user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from user where id = %s""", (user_id,))
    res = cursor.fetchall()
    user = []
    for i in res:
        user.append(i)
    return json.dumps(user[0], default=str)


@user.route("/upload", methods=["POST"])
def upload_file(user_id):
    f = request.files['picture']
    cursor = mysql.connection.cursor()
    try:
        locationfolder = "../Client/public/image/" + str(user_id)
        os.mkdir(locationfolder)
        locationimage = "../Client/public/image/" + \
            str(user_id) + "/" + f.filename
        f.save(locationimage)
        img_path = "./image/"+str(user_id)+"/"+f.filename
        cursor.execute(
            """update user set image = %s where id = %s""", (img_path, int(user_id)))
        mysql.connection.commit()
        cursor.close()
        return {"path": img_path}
    except OSError:
        locationimage = "../Client/public/image/" + \
            str(user_id) + "/" + f.filename
        img_path = "./image/"+str(user_id)+"/"+f.filename
        f.save(locationimage)
        cursor.execute(
            """update user set image = %s where id = %s""", (img_path, int(user_id)))
        mysql.connection.commit()
        cursor.close()
        return {"path": img_path}
