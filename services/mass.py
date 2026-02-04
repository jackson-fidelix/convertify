MASS_FACTORS = {
    "mg": 0.001,
    "g": 1,
    "kg": 1000,
    "t": 1_000_000
}

def convert_mass(value: float, from_unit: str, to_unit: str) -> float:
    if from_unit not in MASS_FACTORS:
        raise ValueError("Unidade de origem inválida!")
    
    if to_unit not in MASS_FACTORS:
        raise ValueError("Unidade de destino inválida!")
    
    value_in_grams = value * MASS_FACTORS[from_unit]
    converted_value = value_in_grams / MASS_FACTORS[to_unit]

    return converted_value