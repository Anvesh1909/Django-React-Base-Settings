
---

### 🛠️ **models.py (Model Definitions)**  
Defines the structure of your database tables.

**Import:**  
```python
from django.db import models
```

**Field Types:**
- `CharField(max_length=...)` — For short text
- `TextField()` — For large text
- `IntegerField()` — For integers
- `FloatField()` — For floating-point numbers
- `BooleanField()` — For True/False
- `DateField()` — For dates
- `DateTimeField()` — For dates and times
- `ForeignKey(...)` — Many-to-one relationship
- `OneToOneField(...)` — One-to-one relationship
- `ManyToManyField(...)` — Many-to-many relationship
- `EmailField()` — For email addresses
- `URLField()` — For URLs
- `FileField()` — For uploading files
- `ImageField()` — For uploading images

**Model Meta Options:**
```python
class Meta:
    ordering = ['-created_at']  # Ordering by field
    verbose_name = 'Item'       # Singular name
```

**Model Methods:**
- `__str__(self)` — String representation
- `save()` — Save the model instance
- `delete()` — Delete the model instance

**QuerySet Methods:**  
- `.all()`, `.filter()`, `.exclude()`, `.get()`
- `.first()`, `.last()`
- `.count()`, `.distinct()`
- `.values()`, `.values_list()`
- `.order_by()`
- `.update()`, `.delete()`

---

### 🌐 **views.py (View Functions and Classes)**  
Handles logic and response for each route.

**Import:**
```python
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import ModelName
from django.views import View  # For class-based views
```

**Function-Based Views (FBVs):**
```python
def home(request):
    return HttpResponse("Hello, world!")

def my_view(request):
    return render(request, 'template_name.html', {'context_key': 'value'})
```

**Class-Based Views (CBVs):**
```python
from django.views import View

class MyView(View):
    def get(self, request):
        return HttpResponse('GET request')

    def post(self, request):
        return HttpResponse('POST request')
```

**Common Keywords:**
- `render(request, template_name, context)`
- `redirect()`
- `get_object_or_404()`
- `HttpResponse()`
- `JsonResponse()`

---

### 🗺️ **urls.py (URL Routing)**  
Maps URLs to views.

**Import:**
```python
from django.urls import path, include
from . import views
```

**Patterns:**
```python
urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('detail/<int:id>/', views.detail_view, name='detail'),
]
```

**Include Other URLs:**
```python
path('blog/', include('blog.urls'))
```

---

### 📄 **templates (Template Tags & Filters)**  
For rendering HTML dynamically.

**Template Tags:**  
- `{% for item in items %} ... {% endfor %}`
- `{% if condition %} ... {% endif %}`
- `{% include 'template.html' %}`
- `{% block block_name %} ... {% endblock %}`
- `{% extends 'base.html' %}`

**Template Filters:**  
- `{{ variable|lower }}` — Converts to lowercase
- `{{ variable|date:"Y-m-d" }}` — Formats date
- `{{ variable|default:"default value" }}` — Default if empty
- `{{ variable|length }}` — Length of a list or string

---

### 🛡️ **forms.py (Forms Handling)**  
Create and process forms.

**Import:**
```python
from django import forms
from .models import ModelName
```

**Example Form:**
```python
class MyForm(forms.ModelForm):
    class Meta:
        model = ModelName
        fields = ['field1', 'field2']
```

---

### ⚙️ **settings.py (Configuration)**  

**Database Configuration:**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

**Installed Apps:**  
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'app_name',
]
```

**Static and Media Files:**  
```python
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
```

---

### 🛠️ **admin.py (Admin Configuration)**  

**Import and Register Models:**
```python
from django.contrib import admin
from .models import ModelName

admin.site.register(ModelName)
```

---

### 🔗 **Other Common Commands (CLI):**  
- `python manage.py runserver` — Start the server
- `python manage.py makemigrations` — Create migrations
- `python manage.py migrate` — Apply migrations
- `python manage.py createsuperuser` — Create admin user
- `python manage.py shell` — Django shell

---
