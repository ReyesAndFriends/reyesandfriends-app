FROM python:3.13.2-slim
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN python app/scripts/create_uri_tables.py
EXPOSE 5006
CMD ["gunicorn", "-b", "0.0.0.0:5006", "main:app"]
