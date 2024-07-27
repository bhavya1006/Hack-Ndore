import pandas as pd
from sklearn.preprocessing import StandardScaler
from joblib import dump, load

def preprocess_data(df, scaler=None, fit_scaler=False):
    features = ["Water Consumption (liters)", "Household Size", "Pressure (bar)", "Temperature (C)", "Consumption_per_Person"]
    df['Consumption_per_Person'] = df['Water Consumption (liters)'] / df['Household Size']
    X = df[features]
    if fit_scaler:
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        dump(scaler, 'scaler.joblib')
    else:
        X_scaled = scaler.transform(X)
    return X_scaled, scaler

def predict_anomaly(data, models, scaler):
    features = ["Water Consumption (liters)", "Household Size", "Pressure (bar)", "Temperature (C)", "Consumption_per_Person"]
    df = pd.DataFrame(data)
    df['Consumption_per_Person'] = df['Water Consumption (liters)'] / df['Household Size']
    X = df[features]
    X_scaled = scaler.transform(X)
    
    iso_forest, lof, svm = models
    iso_scores = iso_forest.decision_function(X_scaled)
    lof_predictions = lof.fit_predict(X_scaled)
    svm_predictions = svm.predict(X_scaled)
    
    ensemble_predictions = [1 if (iso_score < 0.3 or lof_pred == -1 or svm_pred == -1) else 0 
                            for iso_score, lof_pred, svm_pred in zip(iso_scores, lof_predictions, svm_predictions)]
    
    df['Anomaly'] = ensemble_predictions
    return df[df['Anomaly'] == 1]  # Return rows where anomaly is detected

def load_models():
    iso_forest = load('iso_forest_model.joblib')
    svm = load('svm_model.joblib')
    lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
    return iso_forest, lof, svm


