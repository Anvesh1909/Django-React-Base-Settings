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

In `core/models.py`, define the data model that stores user-submitted quotes:

```python
from django.db import models

# Model representing a quote submitted by users
class Quote(models.Model): 
    name = models.CharField(max_length=100)  # Name of the user/author
    detail = models.TextField()              # Quote text
```

#### **Explanation:**
- **`Quote` Model:** This model defines the structure for the data to be stored in the database. It contains two fields: 
  - `name` (stores the name of the person submitting the quote).
  - `detail` (stores the text of the quote itself).
  
### Serializers

In `core/serializers.py`, define the serializer to convert model instances into JSON for the API response:

```python
from rest_framework import serializers
from .models import Quote

# Serializer for the Quote model
class QuoteSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Quote
        fields = ['name', 'detail']
```

#### **Explanation:**
- **`QuoteSerializer`**: Serializers in Django REST Framework are responsible for converting the `Quote` model instances into JSON format, which can be sent as HTTP responses. This serializer includes all fields from the `Quote` model (`name` and `detail`).

### Views

In `core/views.py`, define the API views to handle GET and POST requests for quotes:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Quote
from .serializers import QuoteSerializer

# API view to handle retrieving and creating quotes
class QuoteView(APIView):
    serializer_class = QuoteSerializer

    # Handle GET requests to retrieve all quotes
    def get(self, request): 
        quotes = [{"name": obj.name, "detail": obj.detail} for obj in Quote.objects.all()]
        return Response(quotes)

    # Handle POST requests to create a new quote
    def post(self, request): 
        serializer = QuoteSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
```

#### **Explanation:**
- **`QuoteView` (APIView):** This class-based view handles two types of HTTP requests:
  - **`get(request)`:** This method is called when a GET request is made to the API. It retrieves all quotes from the database, formats them into a list of dictionaries, and returns them as a JSON response using `Response()`.
  - **`post(request)`:** This method is called when a POST request is made to the API to submit a new quote. It takes the data from the request, validates it using `QuoteSerializer`, and saves the data if valid.

### URLs

In `BaseProject/urls.py`, define the URL routing for the API endpoints:

```python
from django.contrib import admin
from django.urls import path
from core.views import QuoteView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('quotes/', QuoteView.as_view(), name='quote_view'),
]
```

#### **Explanation:**
- **URL Routing:** The `path()` function maps the URL `/quotes/` to the `QuoteView`. This means when users visit `http://localhost:8000/quotes/`, they can either view all quotes (via a GET request) or submit a new one (via a POST request).

### Settings

In `BaseProject/settings.py`, configure the Django REST Framework and CORS settings:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

CORS_ORIGIN_ALLOW_ALL = True
```

#### **Explanation:**
- **REST Framework Settings:** The `DEFAULT_PERMISSION_CLASSES` is set to `AllowAny`, meaning any user (authenticated or not) can access the API endpoints.
- **CORS Settings:** `CORS_ORIGIN_ALLOW_ALL = True` allows cross-origin requests from any domain, which is required for the React frontend to interact with the Django API.

---

## Frontend (React)

In the `src/App.js` file of your React app, implement the component to interact with the API:

```javascript
import React from "react";
import axios from "axios";

class App extends React.Component { 
    state = { 
        quotes: [],     // Array to store fetched quotes
        author: "",     // Input value for the author
        quoteText: "",  // Input value for the quote text
    }; 

    // Fetch quotes from the backend when the component mounts
    componentDidMount() { 
        axios.get("http://localhost:8000/quotes/") 
            .then((res) => { 
                this.setState({ quotes: res.data });
            }) 
            .catch((err) => console.log(err)); 
    } 

    // Handle input change for the form
    handleInput = (e) => { 
        this.setState({ [e.target.name]: e.target.value });
    }; 

    // Handle form submission and post the new quote
    handleSubmit = (e) => { 
        e.preventDefault(); 

        axios.post("http://localhost:8000/quotes/", { 
            name: this.state.author, 
            detail: this.state.quoteText, 
        }) 
        .then(() => { 
            this.setState({ author: "", quoteText: "" });
            this.componentDidMount();  // Refetch quotes after submission
        })
        .catch((err) => console.log(err)); 
    }; 

    render() { 
        return ( 
            <div className="container jumbotron"> 
                <h1>Quote Submission</h1>
                <form onSubmit={this.handleSubmit}> 
                    <div className="input-group mb-3"> 
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Author Name"
                            value={this.state.author} 
                            name="author"
                            onChange={this.handleInput}
                        /> 
                    </div> 

                    <div className="input-group mb-3">

 
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Quote"
                            value={this.state.quoteText} 
                            name="quoteText"
                            onChange={this.handleInput}
                        /> 
                    </div> 

                    <button className="btn btn-primary" type="submit">Submit</button>
                </form> 

                <ul className="mt-4"> 
                    {this.state.quotes.map((quote, index) => ( 
                        <li key={index}>
                            <strong>{quote.name}:</strong> {quote.detail}
                        </li>
                    ))} 
                </ul> 
            </div> 
        ); 
    } 
}

export default App;
```

#### **Explanation:**
- **Component State:** The `state` holds the list of quotes fetched from the backend, and it also keeps track of the input values for author and quote.
- **`componentDidMount`:** This lifecycle method is used to fetch the quotes when the component is first rendered.
- **`handleInput`:** This function is called whenever the user types into the input fields. It updates the state with the new input values.
- **`handleSubmit`:** This function is called when the form is submitted. It sends a POST request to the backend to create a new quote and then refetches the quotes to update the list displayed.

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

