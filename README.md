💱 Convertify

Aplicação web para conversão de moedas em tempo real, desenvolvida com Flask.
O objetivo do projeto é fornecer uma interface simples e intuitiva para converter valores entre diferentes moedas utilizando dados atualizados de uma API externa.

⸻

📸 Demonstração


⸻

🚀 Funcionalidades
	•	Conversão de moedas em tempo real
	•	Interface web simples e responsiva
	•	Suporte a múltiplas moedas
	•	Datas formatadas em português (pt-BR)
	•	Tratamento de erros de requisição
	•	Preparado para deploy

⸻

🧠 Tecnologias utilizadas
	•	Python 3
	•	Flask
	•	Requests
	•	HTML + CSS
	•	API externa de câmbio

⸻

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
⸻

⚙️ Instalação e execução

1) Clonar o repositório
git clone https://github.com/jackson-fidelix/convertify.git
cd convertify

2) Criar ambiente virtual
python -m venv venv

3) Instalar dependências
pip install -r requirements.txt

4) Criar arquivo .env
API_KEY=SUA_CHAVE_DA_API

5) Rodar aplicação
python app.py

Acesse em:
http://127.0.0.1:5000
