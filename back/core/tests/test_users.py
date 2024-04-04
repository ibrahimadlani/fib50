""" Tests for the users app. """

import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_create_user():
    """Test creating a new user."""
    client = APIClient()
    url = reverse("user-create")
    data = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "newpassword123",
    }
    response = client.post(url, data, format="json")
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username="newuser").exists()


@pytest.mark.django_db
def test_change_password(django_user_model):
    """Test the change password functionality."""
    user = django_user_model.objects.create_user(
        username="testuser", password="oldpassword"
    )
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("change-password")
    data = {
        "old_password": "oldpassword",
        "new_password": "newpassword123",
        "confirm_new_password": "newpassword123",
    }
    response = client.post(url, data, format="json")
    assert response.status_code == status.HTTP_200_OK
    user.refresh_from_db()
    assert user.check_password("newpassword123")
