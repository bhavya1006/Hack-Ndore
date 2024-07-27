import pandas as pd
import plotly.graph_objects as go
from flask import Flask, request, send_file
import io
import base64

# Create a Flask app
app = Flask(__name__)

def create_water_consumption_graph(data, selected_area=None):
    """
    Create a Plotly graph of water consumption.
    
    :param data: DataFrame containing 'Month', 'Water_Consumed', and 'Area' columns
    :param selected_area: Optional, filter to select specific area
    :return: Figure object
    """
    fig = go.Figure()

    # Filter data if a specific area is selected
    if selected_area:
        data = data[data['Area'] == selected_area]

    # Group by month and area, and plot
    for area in data['Area'].unique():
        area_data = data[data['Area'] == area]
        fig.add_trace(go.Scatter(
            x=area_data['Month'],
            y=area_data['Water_Consumed'],
            mode='lines+markers',
            name=area
        ))

    # Update layout
    fig.update_layout(
        title='Water Consumption Over Months',
        xaxis_title='Month',
        yaxis_title='Water Consumed',
        legend_title='Area'
    )

    return fig

def save_graph_as_image(fig):
    """
    Save Plotly figure as an image and return as bytes.
    
    :param fig: Plotly figure object
    :return: BytesIO object of the image
    """
    img_bytes = io.BytesIO()
    fig.write_image(img_bytes)
    img_bytes.seek(0)
    return img_bytes

@app.route('/get_graph', methods=['GET'])
def get_graph():
    # Dummy data for demonstration
    data = pd.DataFrame({
        'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        'Water_Consumed': [100, 150, 200, 250, 300, 350],
        'Area': ['North', 'North', 'South', 'South', 'East', 'East']
    })
    
    selected_area = request.args.get('area', None)
    
    fig = create_water_consumption_graph(data, selected_area)
    
    # Get the image as bytes
    img_bytes = save_graph_as_image(fig)
    
    return send_file(img_bytes, mimetype='image/png', as_attachment=True, attachment_filename='graph.png')

if __name__ == '__main__':
    app.run(debug=True)
