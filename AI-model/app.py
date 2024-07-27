from flask import Flask
from flask_apscheduler import APScheduler
from main import load_models, predict_anomaly, preprocess_data
from utils import fetch_data_from_db, send_anomalies_to_server

app = Flask(__name__)

# Schedule configuration
class Config:
    SCHEDULER_API_ENABLED = True

app.config.from_object(Config())
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

# Load the models and scaler
models = load_models()
scaler = load('scaler.joblib')

# Scheduled job to run daily at a fixed time
# @scheduler.task('cron', id='daily_job', hour=12, minute=0)
def scheduled_job():
    data = fetch_data_from_db()
    anomalies = predict_anomaly(data, models, scaler)
    if not anomalies.empty:
        anomalies_to_send = anomalies[["Household ID", "Timestamp", "Water Consumption (liters)", "Locality", "Household Size"]].to_dict(orient='records')
        send_anomalies_to_server(anomalies_to_send)
    print("Scheduled job executed")

if __name__ == '__main__':
    app.run(debug=True)
