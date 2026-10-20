from sqlalchemy import create_engine, text
import pandas as pd

engine = create_engine("sqlite:///practice.db")

with engine.begin() as conn:
    conn.execute(text("DROP TABLE IF EXISTS departments"))
    conn.execute(text("""
        CREATE TABLE departments (
            dept_id INTEGER PRIMARY KEY,
            department TEXT ,
            hod TEXT,
            block TEXT
        )
    """))
    conn.execute(
        text("INSERT INTO departments (department, hod, block) VALUES (:d, :h, :b)"),
        [
            dict(d="Data Science", h="Dr. Anand",  b="A"),
            dict(d="Computer Sci", h="Dr. Revathi", b="A"),
            dict(d="Mechanical",   h="Dr. Karthik", b="B"),
            dict(d="Civil",        h="Dr. Meera",   b="C"),
            dict(d="Physics",      h="Dr. Suresh",  b="D"),
        ],
    )

df = pd.read_sql("SELECT * FROM departments", engine)


print(df)