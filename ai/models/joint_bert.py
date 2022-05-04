# -*- coding: utf-8 -*-
"""
@author: mwahdan
"""

import tensorflow as tf
from tensorflow.python.keras import backend as K
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.layers import Input, Dense, Multiply, TimeDistributed
from models.nlu_model import NLUModel
# from layers.bert_layer import BertLayer
#from layers.korbert_layer import KorBertLayer
from layers.albert_layer import AlbertLayer
import numpy as np
import os
import json


class JointBertModel(NLUModel):

    def __init__(self, slots_num, intents_num, bert_hub_path, sess, num_bert_fine_tune_layers=10,
                 is_bert=False, is_training=True):
        self.slots_num = slots_num
        self.intents_num = intents_num
        self.bert_hub_path = bert_hub_path
        self.num_bert_fine_tune_layers = num_bert_fine_tune_layers
        self.is_bert = is_bert
        self.is_training = is_training
        #self.bert_config_path = '/home/demiust/data1/A090_dialogue_engine/bert/002_bert_morp_tensorflow/' # KorBert by Etri

        self.model_params = {
                'slots_num': slots_num,
                'intents_num': intents_num,
                'bert_hub_path': bert_hub_path,
                'num_bert_fine_tune_layers': num_bert_fine_tune_layers,
                'is_bert': is_bert
                }

        self.build_model()
        self.compile_model()

        self.initialize_vars(sess)


    def compile_model(self):
        # Instead of `using categorical_crossentropy`,
        # we use `sparse_categorical_crossentropy`, which does expect integer targets.

        optimizer = tf.keras.optimizers.Adam(lr=5e-5)#0.001)

        losses = {
        	'time_distributed': 'sparse_categorical_crossentropy',
        	'intent_classifier': 'sparse_categorical_crossentropy',
        }

        loss_weights = {'time_distributed': 0.0, 'intent_classifier': 4.0}

        metrics = {'intent_classifier': 'acc'}

        self.model.compile(optimizer=optimizer, loss=losses, loss_weights=loss_weights, metrics=metrics)
        print('before summary')
        self.model.summary()
        print('after summary')


    def build_model(self):
        in_id = Input(shape=(None,), dtype=tf.int32, name='input_ids')
        in_mask = Input(shape=(None,), dtype=tf.int32, name='input_masks')
        in_segment = Input(shape=(None,), dtype=tf.int32, name='segment_ids')
        #in_valid_positions = Input(shape=(None, self.slots_num), dtype=tf.float32, name='valid_positions')

        # in_valid_positions = K.ones(shape=(64, self.slots_num), name='valid_positions')
        bert_inputs = [in_id, in_mask, in_segment] # tf.keras layers

#        if self.is_bert and self.bert_hub_path != None:
#            bert_pooled_output, bert_sequence_output = KorBertLayer(
#                seq_len=64,
#                n_tune_layers=self.num_bert_fine_tune_layers,
#                pooling='mean',
#                verbose=False,
#                name='KorBertLayer')(bert_inputs)
#        else:
#             bert_pooled_output, bert_sequence_output = AlbertLayer(
#                fine_tune=True if self.num_bert_fine_tune_layers > 0 else False,
#                albert_path=self.bert_hub_path,
#                pooling='mean', name='AlbertLayer')(bert_inputs)

        # print('==== joint bert ====')
        # print('bert inputs output :', bert_inputs[0].shape)
        # print('bert inputs output :', bert_inputs[1].shape)
        # print('bert inputs output :', bert_inputs[2].shape)
        bert_pooled_output, bert_sequence_output = AlbertLayer(
           fine_tune=True if self.num_bert_fine_tune_layers > 0 else False,
           albert_path=self.bert_hub_path,
           pooling='mean', name='AlbertLayer')(bert_inputs)

        # print('bert pooled output :', bert_pooled_output.shape)
        # print('bert sequence output :', bert_sequence_output.shape)
        intents_fc = Dense(self.intents_num, activation='softmax', name='intent_classifier')(bert_pooled_output)

        slots_output = TimeDistributed(Dense(self.slots_num, activation='softmax'))(bert_sequence_output)


        print('slots output :', slots_output.shape)

        self.model = Model(inputs=bert_inputs, outputs=[slots_output, intents_fc])


    def fit(self, X, Y, validation_data=None, epochs=5, batch_size=64):
        """
        X: batch of [input_ids, input_mask, segment_ids, valid_positions]
        """
        # X = (X[0], X[1], X[2], self.prepare_valid_positions(X[3]))
        X = (X[0], X[1], X[2])
        if validation_data is not None:
            X_val, Y_val = validation_data
            #validation_data = ((X_val[0], X_val[1], X_val[2], self.prepare_valid_positions(X_val[3])), Y_val)
            validation_data = ((X_val[0], X_val[1], X_val[2]), Y_val)

        history = self.model.fit(X, Y, validation_data=validation_data,
                                 epochs=epochs, batch_size=batch_size)
        #self.visualize_metric(history.history, 'time_distributed_loss')
        #self.visualize_metric(history.history, 'intent_classifier_loss')
        #self.visualize_metric(history.history, 'loss')
        #self.visualize_metric(history.history, 'intent_classifier_acc')

    # def prepare_valid_positions(self, in_valid_positions):
    #     in_valid_positions = np.expand_dims(in_valid_positions, axis=2)
    #     in_valid_positions = np.tile(in_valid_positions, (1, 1, self.slots_num))

    #     print(f'in valid positions : {in_valid_positions}')
    #     return in_valid_positions

    def initialize_vars(self, sess):
        sess.run(tf.compat.v1.local_variables_initializer())
        sess.run(tf.compat.v1.global_variables_initializer())
        K.set_session(sess)


    def predict_slots_intent(self, x, slots_vectorizer, intent_vectorizer, remove_start_end=True):
        # valid_positions = x[3]
        # x = (x[0], x[1], x[2])
        input_ids = x[0]
        # x = [input_ids, input_mask, segment_ids]
        y_slots, y_intent = self.predict(x)

        # print(x)
        print('type y_slots: ', type(y_slots))
        print('type y_intent: ', type(y_intent))
        print('y slots :', y_slots.shape)
        print('y_intent :', y_intent.shape)
        # print('y slots :', y_slots)
        # print('y_intent :', y_intent)

        slots = slots_vectorizer.inverse_transform(y_slots, input_ids)

        def notPAD(element):
            if element == '<PAD>':
                return False
            else:
                return True
