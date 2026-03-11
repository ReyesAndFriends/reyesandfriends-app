FROM python:3.13.2-slim

RUN addgroup --system appgroup && adduser --system --group appuser

RUN mkdir -p /home/appuser

COPY . /home/appuser

RUN chown -R appuser:appgroup /home/appuser

WORKDIR /home/appuser

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5006

USER appuser

CMD ["gunicorn", "-b", "0.0.0.0:5006", "main:app"]