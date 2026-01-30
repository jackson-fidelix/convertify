from currency_service import get_exchange_rate

print(get_exchange_rate("BRL", "USD"))   # real -> dólar
print(get_exchange_rate("USD", "BRL"))   # dólar -> real
print(get_exchange_rate("EUR", "BRL"))   # euro -> real