import os
import pickle

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

model_file_name = os.getenv("MODEL_FILE_NAME", "iris_model.pkl")

# Load the trained model once, when the app starts
with open(model_file_name, 'rb') as f:
    model = pickle.load(f)

app = FastAPI()


# Define input data model
class IrisData(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float


# Define output data model
class IrisResponse(BaseModel):
    prediction: str


def predict_iris_species(input_data):
    input_array = np.array([
        input_data.sepal_length, input_data.sepal_width,
        input_data.petal_length, input_data.petal_width
    ]).reshape(1, -1)

    prediction = model.predict(input_array)[0]

    species_map = {
        0: 'Iris Setosa',
        1: 'Iris Versicolour',
        2: 'Iris Virginica'
    }
    return IrisResponse(prediction=species_map[prediction])


@app.post("/predict")
def predict_single(data: IrisData):
    return predict_iris_species(data)


@app.post("/predict_batch")
def predict_batch(data: list[IrisData]):
    return [predict_iris_species(item) for item in data]

# open the fast api with the following link : http://localhost:8090/docs