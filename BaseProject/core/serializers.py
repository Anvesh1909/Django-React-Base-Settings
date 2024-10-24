from rest_framework import serializers
from .models import Quote

# Serializer for the Quote model
class QuoteSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Quote
        fields = ['name', 'detail']
