from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializer import Model_serializer
from rest_framework.response import Response
# Create your views here.
class Model_Api(APIView):
    permission_classes = [AllowAny]
    def get(self,request,movie_name,format =None):
        serializers = Model_serializer(context={'movie_name':movie_name})
        movie_data = serializers.get_movie_data(movie_name)
        
        data = movie_data["movies"]
        movies = []
        for ele in data :
            l = {
                "id":ele["id"],
                "original_title":ele['original_title'],
                "poster_path":ele['poster_path']
            }
            if l['original_title'] != movie_name:
                movies.append(l)
                
        return Response({"msg":"Done" , 'data':movies}) 