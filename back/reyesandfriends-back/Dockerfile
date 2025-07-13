FROM python:3.13.2-slim
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN python app/scripts/init_mysql_db.py --fresh
EXPOSE 5006
CMD ["gunicorn", "-b", "0.0.0.0:5006", "main:app"]
