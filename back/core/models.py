""" This file contains the models for the core app. """

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()


class FibonacciResult(models.Model):
    """Fibonacci Result model."""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="fibonacci_results"
    )
    parameter = models.PositiveIntegerField(
        help_text="The input number for the Fibonacci calculation."
    )
    result = models.TextField(help_text="The result of the Fibonacci calculation.")
    execution_time = models.DecimalField(
        max_digits=10,
        decimal_places=4,
        help_text="Time taken to compute the result in seconds.",
    )
    date_launched = models.DateTimeField(
        auto_now_add=True,
        help_text="The date and time when the calculation was executed.",
    )

    def __str__(self):
        return f"<Fib({self.parameter})={self.result} by {self.user}>"

    class Meta: # noqa
        """Meta class for the FibonacciResult model."""

        verbose_name = "Fibonacci Result"
        verbose_name_plural = "Fibonacci Results"
