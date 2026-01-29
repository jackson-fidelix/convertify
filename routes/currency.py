from flask import Blueprint, request, jsonify
from services.currency_service import get_exchange_rate
from typing import Tuple, Dict, Any
import logging

currency_bp = Blueprint("currency", __name__, url_prefix="/api/currency")
logger = logging.getLogger(__name__)

def validate_conversion_data(data: Dict[str, Any]) -> Tuple[float, str, str]:
    """
    Valida e extrai os campos necessários.
    Levanta ValueError com mensagem clara se algo estiver errado.
    """
    if not data:
        raise ValueError("No JSON data provided")

    amount = data.get("amount")
    from_currency = data.get("from")
    to_currency = data.get("to")

    if not all([amount, from_currency, to_currency]):
        raise ValueError("Missing required fields: amount, from, to")

    try:
        amount = float(amount)
    except (TypeError, ValueError):
        raise ValueError("Amount must be a valid number")

    if amount <= 0:
        raise ValueError("Amount must be positive")

    from_currency = from_currency.upper().strip()
    to_currency = to_currency.upper().strip()

    return amount, from_currency, to_currency


@currency_bp.route("/convert", methods=["POST"])
def convert_currency():
    """
    Converte valor entre moedas.
    POST /api/currency/convert
    Body: {"amount": 100, "from": "BRL", "to": "USD"}
    """
    try:
        data = request.get_json(silent=True)  # silent=True evita erro se não for JSON
        amount, from_currency, to_currency = validate_conversion_data(data)

        rate = get_exchange_rate(from_currency, to_currency)
        result = round(amount * rate, 2)

        return jsonify({
            "success": True,
            "amount": amount,
            "from": from_currency,
            "to": to_currency,
            "rate": round(rate, 6),
            "result": result,
            "timestamp": int(request.time) if hasattr(request, 'time') else None  # opcional
        }), 200

    except ValueError as ve:
        logger.warning(f"Validation error: {ve}")
        return jsonify({
            "success": False,
            "error": str(ve)
        }), 400

    except Exception as e:
        logger.exception(f"Unexpected error during conversion: {e}")
        return jsonify({
            "success": False,
            "error": "Internal server error. Please try again later."
        }), 500