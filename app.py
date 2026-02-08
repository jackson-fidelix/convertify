from flask import Flask, render_template
from routes.currency import currency_bp
from routes.length import length_bp
from routes.time import time_bp
from routes.mass import mass_bp
from routes.velocity import velocity_bp
from datetime import datetime
import locale

app = Flask(__name__)

app.register_blueprint(currency_bp)
app.register_blueprint(length_bp)
app.register_blueprint(time_bp)
app.register_blueprint(mass_bp)
app.register_blueprint(velocity_bp)

@app.route("/")
def home():
    locale.setlocale(locale.LC_TIME, "pt_BR.UTF-8")

    hoje = datetime.now()
    data_formatada = hoje.strftime("%A, %d de %B de %Y")
    data_formatada = data_formatada.capitalize()

    return render_template("index.html", data=data_formatada)

if __name__ == "__main__":
    app.run(debug=True)


    