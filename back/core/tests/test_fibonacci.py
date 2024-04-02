"""Tests for the FibonacciResultSerializer."""

from datetime import datetime

import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from ..models import FibonacciResult
from ..serializers import FibonacciResultSerializer


@pytest.mark.django_db
def test_fibonacci_result_serializer():
    """Test the FibonacciResultSerializer."""
    user = get_user_model().objects.create_user(
        username="testuser", email="user@test.com", password="testpass123"
    )
    data = {
        "user": user.id,
        "parameter": 10,
    }

    serializer = FibonacciResultSerializer(data=data)

    assert serializer.is_valid(), serializer.errors
    instance = serializer.save()

    assert instance.result == str(55), "The Fibonacci calculation is incorrect."
    assert instance.parameter == 10, "The parameter value was not saved correctly."
    assert instance.user == user, "The user instance is not correctly associated."
    assert 0 < instance.execution_time < 1, "The execution time seems off."
    assert isinstance(
        instance.date_launched, datetime
    ), "date_launched is not set correctly."


@pytest.mark.django_db
def test_fibonacci_results_by_user():
    """Test the FibonacciResultsByUserAPIView."""
    # Setup test user and fibonacci results
    user = User.objects.create_user(username="testuser", password="12345")
    client = APIClient()
    client.force_authenticate(user=user)

    # Create FibonacciResult instances
    FibonacciResult.objects.create(
        user=user,
        parameter=5,
        result="5",
        execution_time=0.01,
        date_launched=timezone.now(),
    )

    url = reverse(
        "fibonacci-by-user", kwargs={"user_id": user.id}
    )  # Adjust the URL name as per your urls.py
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1  # Assuming only one result is created


@pytest.mark.django_db
def test_user_last_fibonacci():
    """Test the UserLastFibonacciAPIView."""
    user = User.objects.create_user(username="testuser", password="12345")
    client = APIClient()
    client.force_authenticate(user=user)

    FibonacciResult.objects.create(
        user=user,
        parameter=3,
        result="2",
        execution_time=0.01,
        date_launched=timezone.now(),
    )
    last_result = FibonacciResult.objects.create(
        user=user,
        parameter=10,
        result="55",
        execution_time=0.01,
        date_launched=timezone.now() + timezone.timedelta(seconds=1),
    )

    url = reverse(
        "user-last-fibonacci", kwargs={"user_id": user.id}
    )  # Adjust the URL name as per your urls.py
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data["result"] == str(last_result.result)
