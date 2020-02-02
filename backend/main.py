# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_render_template]

import datetime
from flask import Flask, escape, request, render_template, jsonify
import spacy
from spacy.matcher import Matcher
from spacy.lang import en
spacy_stopwords = en.stop_words.STOP_WORDS
nlp = spacy.load('en')

from flask_cors import CORS
app = Flask(__name__)
app = CORS(app)

#Lemmatized symptoms
ALLERGIES = ["sneeze", "red", "itchy", "runny", "nose","blocked","allergic","watering","eyes", "wheezing", 
"chest", "tightness", "short", "breath", "cough", "rash", "swollen", "lips", "tongue", "pain", "stomach",
"sick", "vomiting", "diarrea", "dry"]
STROKE = ["sudden", "numb", "weak", "face", "arm", "leg", "one", "side", "body", "confuse",
"speak","understanding", "speech", "see", "eyes", "walk", "dizzy", "balance", "coordination","headache", "severe"]
HEART_ATTACK = ["pressure", "tightness", "pain", "ache", "arms", "chest", "neck", "jaw", "back", "nausea","indigestion",
"heartburn", "abdominal", "pain", "sweat", "fatigue", "lightheaded", "dizzy", "sudden"]
COUGH_FLU = ["cough", "flu", "headache", "sore", "throat", "pain","hot","ache","muscle", "fever","runny","nose"]
SKIN = ["blackheads", "white heads", "red", "bumps", "pimples", "pustules", "inflamed","nodules", "face",
"back", "chest", "neck", "itching", "draining", "pus", "cough","pink eye","runny","nose"]


#Decript: Categorizer that returns the category (string) with most matches 
#to input lemmas (pretty inefficent but functional for our current data set size)
#Input: array of lemmas
#Output: Category (string)
def symptomCategory(lemmas):
    cFCount = 0
    acCount = 0
    sCount = 0
    hACount = 0
    alCount = 0
    for lem in lemmas:
        # for word in ALLERGIES:
        #     if lem == word: 
        #         alCount+=1
        for word in STROKE:
            if lem == word:
                sCount += 1
        # for word in HEART_ATTACK:
        #     if lem == word:
        #         hACount += 1
        for word in COUGH_FLU:
            if word  == lem:
                cFCount+=1
        for word in SKIN:
            if word == lem:
                acCount+=1 
    if sCount < cFCount:
        if cFCount < acCount:
            return "Skin"
        else:
            return "Cold/Flu"
    else:
        if sCount < acCount:
            return "Skin"
        else:
            return "Stroke"
    

#Input: Takes in a JSON object with input string
#Return: JSON object with predicted category string
@app.route('/', methods=['POST'])
@cross_origin()
def home():
    # req_data = request.get_json()
    # input = req_data['input']
    # data = nlp(input) #generate nlp object
    # filtered = []
    # for word in data: #extract words
    #     if word.is_stop==False:
    #         filtered.append(word)
    # lemmas = []
    # for word in filtered: #lemmatize words
    #     lemmas.append(str(word.lemma_))
    # category = symptomCategory(lemmas);
    # return jsonify({"category":category})
    return "hello world"

if __name__ == '__main__':
#     # This is used when running locally only. When deploying to Google App
#     # Engine, a webserver process such as Gunicorn will serve the app. This
#     # can be configured by adding an `entrypoint` to app.yaml.
#     # Flask's development server will automatically serve static files in
#     # the "static" directory. See:
#     # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
#     # App Engine itself will serve those files as configured in app.yaml.
     #app.run(threaded=True, port=5000)
     app.run(host='0.0.0.0', port=5000)
# # [START gae_python37_render_template]

