"""Backend Code"""
from flask import Flask, render_template
from db_utils import get_random_words
import datetime
import random

random.seed(int(datetime.datetime.now().strftime("%M")))

app = Flask(__name__)


@app.route("/")
def index():
    words = get_random_words()
    words_str = ",\n".join(words)
    with open("static/js/main.js") as f:
        js_file = f.read()

    js_file = js_file.replace("$WORD_LIST", words_str)

    with open("static/js/main.js", "w") as f:
        f.write(js_file)

    return render_template("index.html")


if __name__ == "__main__":

    app.run(debug=True, port=8080, host="0.0.0.0")
