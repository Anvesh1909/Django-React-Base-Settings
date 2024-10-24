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
