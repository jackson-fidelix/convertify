from flask import Blueprint, request, jsonify
from services.time import convert_time

time_bp = Blueprint("time", __name__)

@time_bp.route('/time/convert', methods=["POST"])
def convert_time_route():
    data = request.get_json()

    value = data.get("value")
    from_unit = data.get("from")
    to_unit = data.get("to")

    if value is None: 
        return jsonify({"error": "Valor não informado!"})

    try:
        # convert_time vem dos services/time
        result = convert_time(float(value), from_unit, to_unit)
        return jsonify({"result": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400