Our challenge was to create a product that increases accessibilty to knowlege that everyone is entitled to have. We focused on the healthcare sector, as access to affordable and immediate health care advice is not an option that everyone has. While googling symptoms is quite common, the results often don't immediately take into account important considerations like the user's past pertinent medical history or co-morbid symptoms. We had about 36 hours to implement and demo this project over the course of the weekend, which consists of a frontend chrome extension and simple backend nlp-based classifier. *This tool is NOT meant to diagnose or replace the advice of a physician.*

# Demos
Demo videos of components are provided in the demo folder.

# Components
The front end portions were written in javascript and the backend was written in python and deployed to a temporary web sever with ngrok. 

# Frontend
The extension pulls relevent medical-related searches from the search bar and POSTs to the server. Then once a category is determined, the exension asks a series of followup questions to better refine the user's question

# Backend
Sentence extracted from searchbar is POSTed using Flask and read into an NPL object. The SpaCy library was used to tokenize and lemmatize the input data, which is then cross referenced against a list of linked key terms to return a medical category. 

# UI
We spent the majority of our time creating and connecting the extention and backend components so the time we had left was put towards demonstrating the functionality rather than the aesthetics of the exention. Ideally we intended to only take up a small potion of the screen with the exentio window once the query is activated.

# Future Plans
Integrating patient data through external sources like 23 and Me could be used to better refine pertinent suggestions. In the future, database integration and more robust NLP processing would be ideal. Connecting/collaborating with a medical provider like Kaiser Permenente and integrating existing direct pipelines to connect with a patient's physician through the extention would also help make the process of aquiring medical knowledge quicker and more intuitive (however securing user data would be a large portion of the process).
