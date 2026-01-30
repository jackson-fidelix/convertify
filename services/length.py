LENGTH_FACTORS = {
    "mm":0.001,
    "cm":0.01,
    "dm":0.1,
    "m":1.0,
    "dam":10.0,
    "hm":100.0,
    "km":1000.0
}

def convert_length(value: float, from_unit: str, to_unit: str) -> float:
    if from_unit not in LENGTH_FACTORS:
        raise ValueError("Unidade de origem inválida")
    
    if to_unit not in LENGTH_FACTORS:
        raise ValueError("Unidade de destino inválida")
    
    value_in_meters = value * LENGTH_FACTORS[from_unit]

    converted_value = value_in_meters / LENGTH_FACTORS[to_unit]

    return round(converted_value, 4)
