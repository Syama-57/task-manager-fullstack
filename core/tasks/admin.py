from django.contrib import admin

# Register your models here.

from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'is_completed', 'created_at')
    list_filter = ('is_completed', 'user')