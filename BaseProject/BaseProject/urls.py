from django.contrib import admin
from django.urls import path
from core.views import QuoteView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('quotes/', QuoteView.as_view(), name="quote_view"),  # Updated URL path
]
