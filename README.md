# LevelShift Workings

# Jenkins, Docker and kubernetes integrated to git

successfully integrated all three with github repo of levelshift_workings

# Python practice

Python practice work and assessments completed as part of my LevelShift training.

## Project Structure

```
python_practice/
├── assessment_Q3.py     # Assessment question 3
├── asssessment_Q1.py    # Assessment question 1
├── dsa.py               # Data structures and algorithms
├── oops.py              # Object-oriented programming
└── pract.py             # General practice exercises
```

## Getting Started

Requires Python 3.x.

```powershell
git clone https://github.com/Laya-projects/levelshift_workings.git
cd levelshift_workings
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python python_practice/dsa.py
```

## Virtual Environment

```powershell
python -m venv venv              # create
.\venv\Scripts\Activate.ps1      # activate
pip install <package>            # install a package
pip freeze > requirements.txt    # save packages
deactivate                       # leave environment
```

`venv/` is listed in `.gitignore`, so it isn't uploaded to GitHub.

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
