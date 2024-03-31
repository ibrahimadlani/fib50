"""
This file is used to define the views of the core app.

"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.generics import RetrieveAPIView
from .serializers import UserSerializer


class DummyEndpoint(APIView):
    """
    A simple API endpoint that returns a dummy response.
    """

    def get(self, request):  # pylint: disable=unused-argument
        """
        Return a JSON response with dummy data.
        """

        data = {"fib": self._fibonacci(55)}
        return Response(data, status=status.HTTP_200_OK)

    def _fibonacci(self, n, memo=None):
        """
        Return the n-th Fibonacci number.
        """
        if memo is None:
            memo = {}
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        if n not in memo:
            memo[n] = self._fibonacci(n - 1, memo) + self._fibonacci(n - 2, memo)
        return memo[n]



class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'  # You can use 'pk' as well, which is equivalent.