
---

# React + Django REST Framework Base Project

This project demonstrates how to set up a base project integrating **React** as the frontend and **Django REST Framework** as the backend. The goal is to create a simple full-stack application that allows users to submit and display quotes using an API created with Django and a frontend powered by React.

## Features

- **Django REST Framework**: Used to create APIs.
- **React**: Used as the frontend for interacting with the API.
- **CORS Headers**: Configured to allow cross-origin requests from React to Django.
- **SQLite**: Configured as the database for Django.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [Backend (Django)](#backend-django)
    - Models
    - Serializers
    - Views
    - URLs
    - Settings
5. [Frontend (React)](#frontend-react)
6. [Run the Project](#run-the-project)

---

## Requirements

To run this project, you need to have the following installed on your system:

- Python 3.x
- Node.js & npm
- Django 5.x
- Django REST Framework
- React

---

## Setup Instructions

### Backend Setup (Django REST Framework)

1. **Create Django Project:**

   ```bash
   django-admin startproject BaseProject
   cd BaseProject
   ```

2. **Create a Django App:**

   ```bash
   python manage.py startapp core
   ```

3. **Install Dependencies:**

   Install required Python packages:

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

4. **Add apps to `INSTALLED_APPS`** in `settings.py`:

   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'rest_framework',
       'core',
       'corsheaders',
   ]
   ```

5. **Configure Middleware:**

   Add `CORS` middleware to allow requests from your React app:

   ```python
   MIDDLEWARE = [
       # other middlewares
       'corsheaders.middleware.CorsMiddleware',
   ]

   CORS_ORIGIN_ALLOW_ALL = True
   ```

### Frontend Setup (React)

1. **Create React App:**

   ```bash
   npx create-react-app frontend
   cd frontend
   ```

2. **Install Axios:**

   Axios is used to make HTTP requests:

   ```bash
   npm install axios
   ```

---

## Project Structure

```
BaseProject/
│
├── core/                 # Django app
│   ├── models.py         # Data models
│   ├── serializers.py    # Django REST framework serializers
│   ├── views.py          # API Views
│   └── urls.py           # URL routing
│
├── frontend/             # React app (frontend)
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Entry point
│
└── manage.py             # Django manage script
```

---

## Backend (Django)

### Models

In `core/models.py`, define the data model:

```python
from django.db import models

class React(models.Model):
    name = models.CharField(max_length=100)
    detail = models.TextField()
```

### Serializers

In `core/serializers.py`, define the serializer to handle API data:

```python
from rest_framework import serializers
from .models import React

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']
```

### Views

In `core/views.py`, define the API views to handle GET and POST requests:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import React
from .serializers import ReactSerializer

class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        details = [{"name": obj.name, "detail": obj.detail} for obj in React.objects.all()]
        return Response(details)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
```

### URLs

In `BaseProject/urls.py`, add the following routes:

```python
from django.contrib import admin
from django.urls import path
from core.views import ReactView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wel/', ReactView.as_view(), name='react_view'),
]
```

### Settings

In `BaseProject/settings.py`, configure the REST Framework and CORS settings:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

CORS_ORIGIN_ALLOW_ALL = True
```

---

## Frontend (React)

In the `src/App.js` file of your React app, implement the component to interact with the API:

```javascript
import React from "react";
import axios from "axios";

class App extends React.Component {
    state = { details: [], user: "", quote: "" };

    componentDidMount() {
        axios.get("http://localhost:8000/wel/")
            .then(res => this.setState({ details: res.data }))
            .catch(err => console.log(err));
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/wel/", {
            name: this.state.user,
            detail: this.state.quote
        }).then(() => this.setState({ user: "", quote: "" }));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="user" value={this.state.user} onChange={this.handleInput} />
                    <input name="quote" value={this.state.quote} onChange={this.handleInput} />
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {this.state.details.map((detail, index) => (
                        <li key={index}>{detail.name}: {detail.detail}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
```

---

## Run the Project

### Backend (Django)

1. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

2. **Start the server:**

   ```bash
   python manage.py runserver
   ```

   Your Django API should now be running at `http://localhost:8000`.

### Frontend (React)

1. **Start React development server:**

   ```bash
   npm start
   ```

   The React app should be accessible at `http://localhost:3000`.

---

You're now ready to interact with your full-stack application! You can submit quotes via the React form, and they will be displayed below once submitted.

