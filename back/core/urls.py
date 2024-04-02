"""
This file is used to define the urls of the core app.
"""

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from .views import (
    ChangePasswordView,
    FibonacciDetailAPIView,
    FibonacciListCreateAPIView,
    FibonacciResultsByUserAPIView,
    UserCreateAPIView,
    UserLastFibonacciAPIView,
    UserRUDAPIView,
)

urlpatterns = [
    # Fibonacci Endpoint
    path("fibonacci/", FibonacciListCreateAPIView.as_view(), name="fibonacci-list"),
    path(
        "fibonacci/create/",
        FibonacciListCreateAPIView.as_view(),
        name="fibonacci-create",
    ),
    path(
        "fibonacci/<int:pk>/", FibonacciDetailAPIView.as_view(), name="fibonacci-detail"
    ),
    path(
        "fibonacci/user/<int:user_id>/",
        FibonacciResultsByUserAPIView.as_view(),
        name="fibonacci-by-user",
    ),
    path(
        "users/<int:user_id>/fibonacci/last/",
        UserLastFibonacciAPIView.as_view(),
        name="user-last-fibonacci",
    ),
    path(
        "users/<int:user_id>/fibonacci/history/",
        UserLastFibonacciAPIView.as_view(),
        name="user-fibonacci-history",
    ),
    path("users/create/", UserCreateAPIView.as_view(), name="user-create"),
    path("users/<int:pk>/", UserRUDAPIView.as_view(), name="user-rud"),
    path(
        "users/change-password/", ChangePasswordView.as_view(), name="change-password"
    ),
    path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]
