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
        # Create a request factory
        factory = APIRequestFactory()

        # Create a GET request to the DummyEndpoint
        request = factory.get('/dummy-endpoint/')
        response = DummyEndpoint.as_view()(request)

        # Assert the response status code
        assert response.status_code == 200

        # Assert the response data
        expected_data = {
            'message': 'Mon endpoint est fonctionnel !',
            'data': {
                'items': ['item1', 'item2', 'item3']
            }
        }
        assert response.data == expected_data