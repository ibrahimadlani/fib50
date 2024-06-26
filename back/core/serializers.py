""" Serializers """

import time

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import FibonacciResult, User


class FibonacciResultSerializer(serializers.ModelSerializer):
    """Serializer for the FibonacciResult model."""

    class Meta:
        """Meta class for the FibonacciResultSerializer."""

        model = FibonacciResult
        fields = [
            "id",
            "user",
            "parameter",
            "result",
            "execution_time",
            "date_launched",
        ]
        read_only_fields = ["id", "result", "execution_time", "date_launched"]

    def create(self, validated_data):
        """
        Create and return a new Fibonacci result.
        """
        parameter = validated_data.get("parameter")
        start_time = time.time()
        result = self.calculate_fibonacci(parameter)
        end_time = time.time()
        execution_time = end_time - start_time
        validated_data.update({"result": str(result), "execution_time": execution_time})
        return super().create(validated_data)

    def calculate_fibonacci(self, n):
        """
        Fibbonaci function to calculate the nth number in the sequence.
        """
        a, b = 0, 1
        for _ in range(n):
            a, b = b, a + b
        return a


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    class Meta:
        """Meta class for the UserSerializer."""

        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def create(self, validated_data):
        """Create and return a new user."""
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        """Update and return an existing user."""
        validated_data.pop("password", None)
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        return instance


User = get_user_model()


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for the ChangePasswordView."""

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        """Validate the new password."""
        validate_password(value)
        return value

    def validate(self, attrs):
        """Validate the serializer data."""
        if attrs["new_password"] != attrs["confirm_new_password"]:
            raise serializers.ValidationError(
                {
                    "new_password": "Credentials do not match.",
                }
            )
        return attrs
