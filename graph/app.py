from flask import Flask, request, jsonify
import pandas as pd
import plotly.express as px
import numpy as np
import io
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/plot/*": {"origins": "http://localhost:3000"}})

# Generate more varied synthetic data
np.random.seed(42)
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
area1 = [100, 150, 130, 170, 120, 160, 140, 180, 160, 170, 150, 140]
area2 = [90, 110, 140, 130, 160, 150, 170, 140, 190, 160, 200, 180]
area3 = [80, 140, 100, 130, 110, 140, 150, 120, 170, 140, 190, 160]

# Add some random variation to make the data less straight
area1 = np.array(area1) + np.random.normal(0, 5, len(area1))
area2 = np.array(area2) + np.random.normal(0, 5, len(area2))
area3 = np.array(area3) + np.random.normal(0, 5, len(area3))

data = {
    'Month': months,
    'Area1': area1,
    'Area2': area2,
    'Area3': area3
}

df = pd.DataFrame(data)

@app.route('/plot/', methods=['POST'])
def create_plot():
    areas = request.args.getlist('areas')

    if areas:
        areas = ['Month'] + areas
        if not all(area in df.columns for area in areas):
            return jsonify({"detail": "Invalid area name"}), 400
        plot_df = df[areas]
    else:
        plot_df = df

    # Melt the dataframe for Plotly
    plot_df = plot_df.melt(id_vars=['Month'], var_name='Area', value_name='Water Consumed')

    # Create the plot with interpolation for smooth curves
    fig = px.line(plot_df, x='Month', y='Water Consumed', color='Area', title='Monthly Water Consumption by Area', line_shape='spline')

    # Update y-axis range to make it shorter
    fig.update_yaxes(range=[50, 220])  # Adjust these values as needed

    # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    fig.write_image(img_bytes, format='png')
    img_bytes.seek(0)

    # Convert the BytesIO object to base64
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    # Return the base64 image in JSON format
    return jsonify({'image': img_base64})

    areas = request.args.getlist('areas')

    if areas:
        areas = ['Month'] + areas
        if not all(area in df.columns for area in areas):
            return jsonify({"detail": "Invalid area name"}), 400
        plot_df = df[areas]
    else:
        plot_df = df

    # Melt the dataframe for Plotly
    plot_df = plot_df.melt(id_vars=['Month'], var_name='Area', value_name='Water Consumed')

    # Create the plot with interpolation for smooth curves
    fig = px.line(plot_df, x='Month', y='Water Consumed', color='Area', title='Monthly Water Consumption by Area', line_shape='spline')

    # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    fig.write_image(img_bytes, format='png')
    img_bytes.seek(0)

    # Convert the BytesIO object to base64
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    # Return the base64 image in JSON format
    return jsonify({'image': img_base64})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5050)
