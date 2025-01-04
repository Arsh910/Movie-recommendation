from rest_framework import serializers
import requests
from Hybrid_Recomender.ml_model import recommend

class Model_serializer(serializers.Serializer):
    movie_name = serializers.CharField(required=False)

    def validate(self, attrs):
        movie_name = self.context.get('movie_name')
        if not movie_name:
            raise ValidationError({'error': 'Please provide a movie name for recommendations.'})
        return attrs

    def get_movie_data(self, movie_name):
        # API call to fetch movie data
        names = recommend(movie_name)      
        ccl = []
        if names:
            for movie_name in names:     
                url = f'https://api.themoviedb.org/3/search/movie?query={movie_name}&api_key=fdeb1f5338cf73b62cef521cd7c4c213'
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    ccl.append(data['results'][0])
                else:
                    continue
            return({"movies":ccl})
        else:
            return {'error': "we don't have the movie"}