import pandas as pd
import plotly.graph_objects as go
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