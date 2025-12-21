FROM python:3.13.2-slim
COPY . .
COPY .env.production .env
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5006
CMD ["gunicorn", "-b", "0.0.0.0:5006", "main:app"]
