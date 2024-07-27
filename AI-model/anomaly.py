import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.svm import OneClassSVM
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from joblib import dump, load

def load_data(train_path, validation_path, test_path):
    train_df = pd.read_csv(train_path)
    validation_df = pd.read_csv(validation_path)
    test_df = pd.read_csv(test_path)
    return train_df, validation_df, test_df

def feature_engineering(df):
    df['Consumption_per_Person'] = df['Water Consumption (liters)'] / df['Household Size']
    return df

def preprocess_data(df, scaler=None, fit_scaler=False):
    features = ["Water Consumption (liters)", "Household Size", "Pressure (bar)", "Temperature (C)", "Consumption_per_Person"]
    X = df[features]
    if fit_scaler:
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        dump(scaler, 'scaler.joblib')
    else:
        X_scaled = scaler.transform(X)
    return X_scaled, scaler

def train_models(X_train):
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
    svm = OneClassSVM(nu=0.1, kernel='rbf', gamma=0.1)

    iso_forest.fit(X_train)
    svm.fit(X_train)
    return iso_forest, lof, svm

def save_models(models):
    iso_forest, _, svm = models
    dump(iso_forest, 'iso_forest_model.joblib')
    dump(svm, 'svm_model.joblib')

def load_models():
    iso_forest = load('iso_forest_model.joblib')
    svm = load('svm_model.joblib')
    lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
    return iso_forest, lof, svm

def predict_anomaly(data, models, scaler):
    features = ["Water Consumption (liters)", "Household Size", "Pressure (bar)", "Temperature (C)", "Consumption_per_Person"]
    df = pd.DataFrame(data, index=[0])
    df['Consumption_per_Person'] = df['Water Consumption (liters)'] / df['Household Size']
    X = df[features]
    X_scaled = scaler.transform(X)
    
    iso_forest, lof, svm = models
    iso_scores = iso_forest.decision_function(X_scaled)
    lof_predictions = lof.fit_predict(X_scaled)
    svm_predictions = svm.predict(X_scaled)
    
    ensemble_predictions = [1 if (iso_score < 0.3 or lof_pred == -1 or svm_pred == -1) else 0 
                            for iso_score, lof_pred, svm_pred in zip(iso_scores, lof_predictions, svm_predictions)]
    
    return ensemble_predictions[0] == 1  # Return True if anomaly detected
