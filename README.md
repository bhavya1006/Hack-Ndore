# Water Supply Management | Hack'ndore

## Problem Statement
Indore relies on the Narmada River for water but lacks infrastructure to monitor household-level distribution. This gap leads to inefficiencies and potential wastage. The advanced system aims to optimize water supply management using cutting-edge technologies for efficiency, transparency, and sustainability. Key features include:
- **Monitoring Systems:** Digital and physical systems to measure water received by each household.
- **Data Collection and Analysis:** Continuous data collection for detailed analysis and reporting.
- **Reporting and Management:** Monthly and yearly reports to identify trends and inefficiencies.
- **Equitable Distribution:** Ensuring fair water distribution across households.
- **Leakage Detection:** Identifying and addressing potential leakages in the distribution network.

## Approach

## Overview
The Smart Water Management System for Indore aims to optimize water distribution, minimize wastage, and enhance overall water resource management using cutting-edge IoT and AI/ML technologies.

![WhatsApp Image 2024-07-28 at 10 42 26_65ed7aa2](https://github.com/user-attachments/assets/18d78d81-d852-43b0-85a6-fa2847a4c901)


</br>

## UI Snapshots

![image](https://github.com/user-attachments/assets/c6667710-e567-4e8d-9354-e8aed7cb9f4d)

![WhatsApp Image 2024-07-28 at 09 17 18_36645e68](https://github.com/user-attachments/assets/ca3cbd8d-f4ae-4dae-93fe-36bd6eb0fe74)

![WhatsApp Image 2024-07-28 at 09 17 35_90be85cb](https://github.com/user-attachments/assets/2351b96b-c3e8-4ffe-92fa-37fe39029d48)


### Left Navigation Menu
- **Dashboard:** Overview screen.
- **Details:** In-depth information on water usage.
- **Risk Alerts:** Alerts for potential issues like leaks.
- **Reports:** Detailed water consumption and distribution reports.
- **Profile:** User profile management.

### Main Dashboard
- **10245 L Supplied this Month:** Total water supplied this month.
- **1024 L Water Consumed / Month (Avg.):** Average monthly consumption per household.
- **10 Risks of Leakages:** Number of detected potential leakages.
- **42 Complaints Pending:** Unresolved user complaints.

### Graphs
- **Monthly Water Consumption by Area:** Line chart showing water consumption trends across different zones over the months.
- **Average Monthly Water Consumption by Area:** Pie chart displaying the distribution of average monthly water consumption across various zones.

## Key Features

### IoT Devices and Water Supply Meters:
1. Install IoT-enabled water supply meters in average households to measure water consumption.
2. Use low-power, long-range communication technologies like LoRaWAN or NB-IoT for data transmission.

### Data Processing and Cloud Storage:
1. Transmit collected data to a central server.
2. Utilize cloud services for scalable data management and analysis.

### AI/ML Analysis:
1. Analyze water usage patterns to detect anomalies, predict leaks, and optimize distribution.
2. Identify areas prone to high water usage and make predictions based on weather patterns and other factors.

### React-based Dashboard:
1. Real-time monitoring and detailed reporting for residents and municipal staff.
2. Alerts for leaks and other anomalies.
3. Visualization tools to display consumption trends, distribution metrics, and user complaints.

## Getting Started
This guide will walk you through the steps to set up a React and PostgreSQL-based project on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js
- npm or yarn
- PostgreSQL
- Git
- Python

### Setting Up PostgreSQL
1. **Install PostgreSQL**:
   Follow the instructions for your operating system from the [official PostgreSQL website](https://www.postgresql.org/download/).

2. **Create a Database**:
   Open your PostgreSQL client (psql, pgAdmin, etc.) and run the following commands:
   ```sql
   CREATE DATABASE water_management;
   CREATE USER wm_user WITH ENCRYPTED PASSWORD 'wm_password';
   GRANT ALL PRIVILEGES ON DATABASE water_management TO wm_user;
   ```

3. **Set Up Tables**:
   Connect to your database and create the necessary tables:

   ```sql
   \c water_management

   CREATE TABLE water_usage (
       id SERIAL PRIMARY KEY,
       household_id INT,
       zone VARCHAR(50),
       water_used NUMERIC,
       usage_date DATE
   );

   CREATE TABLE households (
       id SERIAL PRIMARY KEY,
       locality VARCHAR(100),
       household_size INT
   );
   ```

### Setting Up the Backend
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/smart-water-management.git
   cd smart-water-management/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the backend directory with the following content:
   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=wm_user
   DB_PASSWORD=wm_password
   DB_NAME=water_management
   ```

4. **Run the Backend Server**:
   ```bash
   npm start
   ```

## Usage
- **Access the Dashboard**: Open your browser and navigate to `http://localhost:3000` to access the React-based dashboard.
- **API Endpoints**: The backend API will be available at `http://localhost:5000`.

## Conclusion
By following this guide, you will have a local instance of the Smart Water Management System for Indore, featuring a React-based dashboard and a PostgreSQL backend. This system leverages IoT and AI/ML technologies to ensure efficient water distribution, minimize wastage, and enhance the overall management of water resources in the city.

## Include Credits
- [Bhavya Pratap]()
- [Ayushman Lakshkar]()
- [Prince Agrawal]()
- [Bhavya Madan]()
- [Tanmay Sawankar]()

![WhatsApp Image 2024-07-28 at 10 40 11_1e0e5977](https://github.com/user-attachments/assets/e4706918-0ee3-4175-890e-78b953cd74e2)


---

