TIME_FACTORS = {
    "ms":0.001 ,
    "s": 1,
    "min": 60,
    "h": 3600,
    "d": 86400 
}

def convert_time(value: float, from_unit: str, to_unit: str) -> float:
    if from_unit not in TIME_FACTORS:
        raise ValueError("Unidade de origem inválida!")
    
    if to_unit not in TIME_FACTORS:
        raise ValueError("Unidade de destino inválida!")
    
    value_in_seconds = value * TIME_FACTORS[from_unit]
    converted_value = value_in_seconds / TIME_FACTORS[to_unit]

    return converted_value