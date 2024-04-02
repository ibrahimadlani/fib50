"""
This file is used to define the views of the core app.

"""

from rest_framework import generics
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import FibonacciResult, User
from .serializers import (
    FibonacciResultSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)


class FibonacciListCreateAPIView(generics.ListCreateAPIView):
    """This class retrieves, updates, and deletes a Fibonacci result."""

    permission_classes = [permissions.IsAuthenticated]
    queryset = FibonacciResult.objects.all()
    serializer_class = FibonacciResultSerializer


class FibonacciDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """This class retrieves, updates, and deletes a Fibonacci result."""

    permission_classes = [permissions.IsAuthenticated]
    queryset = FibonacciResult.objects.all()
    serializer_class = FibonacciResultSerializer


class FibonacciResultsByUserAPIView(generics.ListAPIView):
    """This class retrieves, updates, and deletes a Fibonacci result."""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FibonacciResultSerializer

    def get_queryset(self):
        """
        Overriding the get_queryset method to return Fibonacci results
        for a specific user, identified by user_id in the URL.
        """
        user_id = self.kwargs.get("user_id")
        return FibonacciResult.objects.filter(user__id=user_id)


class UserLastFibonacciAPIView(APIView):
    """This class retrieves the last Fibonacci result for a user."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, user_id):
        """GET method to retrieve the last Fibonacci result for a user."""
        last_fibonacci = (
            FibonacciResult.objects.filter(user_id=user_id)
            .order_by("-date_launched")
            .first()
        )
        if last_fibonacci is not None:
            serializer = FibonacciResultSerializer(last_fibonacci)
            return Response(serializer.data)
        return Response(
            {"message": "Aucun résultat de Fibonacci trouvé pour cet utilisateur."},
            status=status.HTTP_404_NOT_FOUND,
        )


class UserCreateAPIView(generics.CreateAPIView):
    """This class creates a new user."""

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRUDAPIView(generics.RetrieveUpdateDestroyAPIView):
    """This class retrieves, updates, and deletes a user."""

    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ChangePasswordView(APIView):
    """This class allows a user to change their password."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """ POST method to change the user's password. """
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data["old_password"]):
                return Response(
                    {"old_password": "Ancien mot de passe incorrect."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response(
                {"status": "success", "message": "Mot de passe changé avec succès."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserFibonacciHistoryAPIView(ListAPIView):
    """This class retrieves the last 20 Fibonacci results for a user."""

    permission_classes = [IsAuthenticated]
    serializer_class = FibonacciResultSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return FibonacciResult.objects.filter(user__id=user_id).order_by("-computed_at")[:20]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom TokenObtainPairSerializer to include additional user data in the response."""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    """ Custom TokenObtainPairView to use the custom serializer. """
    serializer_class = MyTokenObtainPairSerializer
