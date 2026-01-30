from flask import Blueprint, request, jsonify
from services.length import convert_length

length_bp = Blueprint("length", __name__)

@length_bp.route('/length/convert', methods=["POST"])
def convert_length_route():
    data = request.get_json()

    value = data.get("value")
    from_unit = data.get("from")
    to_unit = data.get("to")

    if value is None:
        return jsonify({"error":"Valor não informado"}), 400
    
    try:
        result = convert_length(float(value), from_unit, to_unit)
        return jsonify({"result": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400