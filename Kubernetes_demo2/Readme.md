# Iris Classifier on Kubernetes (minikube)

A small ML workload: a scikit-learn model served by FastAPI, packaged with Docker and deployed on a local Kubernetes cluster (minikube).

## Project structure

```
Kubernetes_demo2/
├── train.py                          # trains the model, saves iris_model.pkl
├── app.py                            # FastAPI app: /predict and /predict_batch
├── api_request.py                    # test client (standard library only)
├── requirements.txt                  # pinned library versions
├── Dockerfile                        # builds the image
├── iris-classifier-deployment.yaml   # what to run
└── iris-classifier-service.yaml      # how to reach it
```

## Prerequisites

- Docker Desktop (running)
- minikube and kubectl
- Python 3 with a virtual environment
- A Docker Hub account (this project uses `layashreer`)

## Steps

1. **Train the model**
   ```powershell
   python train.py
   ```
   Creates `iris_model.pkl`.

2. **Build the Docker image**
   ```powershell
   docker build -t iris-fastapi-service:v1 .
   ```

3. **Test the container locally** (optional)
   ```powershell
   docker run --rm -p 8090:80 iris-fastapi-service:v1
   ```
   Open `http://localhost:8090/docs`.

4. **Push to Docker Hub**
   ```powershell
   docker tag iris-fastapi-service:v1 layashreer/iris-fastapi-service:v1
   docker push layashreer/iris-fastapi-service:v1
   ```

5. **Start the cluster**
   ```powershell
   minikube start --driver=docker
   ```

6. **Deploy to Kubernetes**
   ```powershell
   kubectl apply -f iris-classifier-deployment.yaml
   kubectl apply -f iris-classifier-service.yaml
   kubectl get pods
   ```
   Wait until the pod shows `Running` and `1/1`.

7. **Open a tunnel to the service** (keep this terminal open)
   ```powershell
   minikube service iris-predictor-service --url
   ```

8. **Send a prediction request**
   Put the printed port into `api_request.py`, then run:
   ```powershell
   python api_request.py
   ```
   Expected output: `{'prediction': 'Iris Setosa'}`

## Cleanup

```powershell
minikube stop      # pause the cluster, keep everything
minikube delete    # remove the cluster completely
```

## Notes and fixes

- Newer scikit-learn removed multiclass support for the `liblinear` solver, so `train.py` uses `lbfgs`.
- Library versions in `requirements.txt` must match the version that created `iris_model.pkl`.
- `app.py` reads `MODEL_FILE_NAME` from the environment, so the `env` setting in the Deployment YAML takes effect.
- Deployments use `apiVersion: apps/v1`.
- The ports in `docker run -p 8090:80` and the tunnel URL are only for local testing. The container always listens on port 80.