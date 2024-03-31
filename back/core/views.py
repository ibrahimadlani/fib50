"""
This file is used to define the views of the core app.

"""
from rest_framework import generics
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import FibonacciResult, User
from .serializers import FibonacciResultSerializer, UserSerializer, ChangePasswordSerializer


# List and Create Fibonacci Results
class FibonacciListCreateAPIView(generics.ListCreateAPIView):
    """ This class retrieves, updates, and deletes a Fibonacci result. """
    queryset = FibonacciResult.objects.all()
    serializer_class = FibonacciResultSerializer

# Retrieve, Update, and Delete a Fibonacci Result
class FibonacciDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ This class retrieves, updates, and deletes a Fibonacci result. """
    queryset = FibonacciResult.objects.all()
    serializer_class = FibonacciResultSerializer


# Retrieve Fibonacci Results by User
class FibonacciResultsByUserAPIView(generics.ListAPIView):
    """ This class retrieves, updates, and deletes a Fibonacci result. """

    serializer_class = FibonacciResultSerializer

    def get_queryset(self):
        """
        Overriding the get_queryset method to return Fibonacci results
        for a specific user, identified by user_id in the URL.
        """
        user_id = self.kwargs.get('user_id')
        return FibonacciResult.objects.filter(user__id=user_id)
    
class UserLastFibonacciAPIView(APIView):
    """ This class retrieves the last Fibonacci result for a user."""
    def get(self, request, user_id):
        """ GET method to retrieve the last Fibonacci result for a user. """
        last_fibonacci = FibonacciResult.objects.filter(user_id=user_id).order_by('-date_launched').first()
        if last_fibonacci is not None:
            serializer = FibonacciResultSerializer(last_fibonacci)
            return Response(serializer.data)
        else:
            return Response({'message': 'Aucun résultat de Fibonacci trouvé pour cet utilisateur.'}, status=status.HTTP_404_NOT_FOUND)

class UserCreateAPIView(generics.CreateAPIView):
    """ This class creates a new user. """
    queryset = User.objects.all()
    serializer_class = UserSerializer
class UserRUDAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ This class retrieves, updates, and deletes a user. """
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ChangePasswordView(APIView):
    """ This class changes the user's password. """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """ POST method to change the user's password."""
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"old_password": "Mot de passe incorrect."}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"status": "success", "message": "Mot de passe changé avec succès."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)