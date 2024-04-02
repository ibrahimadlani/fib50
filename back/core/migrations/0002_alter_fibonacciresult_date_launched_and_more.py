# Generated by Django 5.0.3 on 2024-03-31 20:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="fibonacciresult",
            name="date_launched",
            field=models.DateTimeField(
                auto_now_add=True,
                help_text="The date and time when the calculation was executed.",
            ),
        ),
        migrations.AlterField(
            model_name="fibonacciresult",
            name="execution_time",
            field=models.DecimalField(
                decimal_places=4,
                help_text="Time taken to compute the result in seconds.",
                max_digits=10,
            ),
        ),
        migrations.AlterField(
            model_name="fibonacciresult",
            name="parameter",
            field=models.PositiveIntegerField(
                help_text="The input number for the Fibonacci calculation."
            ),
        ),
        migrations.AlterField(
            model_name="fibonacciresult",
            name="result",
            field=models.TextField(
                help_text="The result of the Fibonacci calculation."
            ),
        ),
        migrations.AlterField(
            model_name="fibonacciresult",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="fibonacci_results",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]