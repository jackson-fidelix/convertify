from flask import Flask, render_template
from routes.currency import currency_bp
from routes.length import length_bp

app = Flask(__name__)

app.register_blueprint(currency_bp)
app.register_blueprint(length_bp)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
    