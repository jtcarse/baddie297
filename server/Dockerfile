FROM python:3.6-alpine

WORKDIR /server

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY server.py .
COPY monster_data.py .

EXPOSE 8080

CMD gunicorn -b 0.0.0.0:8080 server:app
