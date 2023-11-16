from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import firebase, jwt


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

secret_key = settings.JWT_SECRET_KEY



# CREATES NEW USER AND STORAGE WITH UID AS THE UNIQUE KEY
@api_view(['POST'])
def create_user(request):
    # EXTRACTS USER SIGNUP INFORMATION FROM FOURM
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

        # GENERATE A JWT TOKEN
        token_payload = {'uid': uid}
        token = jwt.encode(token_payload, secret_key, algorithm='HS256')

        # DATA TO BE INCLUDED IN THE RESPONSE
        response_data = {
            'status': 'Successfully created account!',
            'token': token
        }

        return Response(response_data, status=201)
    except Exception as e:
        # RETURNS AN ERROR STATUS IF SIGNUP INFO IS INVALID
        return Response({'error': str(e)}, status=400)


# LOGS IN USER AND RETURNS THERE UID
@api_view(['POST'])
def login_user(request):
     # EXTRACTS USER LOGIN INFORMATION FROM FOURM
    data = request.data
    email = data.get('email')
    password = data.get('password')

    try:
        # LOGIN USER
        user = auth.sign_in_with_email_and_password(email=email, password=password)
        account_info = auth.get_account_info(user['idToken'])
        # RETURNS USER'S UID TO FRONTEND WHEN LOGGED IN
        print("Successfully Logged In!")
        return Response(account_info, status=201)
    except Exception as e:
        # RETURNS AN ERROR STATUS IF LOG IN INFO IS INVALID
        return Response({'error': str(e)}, status=400)





# SUBMITS INFORMATION TO FIRESTORE DATABASE'S UNIQUE KEY (UID)
@api_view(['POST'])
def create_task(request):
    message = request.data.get('message')
    token = request.headers.get('Authorization', '').split('Bearer ')[1]  # Get the JWT from the Authorization header

    try:
        # Decode the JWT and extract the UID
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        uid = decoded_token.get('uid')

        task = database.child('Data').child('Users').child(uid).child('Tasks').push(message)
        return Response({task.get('name'): message}, status=201)
    
    except Exception as e:
        return Response({'error': str(e)}, status=400)


# DELETES DATA AT DATABASE'S UNIQUE KEY (UID) AND REMOVES EVERYTHING FROM IT
@api_view(['DELETE'])
def delete_task(request):
    token = request.headers.get('Authorization', '').split('Bearer ')[1]  # Get the JWT from the Authorization header
    message_key = request.data.get('message_key')

    try:
        # Decode the JWT and extract the UID
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        uid = decoded_token.get('uid')

        database.child('Data').child('Users').child(uid).child('Tasks').child(message_key).remove()
        return Response({'status': 'message deleted'}, status=204)
    except Exception as e:
        return Response({'error': str(e)}, status=404)



# RECEIVE TASK DESCRIPTIONS FROM DATABASE
@api_view(['GET'])
def get_task(request):
    token = request.headers.get('Authorization', '').split('Bearer ')[1]  # Get the JWT from the Authorization header

    try:
        # Decode the JWT and extract the UID
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        uid = decoded_token.get('uid')

        tasks = database.child('Data').child('Users').child(str(uid)).child('Tasks').get().val()
        return Response(tasks, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=404)
