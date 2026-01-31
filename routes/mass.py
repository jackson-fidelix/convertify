from flask import Blueprint, request, jsonify
from services.mass import convert_mass

mass_bp = Blueprint("mass", __name__)

@mass_bp.route('/mass/convert', methods=["POST"])
def convert_mass_route():
    data = request.get_json()

    value = data.get("value")
    from_unit = data.get("from")
    to_unit = data.get("to")

    if value is None: 
        return jsonify({"error": "Valor não informado!"})
    
    try:
        # convert_mass vem dos services/time
        result = convert_mass(float(value), from_unit, to_unit)
        return jsonify({"result": result})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400