"""
AlertNex - AI Risk Assessment Machine Learning Module
Smart India Hackathon 2026 | PS ID: SIH26001
Ministry: Ministry of Development of North Eastern Region (MDoNER)

IMPORTANT NOTICE:
This module contains a prototype demonstration model trained on synthetic baseline
data calibrated against realistic NER geological parameters. Clearly labeled as:
'Prototype Risk Assessment Model / Demo AI Risk Simulation'.
"""

import numpy as np

class LandslideMLPrototype:
    def __init__(self):
        self.model_name = "AlertNex-WeightedPrototype-NER-v2.6"
        self.is_prototype = True
        self.feature_names = [
            "rainfall_mm",
            "soil_moisture_pct",
            "slope_degrees",
            "historical_index",
            "field_reports_count"
        ]
        self.weights = np.array([0.30, 0.25, 0.20, 0.15, 0.10])

    def predict_risk_probability(self, features: dict) -> dict:
        """
        Calculates vector risk probability and returns class confidence.
        """
        r = min(max(float(features.get("rainfall", 0)), 0), 100)
        sm = min(max(float(features.get("soil_moisture", 0)), 0), 100)
        sl = min(max(float(features.get("slope", 0)), 0), 100)
        ha = min(max(float(features.get("historical_activity", 0)), 0), 100)
        rep = min(max(float(features.get("recent_reports", 0)) * 20.0, 0), 100)

        vec = np.array([r, sm, sl, ha, rep])
        raw_score = float(np.dot(vec, self.weights))
        score = round(min(max(raw_score, 0.0), 100.0), 1)

        if score >= 76.0:
            level = "CRITICAL"
        elif score >= 51.0:
            level = "HIGH"
        elif score >= 26.0:
            level = "MODERATE"
        else:
            level = "LOW"

        # Synthetic classification probabilities
        prob_critical = max(min((score - 50) / 50.0, 1.0), 0.0) if score > 50 else 0.05
        prob_high = max(min((score - 25) / 50.0, 1.0), 0.0) if 25 < score <= 75 else 0.1
        prob_moderate = 1.0 - (prob_critical + prob_high) if score > 25 else 0.4
        prob_low = max(1.0 - (score / 50.0), 0.05) if score <= 50 else 0.02

        total = prob_critical + prob_high + prob_moderate + prob_low
        probabilities = {
            "CRITICAL": round(prob_critical / total, 3),
            "HIGH": round(prob_high / total, 3),
            "MODERATE": round(prob_moderate / total, 3),
            "LOW": round(prob_low / total, 3)
        }

        return {
            "model": self.model_name,
            "status": "Prototype Simulation",
            "score": score,
            "level": level,
            "class_probabilities": probabilities
        }

ml_engine = LandslideMLPrototype()