#        slots = [list(filter(notPAD, x)) for x in slots]

#        if remove_start_end:
#            slots = [x[1:-1] for x in slots]

        y_slots = np.array(y_slots)
        slots_score = np.array([[np.max(a) for a in y_slots[i][1:(len(slots[i])+1)]] for i in range(y_slots.shape[0])])

        first_intents_score = np.array([np.max(y_intent[i]) for i in range(y_intent.shape[0])])
        first_intents = np.array([intent_vectorizer.inverse_transform([np.argmax(y_intent[i])])[0] for i in range(y_intent.shape[0])])
        second_intents_score = np.array([np.sort(y_intent[i])[-2] for i in range(y_intent.shape[0])])
        second_intents = np.array([intent_vectorizer.inverse_transform([np.argsort(y_intent[i])[-2]])[0] for i in range(y_intent.shape[0])])

        return slots, first_intents, first_intents_score, second_intents, second_intents_score, slots_score

    def predict_slots_intent_allsenets(self, x, slots_vectorizer, intent_vectorizer, remove_start_end=True):

        # valid_positions = x[3]
        # x = (x[0], x[1], x[2])
        input_ids = x[0]
        # x = [input_ids, input_mask, segment_ids]
        y_slots, y_intent = self.predict(x)

        # print('y slots :', y_slots.shape)
        # print('y_intent :', y_intent.shape)
        # print('y slots :', y_slots)
        # print('y_intent :', y_intent)

        slots = slots_vectorizer.inverse_transform(y_slots, input_ids)

        def notPAD(element):
            if element == '<PAD>':
                return False
            else:
                return True
#        slots = [list(filter(notPAD, x)) for x in slots]

#        if remove_start_end:
#            slots = [x[1:-1] for x in slots]

        y_slots = np.array(y_slots)
        slots_score = np.array([[np.max(a) for a in y_slots[i][1:(len(slots[i])+1)]] for i in range(y_slots.shape[0])])

        first_intents_score = np.array([np.max(y_intent[i]) for i in range(y_intent.shape[0])])
        first_intents = np.array([intent_vectorizer.inverse_transform([np.argmax(y_intent[i])])[0] for i in range(y_intent.shape[0])])
        second_intents_score = np.array([np.sort(y_intent[i])[-2] for i in range(y_intent.shape[0])])
        second_intents = np.array([intent_vectorizer.inverse_transform([np.argsort(y_intent[i])[-2]])[0] for i in range(y_intent.shape[0])])

        return slots, first_intents, first_intents_score, second_intents, second_intents_score, slots_score

    def save(self, model_path):
        with open(os.path.join(model_path, 'params.json'), 'w') as json_file:
            json.dump(self.model_params, json_file)
        self.model.save(os.path.join(model_path, 'joint_bert_model.h5'))

    def load(load_folder_path, sess): # load for inference or model evaluation
        with open(os.path.join(load_folder_path, 'params.json'), 'r') as json_file:
            model_params = json.load(json_file)

        slots_num = model_params['slots_num']
        intents_num = model_params['intents_num']
        bert_hub_path = model_params['bert_hub_path']
        num_bert_fine_tune_layers = model_params['num_bert_fine_tune_layers']
        is_bert = model_params['is_bert']

        new_model = JointBertModel(slots_num, intents_num, bert_hub_path, sess, num_bert_fine_tune_layers, is_bert, is_training=False)
        new_model.model.load_weights(os.path.join(load_folder_path,'joint_bert_model.h5'))

        # print({t.name: t for t in new_model.model.inputs})
        # print("================")
        # print({t.name: t for t in new_model.model.outputs})
        # print("================")
        # tf.keras.backend.set_learning_phase(0)
        # with tf.keras.backend.get_session() as sess:
        #     tf.saved_model.simple_save(sess,
        #                            './emotion_classifier/',
        #                            inputs={t.name: t for t in new_model.model.inputs},
        #                            outputs={t.name: t for t in new_model.model.outputs}
        #                            )


        return new_model
