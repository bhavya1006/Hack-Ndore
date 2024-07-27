import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.svm import OneClassSVM
from sklearn.metrics import f1_score, classification_report, accuracy_score, precision_score, recall_score
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from joblib import dump, load
import matplotlib.pyplot as plt
import seaborn as sns

# Load data
def load_data(train_path, validation_path, test_path):
    train_df = pd.read_csv(train_path)
    validation_df = pd.read_csv(validation_path)
    test_df = pd.read_csv(test_path)
    return train_df, validation_df, test_df

# Feature engineering
def feature_engineering(df):
    df['Consumption_per_Person'] = df['Water Consumption (liters)'] / df['Household Size']
    return df

# Preprocess data
def preprocess_data(df, scaler=None, fit_scaler=False):
    features = ["Water Consumption (liters)", "Household Size", "Pressure (bar)", "Temperature (C)", "Consumption_per_Person"]
    X = df[features]
    if fit_scaler:
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
    else:
        X_scaled = scaler.transform(X)
    return X_scaled, scaler

# Train models
def train_models(X_train):
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    lof = LocalOutlierFactor(n_neighbors=15, contamination=0.1)
    svm = OneClassSVM(nu=0.1, kernel='rbf', gamma=0.1)

    iso_forest.fit(X_train)
    svm.fit(X_train)
    # LOF does not have a separate fit method
    return iso_forest, lof, svm

# Predict anomalies
def predict_anomalies(models, X):
    iso_forest, lof, svm = models
    val_scores = iso_forest.decision_function(X)
    scaler = MinMaxScaler()
    val_scores_scaled = scaler.fit_transform(val_scores.reshape(-1, 1))
    threshold = 0.3
    iso_predictions = (val_scores_scaled < threshold).astype(int)
    
    lof_predictions = lof.fit_predict(X)
    lof_predictions = [1 if pred == -1 else 0 for pred in lof_predictions]
    
    svm_predictions = svm.predict(X)
    svm_predictions = [1 if pred == -1 else 0 for pred in svm_predictions]
    
    ensemble_predictions = [1 if (iso_pred + lof_pred + svm_pred) >= 2 else 0 
                            for iso_pred, lof_pred, svm_pred in zip(iso_predictions, lof_predictions, svm_predictions)]
    return ensemble_predictions

# Evaluate model
def evaluate_model(y_true, y_pred):
    f1 = f1_score(y_true, y_pred)
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    print(f"F1 Score: {f1}")
    print(f"Accuracy: {accuracy}")
    print(f"Precision: {precision}")
    print(f"Recall: {recall}")
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred))

# Save models
def save_models(models, file_paths):
    iso_forest, _, svm = models
    dump(iso_forest, file_paths['iso_forest'])
    dump(svm, file_paths['svm'])

# Load models
def load_models(file_paths):
    iso_forest = load(file_paths['iso_forest'])
    svm = load(file_paths['svm'])
    lof = LocalOutlierFactor(n_neighbors=20, contamination=0.1)
    return iso_forest, lof, svm

# Main function
def main(train_path, validation_path, test_path):
    # Load data
    train_df, validation_df, test_df = load_data(train_path, validation_path, test_path)

    # Feature engineering
    train_df = feature_engineering(train_df)
    validation_df = feature_engineering(validation_df)
    test_df = feature_engineering(test_df)

    # Preprocess data
    X_train, scaler = preprocess_data(train_df, fit_scaler=True)
    X_val, _ = preprocess_data(validation_df, scaler=scaler)
    y_val = validation_df["Anomaly"]
    X_test, _ = preprocess_data(test_df, scaler=scaler)
    y_test = test_df["Anomaly"]

    # Train models
    models = train_models(X_train)

    # Save models
    file_paths = {'iso_forest': 'iso_forest_model.joblib', 'svm': 'svm_model.joblib'}
    save_models(models, file_paths)

    # Predict anomalies on validation set
    val_predictions = predict_anomalies(models, X_val)

    # Evaluate on validation set
    print("Validation Set Evaluation:")
    evaluate_model(y_val, val_predictions)

    # Predict anomalies on test set
    test_predictions = predict_anomalies(models, X_test)

    # Evaluate on test set
    print("Test Set Evaluation:")
    evaluate_model(y_test, test_predictions)

    # Visualization
    plt.figure(figsize=(10, 6))
    sns.histplot(data=train_df, x="Water Consumption (liters)", hue="Locality", multiple="stack", kde=True)
    plt.title("Distribution of Water Consumption by Locality")
    plt.xlabel("Water Consumption (liters)")
    plt.ylabel("Frequency")
    plt.show()

    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=train_df, x="Temperature (C)", y="Water Consumption (liters)", hue="Anomaly", palette="coolwarm")
    plt.title("Water Consumption vs Temperature (with Anomalies)")
    plt.xlabel("Temperature (C)")
    plt.ylabel("Water Consumption (liters)")
    plt.show()

# Paths to the datasets
train_path = r"C:\Users\bindu\OneDrive\Desktop\Hacktahon Projects\Hack-Ndore\AI-model\dataset\indore_water_supply_train.csv"
validation_path = r"C:\Users\bindu\OneDrive\Desktop\Hacktahon Projects\Hack-Ndore\AI-model\dataset\indore_water_supply_validation.csv"
test_path = r"C:\Users\bindu\OneDrive\Desktop\Hacktahon Projects\Hack-Ndore\AI-model\dataset\indore_water_supply_test.csv"

# Execute main function
main(train_path, validation_path, test_path)
