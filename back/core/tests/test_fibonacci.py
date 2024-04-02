"""Tests for the FibonacciResultSerializer."""
from datetime import datetime
import pytest
from django.contrib.auth import get_user_model
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
