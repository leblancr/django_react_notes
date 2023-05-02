from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.


@api_view(['GET'])
def get_routes(request):
    
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Return an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Return a single note object'
        }
    ]
    
    return Response(routes)


@api_view(['GET'])
def get_notes(request):
    serializer = NoteSerializer(Note.objects.all(), many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_note(request, pk):
    # notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(Note.objects.get(id=pk), many=False)
    return Response(serializer.data)
