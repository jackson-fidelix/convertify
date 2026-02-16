💱 Convertify

Aplicação web para conversão de moedas em tempo real, massa, medida, tempo e velocidade desenvolvida com Flask.
O objetivo do projeto é fornecer uma interface simples e intuitiva para converter valores entre diferentes moedas utilizando dados atualizados de uma API externa.

---

📸 Demonstração

<img width="1903" height="927" alt="image" src="https://github.com/user-attachments/assets/c88e40e1-fba5-463f-ae97-3982d16335ec" />

---

🚀 Funcionalidades
	•	Conversão de moedas em tempo real
	•	Interface web simples e responsiva
	•	Suporte a múltiplas moedas
	•	Datas formatadas em português (pt-BR)
	•	Tratamento de erros de requisição
	•	Preparado para deploy

---

🧠 Tecnologias utilizadas
```
	•	Python
	•	Flask
	•	Requests
	•	HTML + CSS
	•	API externa de câmbio
```

---

📂 Estrutura do projeto

```
convertify/
│── app.py
│── services/
│   └── currency_service.py
│── templates/
│── static/
│── requirements.txt
```
---

⚙️ Instalação e execução

1) Clonar o repositório
```
git clone https://github.com/jackson-fidelix/convertify.git
cd convertify
```

2) Criar ambiente virtual
```
python -m venv venv
```

3) Instalar dependências
```
pip install -r requirements.txt
```

4) Criar arquivo .env
```
API_KEY=SUA_CHAVE_DA_API
```

5) Rodar aplicação
```
python app.py
```

6) Acesse em:
```
http://127.0.0.1:5000
```
