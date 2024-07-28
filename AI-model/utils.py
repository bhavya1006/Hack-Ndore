import psycopg2
import requests
from datetime import datetime, timedelta

def fetch_data_from_db():
    conn = psycopg2.connect(
        dbname="Water_Supply",
        user="postgres",
        host="35.200.163.250",
        password="root",
        port="5432"
    )
    
    cursor = conn.cursor()
    yesterday = datetime.now() - timedelta(days=1)
    query = """
    SELECT household_id, timestamp, water_consumption, locality, household_size, pressure, temperature , avg_water_consumption
    FROM test_data
    """
    # WHERE timestamp >= %s
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
            "Temperature (C)": row[6],
            "Avg_Water_Consumption": row[-1]
        })
    
    return data

def send_anomalies_to_server(anomalies):
    url = "http://localhost/api/receive_anomalies"
    response = requests.post(url, json=anomalies)
    if response.status_code == 200:
        print("Anomalies sent successfully!")
    else:
        print(f"Failed to send anomalies: {response.status_code}")

if __name__ == "__main__":
    data = fetch_data_from_db()
    print(f"Fetched {len(data)} records from the database")