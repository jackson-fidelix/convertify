VELOCITY_FACTORS = {
    "ms": 1.0,          # metro por segundo (base)
    "kmh": 1000 / 3600, # km/h → m/s
    "mph": 1609.34 / 3600,  # milha/h → m/s
    "kn": 1852 / 3600   # nó → m/s
}

def convert_velocity(value: float, from_unit: str, to_unit: str) -> float:
    if from_unit not in VELOCITY_FACTORS:
        raise ValueError("Unidade de origem inválida")

    if to_unit not in VELOCITY_FACTORS:
        raise ValueError("Unidade de destino inválida")

    value_in_ms = value * VELOCITY_FACTORS[from_unit]
    result = value_in_ms / VELOCITY_FACTORS[to_unit]

    return round(result, 4)
