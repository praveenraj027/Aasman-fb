From EarthData to Action 🌍☁️

Predicting Cleaner, Safer Skies with AI/ML and Earth Observation Data
NASA Space Apps Challenge 2025 – Team Vasiliades

🚀 Overview
Air pollution is a critical issue in India, with PM2.5 and PM10 levels directly impacting health, climate, and policy decisions. However, most monitoring relies on sparse ground stations, leaving large areas unmonitored.
Our project leverages satellite imagery, ground measurements, and atmospheric datasets to build AI/ML-powered models for pan-India air quality prediction and visualization.

🎯 Goals
Estimate and map PM2.5/PM10 levels across India.
Provide all-weather, nationwide coverage (beyond cities with monitoring stations).
Deliver timely, actionable insights for policymakers, healthcare, and citizens.

🌟 Key Features
Data Fusion: Combines satellite, ground, and atmospheric data.
AI-Powered: Uses ML/DL models instead of just interpolation.
Interactive Maps: Heatmaps and dashboards for easy interpretation.
Scalable: Designed for nationwide deployment.

🛠️ Tech Stack
Languages & Core
Python
Data Handling
Pandas, NumPy
GDAL, Rasterio
AI/ML
TensorFlow / Keras
scikit-learn
(PyTorch optional)
Geospatial Processing
SentinelHub, Satpy
OpenCV
GeoPandas, Shapely
Visualization
Matplotlib, Seaborn
Plotly, Folium
Dash / Streamlit (optional dashboards)
Deployment (optional)
Flask / FastAPI (for APIs)
Docker (containerization)
Tools
Jupyter Notebook
Git & GitHub
Anaconda
Data Sources
INSAT-3D/3DR (ISRO MOSDAC) – Satellite data
CPCB – Ground air quality datasets
MERRA/NARR – Atmospheric reanalysis datasets

🔄 Workflow
Data Collection
Download satellite data (INSAT, Sentinel).
Gather CPCB station data.
Fetch atmospheric datasets (MERRA/NARR).
Preprocessing
Clean and normalize datasets.
Align geospatial coordinates.
Extract features (temperature, wind, aerosols).
Model Training
Train baseline regression models.
Build deep learning models for higher accuracy.
Evaluate using RMSE, MAE, and R² metrics.
Prediction & Visualization
Generate nationwide heatmaps of PM2.5/PM10.
Build interactive maps for users.
Deployment (Future Work)
Expose models as REST APIs.
Provide a dashboard for real-time monitoring.

📊 Architecture
Data Sources → Preprocessing → AI/ML Models → Prediction API → Visualization Dashboard

💡 Impact
Public Health: Alerts citizens to unsafe air quality.
Policy Support: Helps governments identify pollution hotspots.
Nationwide Coverage: Even rural & unmonitored regions get mapped.
Scalable: Can be extended globally with different datasets.

💸 Estimated Cost
Item	Cost (INR)	Notes
Laptop/PC	40,000–80,000	Existing can be reused
Cloud GPU (opt.)	10,000–30,000 / month	For training large DL models
Software/Tools	0	Open-source only
Data Acquisition	0	Public datasets
Miscellaneous	500–2,000	Presentations, reports, etc.

👥 Team Vasiliades
Kaustubh Sen – Team Leader, AI/ML Developer
Utkarsh Kushwaha – Full Stack Developer
Praveen Rajak – Full Stack Developer
Yash Namdeo – AI/ML Developer
Divya Kushwaha – UI/UX Designer

📌 Future Enhancements
Real-time streaming of predictions.
Mobile/web dashboard for public access.
Integration with IoT air sensors for local accuracy boosts.
Expand globally with NASA’s MODIS, VIIRS datasets.

🏁 Conclusion

This project demonstrates how AI/ML + Earth Observation Data can bridge gaps in air quality monitoring, empowering policy-makers, scientists, and citizens to take informed action against air pollution.
