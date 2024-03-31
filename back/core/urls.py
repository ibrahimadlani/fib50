"""
This file is used to define the urls of the core app.
"""

from django.urls import path

from .views import UserDetailAPIView, DummyEndpoint

urlpatterns = [
    path("dummy/", DummyEndpoint.as_view(), name="dummy-endpoint"),
    path('user/<int:id>/', UserDetailAPIView.as_view(), name='user-detail'),
]
