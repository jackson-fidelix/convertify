from flask import Blueprint, request, jsonify
from services.velocity import convert_velocity

velocity_bp = Blueprint("velocity", __name__)

@velocity_bp.route("/velocity/convert", methods=["POST"])
def velocity_convert():
    data = request.json

    value = data.get("value")
    from_unit = data.get("from")
    to_unit = data.get("to")

    if value is None:
        return jsonify({"error": "Valor não informado"}), 400

    try:
        result = convert_velocity(float(value), from_unit, to_unit)
        return jsonify({"result": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400