"""
This file is used to define the urls of the core app.
"""

from django.urls import path
from core import views

urlpatterns = [
    path('dummy/', views.DummyEndpoint.as_view(), name='dummy-endpoint'),
]
