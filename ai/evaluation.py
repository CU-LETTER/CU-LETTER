# -*- coding: utf-8 -*-
"""
@author: jungwonchang
"""

from vectorizers.bert_vectorizer import BERTVectorizer
from vectorizers.tags_vectorizer import TagsVectorizer
from vectorizers import albert_tokenization
from mecab import MeCab
import numpy as np 
import json 

import math
import os, re
import pickle
import requests
import tensorflow as tf
from sklearn import metrics

class Evaluation():
    def __init__(self):
        # "/인물;한지민/과 /인물;한예슬/ 나오는 드라마 있어?"와 같은 예시처럼
        # 해당 데이터에서는 "/슬롯(레이블)명;엔티티/"의 형식으로 슬롯과 엔티티를 정리해 놨으므로,
        # 이를 잡아 줄 수 있는 정규표현식을 준비한다.
        self.slot_pattern = re.compile(r"/(.+?);(.+?)/")
        self.multi_spaces = re.compile(r"\s+")

        self.mecab = MeCab()

        VALID_TYPES = ['bert', 'albert']

        # args = parser.parse_args()
        load_folder_path = '/home/ubuntu/ai_dev/NIA_model/save_model/epoch30'
        # data_folder_path = args.data
        # positive_value = args.pv
        # type_ = args.type

        # this line is to disable gpu
        os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

        config = tf.ConfigProto(intra_op_parallelism_threads=8,
                                inter_op_parallelism_threads=0,
                                allow_soft_placement=True,
                                device_count={'GPU': 1})
        sess = tf.Session(config=config)

        bert_model_hub_path = './albert-module'
        is_bert = False
        self.tokenizer = albert_tokenization.FullTokenizer('./albert-module/assets/v0.vocab')

        self.bert_vectorizer = BERTVectorizer(sess, is_bert, bert_model_hub_path)

        # loading models
        print('Loading encoder ...')
        if not os.path.exists(load_folder_path):
            print('Folder `%s` not exist' % load_folder_path)

        with open(os.path.join(load_folder_path, 'tags_vectorizer.pkl'), 'rb') as handle:
            self.tags_vectorizer = pickle.load(handle)
            slots_num = len(self.tags_vectorizer.label_encoder.classes_)
        with open(os.path.join(load_folder_path, 'intents_label_encoder.pkl'), 'rb') as handle:
            self.intents_label_encoder = pickle.load(handle)
            intents_num = len(self.intents_label_encoder.classes_)

    def do_mecab(self, string):
        return ' '.join(self.mecab.morphs(string))

    def add_seperator(self, text):
        sep_text = ''
        sp_text = re.split('([.!?])', text)

        for idx in range(len(sp_text)):
            sep_text += sp_text[idx]
            if idx % 2 == 1:
                if idx != len(sp_text) - 2:
                    sep_text += ' + '
        return sep_text

    def process_text(self, text):
        """
        블루웨일 단방향 데이터가 있는 file_path을 argument로 주면 가공을 한 이후에
        저장해 주는 함수.
        """
        data = text.splitlines()

        # line별로 process를 해준 뒤,
        processed_data = [self.process_line(line) for line in data]

        tokens = list(map(lambda x: x[0], processed_data))
        labels = list(map(lambda x: x[1], processed_data))
        intentions = list(map(lambda x: x[2], processed_data))

        intentions[0] += '\n'
        tokens[0] += '\n'
        labels[0] += '\n'

        return tokens, labels, intentions

    def slice_text(self, text):
        """
        Text를 문장 갯수를 기반으로 반으로 쪼개주기
        """
        sp_text = re.split('([ + ])', text)

        left_text = ''
        right_text = ''

        sep_idx = int(len(sp_text) / 2) - 1
        for idx in range(len(sp_text)):
            if idx < sep_idx:
                left_text += sp_text[idx]
            elif idx > sep_idx:
                right_text += sp_text[idx]

        # print('sep_idx: ', sep_idx)
        # print('ORIGIN NUM: ', len(sp_text))
        # print('ORIGIN TEXT: ', text)
        # print('LEFT TEXT: ', left_text)
        # print('RIGHT TEXT: ', right_text)

        return left_text, right_text


    def process_line(self, line):
        """
        블루웨일 데이터를 라인별로 처리해 주는 함수이다.
        라인을 주게 되면, (토큰, 슬롯(레이블))

        (다만 토크나이저에 따라 토크나이징을 하는 방식이 상이하므로 이 부분에 대해서는 코드 수정을 해주어야 한다.)

        예를 들어 "/인물;한지민/과 /인물;한예슬/ 나오는 드라마 있어?" 같은 input을 받게 되면,
            ('한 지민 과 한예 슬 나오 는 드라마 있 어 ?', '인물 인물 O 인물 인물 O O O O O O')와 같은 (토큰, slot)쌍으로 된 결과값을 반환한다.
        """
        intention = '0'
        sentence = line

        sentence_list = sentence.split("+")
        sentence_tokenized_list = []
        labels_list = []

        for sentence in sentence_list:
            # slots = slot_pattern.findall(sentence)
            line_refined = self.slot_pattern.sub("/슬롯/", sentence)
            tokens = ""
            labels = ""
            slot_index = 0

            for word in line_refined.split():
                word_tokens = " ".join(self.tokenizer.tokenize(self.do_mecab(word)))

                tokens += word_tokens + " "
                labels += ("O" + " ") * len(word_tokens.split())

            tokens = tokens.replace('##', '')
            tokens = self.multi_spaces.sub(" ", tokens.strip())
            labels = self.multi_spaces.sub(" ", labels.strip())

            # 만일 토큰의 개수와 슬롯의 개수가 맞지 않다면 본래 라인과 더불어 토큰/슬롯들을 프린트해준다.
            if len(tokens.split()) != len(labels.split()):
                print(line)
                print("\t" + tokens + "\t", len(tokens.split()))
                print("\t" + labels + "\t", len(labels.split()))

            sentence_tokenized_list.append(tokens)
            labels_list.append(labels)

        joined_sents = ' + '.join(sentence_tokenized_list)
        joined_labels = ' + '.join(labels_list)
        ### labels 는 전체 length만 맞춰서 만들기

        return joined_sents, joined_labels, intention


    def get_result(self, x):
        data = json.dumps({
            "signature_name": "serving_default",
            "instances": [{
                'input_ids:0': x[0].reshape(-1).tolist(),
                'input_masks:0': x[1].reshape(-1).tolist(),
                'segment_ids:0': x[2].reshape(-1).tolist()
            }]
        })
        # # DATA
        # print("data:", data)
        headers = {"content-type": "application/json"}
        json_response = requests.post('http://localhost:8501/v1/models/emotion_model:predict', data=data, headers=headers)
        # # JSON_response
        # print("json_response:", json_response)
        predictions = json.loads(json_response.text)['predictions']

        y_slots = np.array(predictions[0].get('time_distributed/Reshape_1:0')).reshape(1, -1, 2)
        y_intent = np.array(predictions[0].get('intent_classifier/Softmax:0')).reshape(1, 6)

        return y_intent[0]


    def eval(self, content):
        # READ TOKENIZED TEXT DIRECTLY
        text = self.add_seperator(content)

        print('==== Evaluation ====')
        resultList = []
        self.recur_eval(text, resultList)

        result = [0, 0, 0, 0, 0, 0]
        for i in range(len(resultList)):
            for j in range(len(result)):
                result[j] += resultList[i][j]

        happy = 0
        angry = 0
        sad = 0
        panic = 0

        for i in range(len(result)):
            result[i] /= len(resultList)
            if i == 0:
                angry += result[i]
            elif i == 1 or i == 3:
                sad += result[i]
            elif i == 2 or i == 4:
                panic += result[i]
            elif i == 5:
                happy += result[i]

        print('RESULT LIST: ', result)
        print("======= Done =======")
        return {
            "happy": math.trunc(happy * 100) / 100,
            "angry": math.trunc(angry * 100) / 100,
            "sad": math.trunc(sad * 100) / 100,
            "panic": math.trunc(panic * 100) / 100
        }

    def recur_eval(self, text, resultList):
        data_text_arr, data_tags_arr, data_intents = self.process_text(text)
        data_input_ids, data_input_mask, data_segment_ids, data_sequence_lengths = self.bert_vectorizer.transform(data_text_arr)

        if len(data_input_ids[0]) > 512:
            left_text, right_text = self.slice_text(text)
            self.recur_eval(left_text, resultList)
            self.recur_eval(right_text, resultList)
        else:
            resultList.append(self.get_result([data_input_ids, data_input_mask, data_segment_ids]).tolist())


