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
#This is an example of hosting a server in python using flask with multiple examples


#import statements
import datetime
from flask import Flask, escape, request, render_template, jsonify
import spacy
from spacy.matcher import Matcher
from spacy.lang import en
spacy_stopwords = en.stop_words.STOP_WORDS
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)

#home route, probably just want to use this for deploying
@app.route('/', methods=['POST'])
def home():
    req_data = request.get_json()
    input = req_data['input']
    data = nlp(input) #generate 
    filtered_input = []
    filtered = []
    for word in data:
        if word.is_stop==False:
            filtered_input.append(str(word))
            filtered.append(word)
    lemmas = []
    for word in filtered:
        lemmas.append(str(word.lemma_))

    #also need to assert "stop" should be translated to "continous" (the context, 'i can't stop coughing)
    return jsonify({"relevant": True,"filteredinput":filtered_input, "lemmas": lemmas})

#this demos how we can make post requests to this the /json-example page
@app.route('/json-example', methods=['POST']) #GET requests will be blocked
def json_example():
    req_data = request.get_json()
    input = req_data['input']
    return jsonify(input)



if __name__ == '__main__':
#     # This is used when running locally only. When deploying to Google App
#     # Engine, a webserver process such as Gunicorn will serve the app. This
#     # can be configured by adding an `entrypoint` to app.yaml.
#     # Flask's development server will automatically serve static files in
#     # the "static" directory. See:
#     # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
#     # App Engine itself will serve those files as configured in app.yaml.
     app.run(host='127.0.0.1', port=5000, debug=True)
# # [START gae_python37_render_template]
''' 

{
    "language" : "Python",
    "framework" : "Flask",
    "website" : "Scotch",
    "version_info" : {
        "python" : 3.4,
        "flask" : 0.12
    },
    "examples" : ["query", "form", "json"],
    "boolean_test" : true
} '''

