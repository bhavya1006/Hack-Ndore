import psycopg2
import requests
from datetime import datetime, timedelta

def fetch_data_from_db():
    conn = psycopg2.connect(
        dbname="your_dbname",
        user="your_username",
        password="your_password",
        host="your_host",
        port="your_port"
    )
    cursor = conn.cursor()
    yesterday = datetime.now() - timedelta(days=1)
    query = """
    SELECT household_id, timestamp, water_consumption, locality, household_size, pressure, temperature
    FROM water_usage
    WHERE timestamp >= %s
    """
    cursor.execute(query, (yesterday,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    
    data = []
    for row in rows:
        data.append({
            "Household ID": row[0],
            "Timestamp": row[1],
            "Water Consumption (liters)": row[2],
            "Locality": row[3],
            "Household Size": row[4],
            "Pressure (bar)": row[5],
            "Temperature (C)": row[6]
        })
    
    return data

def send_anomalies_to_server(anomalies):
    url = "http://your_node_server/api/receive_anomalies"
    response = requests.post(url, json=anomalies)
    if response.status_code == 200:
        print("Anomalies sent successfully!")
    else:
        print(f"Failed to send anomalies: {response.status_code}")
