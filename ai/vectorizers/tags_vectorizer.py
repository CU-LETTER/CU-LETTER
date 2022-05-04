# -*- coding: utf-8 -*-
"""
@author: mwahdan
"""

from sklearn.preprocessing import LabelEncoder
import numpy as np


class TagsVectorizer:
    
    def __init__(self):
        pass
    
    def tokenize(self, tags_str_arr):
        return [s.split() for s in tags_str_arr]
    
    
    def fit(self, tags_str_arr):
        self.label_encoder = LabelEncoder()
        # data = ['<PAD>'] + [item for item in self.tokenize(tags_str_arr)]
        data = ['<PAD>'] + [item for sublist in self.tokenize(tags_str_arr) for item in sublist]

        #print('fit data :', data)

        self.label_encoder.fit(data)
    
    def transform(self, tags_str_arr, input_ids):

        seq_length = input_ids.shape[1]
        # print('tags_str_arr :', tags_str_arr)
        # print('valid_positions :', valid_positions)

        # print('valid_positions.shape :', valid_positions.shape)

        data = self.tokenize(tags_str_arr)
        # print('data 1 :', data)
        data = [self.label_encoder.transform(['O'] + x + ['O']).astype(np.int32) for x in data]
        # print('data 2 :', data)

        data = np.array(data)
        # print('len(data) :', len(data))
        # print('seq_length :', seq_length)


        output = np.zeros((len(data), seq_length))
        # for i in range(len(data)):
        #     idx = 0
        #     for j in range(seq_length):
        #         print('i, j :', i, j)
        #         # if valid_positions[i][j] == 1:
        #         output[i][j] = data[i][idx]
        #         idx += 1
        
        for i in range(len(data)):
            # idx = 0
            for j in range(len(data[i])):
                
                # print('data i len :', len(data[i]))
                # print('i, j :', i, j)


                # if valid_positions[i][j] == 1:
                
                output[i][j] = data[i][j]
                # idx += 1    


        
        # print('output :', output)
        # print('output :', output, '\n')

        return output
        # return train_tags
    
    def inverse_transform(self, model_output_3d, input_ids):

        seq_length = input_ids.shape[1]
        slots = np.argmax(model_output_3d, axis=-1)

        slots = [self.label_encoder.inverse_transform(y) for y in slots]
        output = []

        # print('slots :', slots)

        for i in range(len(slots)):
            y = []
            for j in range(seq_length):
            #     if valid_positions[i][j] == 1:
                y.append(str(slots[i][j]))
            output.append(y)
        return output

    def simple_inverse_transform(self, slots, input_ids):

        seq_length = input_ids.shape[1]

        slots = [self.label_encoder.inverse_transform(y) for y in slots]
        output = []

        # print('slots :', slots)

        for i in range(len(slots)):
            y = []
            for j in range(seq_length):
            #     if valid_positions[i][j] == 1:
                y.append(str(slots[i][j]))
            output.append(y)
        return output
    
    def load(self):
        pass
    
    def save(self):
        pass

    
if __name__ == '__main__':
    # # 던 ##전 ##앤 ##파 ##이터 준 ##비
    # # 준 ##비 부 ##탁 ##해 리 ##듬
    tags_str_arr = ['B-game I-game I-game I-game I-game O O', 'O O O O O O O']
    valid_positions = np.array([[1, 1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 0, 1, 0, 0, 1, 0, 1]])

    # tags_str_arr = ['O O B-X B-Y', 'O B-Y O']
    # valid_positions = np.array([[1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 1, 1, 0, 1]])

    vectorizer = TagsVectorizer()
    vectorizer.fit(tags_str_arr)
    data = vectorizer.transform(tags_str_arr, valid_positions)
    #print(vectorizer.label_encoder.classes_)
