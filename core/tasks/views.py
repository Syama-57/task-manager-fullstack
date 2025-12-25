
from rest_framework.exceptions import PermissionDenied

# Create your views here.
# tasks/views.py
from rest_framework import viewsets, permissions, generics
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth.models import User

# Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

# Task View (CRUD)
# Task View (CRUD)
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
         return Task.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        # Keep this as is, but we won't be 'Creating' until we have Login working
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
      task = self.get_object()
      if task.user != self.request.user:
        raise PermissionDenied("You cannot edit this task")
      serializer.save()

    def perform_destroy(self, instance):
       if instance.user != self.request.user:
         raise PermissionDenied("You cannot delete this task")
       instance.delete()
    