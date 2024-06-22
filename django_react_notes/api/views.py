from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from mongodb_utils import collection, db  # Absolute import of db from mongodb_utils.py


@api_view(['POST'])
def create_note(request):
    print('create_note')
    data = request.data

    note = Note.objects.create(
        body=data['body']
    )

    # Save to MongoDB
    insert_result = db.notes.insert_one({
        'body': data['body'],
        'django_id': str(note.id),  # Store Django's Note ID in MongoDB
        # Add other fields as needed
    })

    # Check if the insert was acknowledged and print the database and collection name
    if insert_result.acknowledged:
        print(f"Inserted into database '{db.name}' and collection '{collection.name}'")
    else:
        print("Insert operation not acknowledged")

    serializer = NoteSerializer(instance=note, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_note(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response(f"Note {pk} deleted")


@api_view(['GET'])
def get_note(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_notes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def get_routes(request):
#     routes = [
#         {
#             'Endpoint': '/notes/',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of notes'
#         },
#         {
#             'Endpoint': '/notes/id',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns a single note object'
#         },
#         {
#             'Endpoint': '/notes/create/',
#             'method': 'POST',
#             'body': {'body': ""},
#             'description': 'Creates new note with data sent in post request'
#         },
#         {
#             'Endpoint': '/notes/id/update/',
#             'method': 'PUT',
#             'body': {'body': ""},
#             'description': 'Creates an existing note with data sent in post request'
#         },
#         {
#             'Endpoint': '/notes/id/delete/',
#             'method': 'DELETE',
#             'body': None,
#             'description': 'Deletes and exiting note'
#         },
#     ]
#     return Response(routes)


@api_view(['PUT'])
def update_note(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
