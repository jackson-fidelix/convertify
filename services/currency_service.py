import requests

def get_exchange_rate(from_currency: str, to_currency: str) -> float:
    if from_currency == to_currency:
        return 1.0

    api_key = "3f715a35be43b70780f83262" 

    url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/{from_currency}"

    response = requests.get(url)
    response.raise_for_status() # se der erro vai apontar aqui

    data = response.json()

    if data.get("result") != "success":
        raise ValueError(f"Erro na API: {data.get('error-type', 'Desconhecido')}")

    rate = data["conversion_rates"].get(to_currency)
    if rate is None:
        raise ValueError(f"Taxa não disponível para {from_currency} → {to_currency}")

    return float(rate)