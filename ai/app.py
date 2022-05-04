from flask import Flask
from flask_restx import Api
from nlp import api as nlp

app = Flask(__name__)
api = Api(app)

api.add_namespace(nlp, '/nlp')

if __name__ == '__main__':
    app.run(host='0.0.0.0')