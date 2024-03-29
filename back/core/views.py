"""
This file is used to define the views of the core app.

"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class DummyEndpoint(APIView):
    """
    A simple API endpoint that returns a dummy response.
    """

    def get(self, request): # pylint: disable=unused-argument
        """
        Return a JSON response with dummy data.
        """
        data = {
            'message': 'Mon endpoint est fonctionnel !',
            'data': {
                'items': ['item1', 'item2', 'item3']
            }
        }
        return Response(data, status=status.HTTP_200_OK)
