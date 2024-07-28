from flask import Flask, request, send_file, jsonify
import pandas as pd
import plotly.express as px
import numpy as np
import os
from flask_cors import CORS
import io
from PIL import Image



app = Flask(__name__)
CORS(app, resources={r"/plot": {"origins": "http://localhost:3000"}})

# Generate more varied synthetic data
np.random.seed(42)
# months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
# area1 = [100, 150, 130, 170, 120, 160, 140, 180, 160, 170, 150, 140]
# area2 = [90, 110, 140, 130, 160, 150, 170, 140, 190, 160, 200, 180]
# area3 = [80, 140, 100, 130, 110, 140, 150, 120, 170, 140, 190, 160]

# data = {
#     'Month': months,
#     'Area1': area1,
#     'Area2': area2,
#     'Area3': area3
# }

# df = pd.DataFrame(data)

@app.route('/plot/', methods=['POST'])
def create_plot():
    req_data = request.get_json()
    print("Request Data:", req_data)
    months = list(req_data[0]['consumption_per_month'].keys())
    print(months)

    data={}

    data['Months']=months

    for x in req_data:
        data[x['area_zone']]=list(x['consumption_per_month'].values())
    print(data)

    plot_df = pd.DataFrame(data)
    
    plot_df = plot_df.melt(id_vars=['Months'], var_name='Area', value_name='Water Consumed')

    fig = px.line(plot_df, x='Months', y='Water Consumed', color='Area', title='Monthly Water Consumption by Area', line_shape='spline')
    
    fig.update_layout(
        width=800,  # Set the desired width
        height=400  # Set the desired height
    )

    output_file = 'water_consumption_plot.png'
    fig.write_image(output_file)
    print(output_file)
    return send_file(output_file, mimetype='image/png', as_attachment=True, download_name=output_file)

@app.route('/piechart', methods=['POST'])
def pieChart():
    req_data = request.get_json()
    print("Request Data:", req_data)
    area_zones = [item['area_zone'] for item in req_data]
    consumption_avg_months = [item['consumption_avg_month'] for item in req_data]
    fig = px.pie(
            values=consumption_avg_months,
            names=area_zones,
            title='Average Monthly Water Consumption by Area'
        )
    fig.update_layout(
        width=800,  # Set the desired width
        height=400  # Set the desired height
    )

    
        # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    fig.write_image(img_bytes, format='png')
    img_bytes.seek(0)

        # Return the image as a binary stream
    return send_file(img_bytes, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5050)
