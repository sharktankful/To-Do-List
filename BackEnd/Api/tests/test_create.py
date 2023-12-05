from rest_framework import status
from rest_framework.test import APIClient

# Create your tests here.
class TestCreateTasks:
    def test_creating_user_returns_201(self):
        client = APIClient()
        response = client.post('https://todolistapi.com/create/', {'email': '*****@gmail.com', 'password': '000000000'})

        assert response.status_code == status.HTTP_201_CREATED