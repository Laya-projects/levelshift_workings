# Sample FastAPI App on Kubernetes (minikube)

A tiny FastAPI app packaged with Docker and deployed on a local Kubernetes cluster (minikube). It returns one JSON message and shows the full flow: code → image → registry → Deployment → Service → browser.

## Project structure

```
Kubernetes_demo1/
├── app.py                    # FastAPI app with one route: /
├── Dockerfile                # builds the image
├── sample-deployment.yaml    # what to run
└── sample-service.yaml       # how to reach it
```

## Prerequisites

- Docker Desktop (running)
- minikube and kubectl
- A Docker Hub account (this project uses `layashreer`)

## Steps

1. **Start the cluster**
   ```powershell
   minikube start --driver=docker
   ```

2. **Build the Docker image**
   ```powershell
   docker build -t sample-app:v1 .
   ```

3. **Tag and push to Docker Hub**
   ```powershell
   docker tag sample-app:v1 layashreer/sample-app:v1
   docker push layashreer/sample-app:v1
   ```

4. **Deploy to Kubernetes**
   ```powershell
   kubectl apply -f sample-deployment.yaml
   kubectl apply -f sample-service.yaml
   kubectl get pods
   kubectl get services
   ```
   Wait until the pod shows `Running` and `1/1`.

5. **Open a tunnel to the service** (keep this terminal open)
   ```powershell
   minikube service sample-app-service --url
   ```

6. **Test it**
   Open the printed URL in a browser, or run:
   ```powershell
   curl.exe http://127.0.0.1:<port>/
   ```
   Expected output: `{"message":"Kubernetes with Docker Image!!"}`

## Cleanup

```powershell
kubectl delete -f sample-deployment.yaml
kubectl delete -f sample-service.yaml
minikube stop      # pause the cluster, keep everything
```

## Notes

- Deployments use `apiVersion: apps/v1`, not `v1`.
- The `image` in `sample-deployment.yaml` must use your own Docker Hub username.
- The Service type is `LoadBalancer`. On minikube the external IP stays `<pending>`, so we reach it with `minikube service`.
- In PowerShell, `curl` is an alias for `Invoke-WebRequest`. Use `curl.exe` for the real curl.
- The tunnel port is random each run and the tunnel only works while its terminal is open.
