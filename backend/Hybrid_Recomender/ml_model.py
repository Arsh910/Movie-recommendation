import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import json
import string
from collections import Counter
import scipy.cluster.hierarchy as shc
import seaborn as sns
import matplotlib.pyplot as plt
import sklearn
import ast

movies = pd.read_csv('Hybrid_Recomender/dataset/cluster_data.csv')
movies = pd.DataFrame(movies)
movies['tags'] = movies['tags'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)


def vocab(movies, limit=5000):
    word_count = Counter()
    for doc in movies['tags']:
        word_count.update(doc)

    most_common_words = [word for word, count in word_count.most_common(limit)]
    return sorted(most_common_words)

def document_term_matrix(movies, normalization=False):
    vocabulary = vocab(movies)
    Actual_tdm = []
    for doc in movies['tags']:
        word_count = Counter(doc)
        if normalization:
            Actual_vector = [word_count[word] / len(doc) for word in vocabulary]
        else:
            Actual_vector = [word_count[word] for word in vocabulary]
        Actual_tdm.append(Actual_vector)
    return Actual_tdm

def get_clus(movies , name):
  l = movies[movies['title'] == name]['kmeans_cluster'].values[0]
  return movies[movies['kmeans_cluster'] == l]


def recommend(movie_name):
    df = get_clus(movies , movie_name)

    l = document_term_matrix(df)
    doc_term_mat = np.array(l)

    from sklearn.metrics.pairwise import cosine_similarity
    similarity = cosine_similarity(doc_term_mat)

    lsi = list(df['title'].values)
    index = lsi.index(movie_name)

    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    names = []
    for i in distances[0:10]:
        names.append(df.iloc[i[0]].title)

    names = list(set(names))

    return names