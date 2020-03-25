from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
app = Flask(__name__)
CORS(app)

app.config["MYSQL_HOST"] = "localhost"
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '999Plus1@'
app.config['MYSQL_DB'] = 'blog'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)
