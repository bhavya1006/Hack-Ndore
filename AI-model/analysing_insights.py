from flask import Flask
from flask_apscheduler import APScheduler
from anomaly import load_models, predict_anomaly, preprocess_data
from utils import fetch_data_from_db, send_anomalies_to_server
from joblib import load
import psycopg2

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
@scheduler.task('cron', id='daily_job', hour=0, minute=1)
def scheduled_job():
    data = fetch_data_from_db()
    print(f"Fetched {len(data[0])} records from the database")
    anomalies = predict_anomaly(data, models, scaler)
    if not anomalies.empty:
        anomalies_to_send = anomalies[["Water Consumption (liters)", "Pressure (bar)", "Household Size"]].to_dict(orient='records')
        anomalies_to_send = [anomaly for anomaly in anomalies_to_send if anomaly['Water Consumption (liters)'] < 100]
        # Establish a connection to the PostgreSQL database
        conn = psycopg2.connect(
            dbname="Water_Supply",
            user="postgres",
            host="35.200.163.250",
            password="root",
            port="5432"
        )

        # Create a cursor object to interact with the database
        cursor = conn.cursor()

        # Define the SQL query to insert the data into the table
        insert_query = "INSERT INTO reports (location, column2, column3) VALUES (%s, %s, %s)"

        # Iterate over the list of dictionaries and execute the insert query for each dictionary
        for anomaly in anomalies_to_send:
            values = (anomaly["Water Consumption (liters)"], anomaly["Pressure (bar)"], anomaly["Household Size"])
            cursor.execute(insert_query, values)

        # Commit the changes to the database
        conn.commit()

        # Close the cursor and the database connection
        cursor.close()
        conn.close()
        print(anomalies_to_send)
        send_anomalies_to_server(anomalies_to_send)
if __name__ == '__main__':
    scheduled_job()
