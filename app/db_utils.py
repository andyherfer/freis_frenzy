import psycopg2
from keys.db_keys import db_keys
import random

conn = psycopg2.connect(**db_keys)
cur = conn.cursor()


def get_random_words():
    cur.execute("SELECT * FROM words ORDER BY RANDOM();")
    words = cur.fetchall()
    # Shuffle the words
    words = random.sample(words, len(words))
    return [f'"{i[1]}"' for i in words]
