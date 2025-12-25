# tasks/serializers.py
from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

# User Serializer for Registration
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # Automatically hashes password
        return user

# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'description',
            'is_completed',
            'created_at',
        )
