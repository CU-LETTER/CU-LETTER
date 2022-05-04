from flask import request
from flask_restx import Resource, Namespace
from evaluation import Evaluation

api = Namespace('NLP')
eval_model = Evaluation()

@api.route('')
class NLP(Resource):
    def post(self):
        content = request.json.get('content')

        return eval_model.eval(content)