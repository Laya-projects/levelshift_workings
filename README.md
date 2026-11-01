# LevelShift Workings

Hands-on work completed as part of my LevelShift training: a full-stack React project, Python practice, and a DevOps CI/CD setup.

## Contents

- [Projects](#projects)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Virtual Environment](#virtual-environment)
- [Git Commands](#git-commands)

---

## Projects

### 🌸 MegaStore: full-stack e-commerce app
**Path:** [`React_js/my-app`](React_js/my-app/README.md)

A React (Vite) storefront backed by an Express REST API and a SQLite database.

- React Router pages: shop, product details, cart, orders and a 404 page
- Context API state management with a localStorage-persisted cart
- Tailwind CSS UI with loading and error states
- Express API (`better-sqlite3`):
  - `GET /api/products` and `GET /api/products/:id`
  - `POST /api/orders` (transactional, with server-side price calculation)
  - `GET /api/orders` (JOIN with line items)
- Dedicated API layer in `src/api/shopApi.js`

See the [project README](React_js/my-app/README.md) for setup, endpoints and the database schema.

**Quick start**
```bash
# Terminal 1: backend
cd React_js/my-app/server
npm install
node server.js

# Terminal 2: frontend
cd React_js/my-app
npm install
npm run dev
```

### 🐍 Python practice
**Path:** `python_practice/`

Python practice work and assessments from my training: data structures and algorithms, object-oriented programming, and general exercises.

### ⚙️ CI/CD: Jenkins, Docker and Kubernetes
Jenkins, Docker and Kubernetes are integrated with this GitHub repository (`levelshift_workings`).

---

## Project Structure

```
levelshift_workings/
├── React_js/
│   └── my-app/                # MegaStore full-stack project
│       ├── src/               # React frontend
│       ├── server/            # Express + SQLite backend
│       └── README.md
├── python_practice/
│   ├── assessment_Q3.py       # Assessment question 3
│   ├── asssessment_Q1.py      # Assessment question 1
│   ├── dsa.py                 # Data structures and algorithms
│   ├── oops.py                # Object-oriented programming
│   └── pract.py               # General practice exercises
└── README.md
```

---

## Getting Started

Requires Python 3.x for the Python practice and Node.js 18+ for MegaStore.

```powershell
git clone https://github.com/Laya-projects/levelshift_workings.git
cd levelshift_workings
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python python_practice/dsa.py
```

---

## Virtual Environment

```powershell
python -m venv venv              # create
.\venv\Scripts\Activate.ps1      # activate
pip install <package>            # install a package
pip freeze > requirements.txt    # save packages
deactivate                       # leave environment
```

`venv/` is listed in `.gitignore`, so it isn't uploaded to GitHub.

---

## Git Commands

```bash
# Setup (one time)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Create and link a repo
git init -b main
git remote add origin <repo-url>
git remote -v                    # check the link

# Daily workflow
git status                       # see changes
git add .                        # stage files
git commit -m "message"          # save snapshot
git push                         # upload (first time: git push -u origin main)

# Syncing and history
git pull origin main             # download changes
git log --oneline --graph --all  # view history
```
