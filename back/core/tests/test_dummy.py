"""
This module contains the tests for the DummyEndpoint view.
"""

import pytest
from rest_framework.test import APIRequestFactory
from core.views import DummyEndpoint


@pytest.mark.django_db
class TestDummyEndpoint:
    """Class representing a person"""

    def test_dummy_endpoint(self):
        """Function printing python version."""
        factory = APIRequestFactory()
        request = factory.get("/dummy-endpoint/")
        response = DummyEndpoint.as_view()(request)
        assert response.status_code == 200
        expected_data = {'fib': 139583862445}
        assert response.data == expected_data

    def test_dummy_endpoint_fib_10(self):
        """Function printing python version."""
        factory = APIRequestFactory()
        request = factory.get("/dummy-endpoint/")
        response = DummyEndpoint.as_view()(request)
        assert response.status_code == 200
        expected_data = {'fib': 13958862445}
        assert response.data != expected_data
