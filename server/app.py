import json
from database.db import *
from auth.auth_blueprint import auth
from user.user_blueprint import user
from flask import request

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(user, url_prefix="/user")


@app.route("/")
def home():
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from cars_data limit 20,10""")
    res = cursor.fetchall()
    cursor.close()
    data = []
    for i in res:
        data.append(i)
    return json.dumps(data, default=str)


@app.route("/page")
def page():
    perPage = request.args.get("per_page")
    cur_page = request.args.get("cur_page")
    page = int(perPage)
    p_page = int(cur_page)
    cursor = mysql.connection.cursor()
    # cursor.execute("""select * from cars_data order by id asc limit  %s,%s""",
    #                (p_page*page, p_page - 1,))
    # res = cursor.fetchall()
    # cursor.close()
    # data = [x for x in res]
    # return json.dumps({"data": data, "total_data": len(data)}, default=str), 201
    return "hello"


if __name__ == "__main__":
    app.run(debug=True, port=5001)
