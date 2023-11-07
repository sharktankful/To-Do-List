from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import firebase


config = {
  "apiKey": "AIzaSyBOIInpbo_R5d9CVWnDEv9bd4kAhDnuc9Q",
  "authDomain": "django-todolist-9c4c2.firebaseapp.com",
  'databaseURL': "https://django-todolist-9c4c2-default-rtdb.firebaseio.com",
  "projectId": "django-todolist-9c4c2",
  "storageBucket": "django-todolist-9c4c2.appspot.com",
  "messagingSenderId": "681608005103",
  "appId": "1:681608005103:web:a10b1e3e129eda32bb221a",
  "measurementId": "G-0ES7CVWSD5"
}


app = firebase.initialize_app(config)
auth = app.auth()
database = app.database()



# CREATES NEW USER AND STORAGE WITH UID AS THE UNIQUE KEY
@api_view(['POST'])
def create_user(request):
    # EXTRACTS USER SIGNUP INFORMATION
    data = request.data
    email = data.get('email')
    password = data.get('password')

    try:
        # CREATES USER AND DATABASE FOR USER
        user = auth.create_user_with_email_and_password(email=email, password=password)
        uid = user['localId']

        # SAVES EMAIL, PASSWORD AND TASKS TO THE DATABASE WHILE RETURNING THE UID TO THE FRONTEND
        # FOR ACCESSING USER'S CREATED TASKS
        database.child('Data').child('Users').child(uid).child('Email').set(email)
        database.child('Data').child('Users').child(uid).child('Password').set(password)
        database.child('Data').child('Users').child(uid).child('Tasks').set('')

        return Response({'uid': uid}, status=201)
    except Exception as e:
        # RETURNS AN ERROR STATUS IF SIGNUP INFO IS INVALID
        return Response({'error': str(e)}, status=400)




# SUBMITS INFORMATION TO FIRESTORE DATABASE'S UNIQUE KEY (UID)
@api_view(['POST'])
def create_task(request):
    data = request.data
    uid = data.get('uid')
    message = data.get('message')

    try:
        task = database.child('Data').child('Users').child(uid).child('Tasks').push(message)
        return Response({task.get('name'): message}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


# DELETES DATA AT DATABASE'S UNIQUE KEY (UID) AND REMOVES EVERYTHING FROM IT
@api_view(['DELETE'])
def delete_task(request):
    data = request.data
    uid = data.get('uid')
    message_key = data.get('message_key')
    
    try:
        database.child('Data').child('Users').child(uid).child('Tasks').child(message_key).remove()
        return Response(status=204)
    except Exception as e:
        return Response({'error': str(e)}, status=404)



# RECEIVE DATE AND TASK DESCRIPTION FROM DATABASE
@api_view(['GET'])
def get_task(request):
    name = database.child('Data').child('Name').get().val()
    stack = database.child('Data').child('Stack').get().val()
    framework = database.child('Data').child('Framework').get().val()
    date = database.child('Data').child('Date').get().val()

    context = {
        'name':name,
        'stack':stack,
        'framework':framework,
        'date':date
    }
    return Response(context)



