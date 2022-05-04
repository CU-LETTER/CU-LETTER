# -*- coding: utf-8 -*-
"""
@author: mwahdan
"""

import tensorflow as tf
import numpy as np
import sys
#from vectorizers import mecab_tokenization
from vectorizers import albert_tokenization
class BERTVectorizer:
    
    def __init__(self, sess, is_bert,
                 bert_model_hub_path="./bert-module"):

        print('initializing!')
        self.sess = sess
        print('sess :', self.sess)
        self.is_bert = is_bert
        print('is_bert :', self.is_bert)
        self.bert_model_hub_path = bert_model_hub_path
        print('bert_model_hub_path :', self.bert_model_hub_path)
        self.tokenizer = albert_tokenization.FullTokenizer('./albert-module/assets/v0.vocab')


        print('initialized!')
    
        
    # def tokenize(self, text: str):
    #     words = text.split() # whitespace tokenizer
    #     tokens = []
    #     for i, word in enumerate(words):
    #         token = self.tokenizer.tokenize(word)
    #         tokens.extend(token)
    #         # for i in range(len(token)):
    #         #     if i == 0:
    #         #         valid_positions.append(1)
    #         #     else:
    #         #         valid_positions.append(0)
    #     return tokens
    
    
    def transform(self, text_arr):
        # print('transform started')

        input_ids = []
        input_mask = []
        segment_ids = []
        # valid_positions = []

        for text in text_arr: 

            ids, mask, seg_ids= self.__vectorize(text.strip())

            input_ids.append(ids)
            input_mask.append(mask)
            segment_ids.append(seg_ids)
            # valid_positions.append(valid_pos)

        sequence_lengths = np.array([len(i) for i in input_ids])            
        input_ids = tf.keras.preprocessing.sequence.pad_sequences(input_ids, padding='post')
        input_mask = tf.keras.preprocessing.sequence.pad_sequences(input_mask, padding='post')
        segment_ids = tf.keras.preprocessing.sequence.pad_sequences(segment_ids, padding='post')
        #valid_positions = tf.keras.preprocessing.sequence.pad_sequences(valid_positions, padding='post')
        return input_ids, input_mask, segment_ids, sequence_lengths
    
    
    def __vectorize(self, text: str):

        # str -> tokens list
        tokens = text.split() # whitespace tokenizer
        # valid_positions = []
        # for i, token in enumerate(tokens):
            # for i in range(len(token)):

            # # 앞에 ## 없으면 1
            # if '##' not in token:
            #     valid_positions.append(1)

            # # 앞에 ## 있으면 0
            # else:
            #     valid_positions.append(1)

        # insert "[CLS]"
        tokens.insert(0, '[CLS]')
        # valid_positions.insert(0, 1)
        # insert "[SEP]"
        tokens.append('[SEP]')
        # valid_positions.append(1)
        
        #print('text arr :', tokens)

        segment_ids = [0] * len(tokens)
        input_ids = self.tokenizer.convert_tokens_to_ids(tokens)

        input_mask = [1] * len(input_ids)
        
        return input_ids, input_mask, segment_ids
        
