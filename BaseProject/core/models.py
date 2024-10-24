from django.db import models

# Model representing a quote submitted by users
class Quote(models.Model): 
    name = models.CharField(max_length=100)  # Name of the user/author
    detail = models.TextField()              # Quote text
