import pandas as pd
from sqlalchemy import create_engine, text

# Engine = connection to a SQLite file (created automatically)
engine = create_engine("sqlite:///practice.db")

# Create a table and insert rows
with engine.begin() as conn:
    conn.execute(text("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, marks INTEGER)"))
    conn.execute(text("DELETE FROM students"))
    conn.execute(
        text("INSERT INTO students (name, marks) VALUES (:name, :marks)"),
        [{"name": "Asha", "marks": 85}, {"name": "Ravi", "marks": 72}, {"name": "Meena", "marks": 91}],
    )


with engine.begin() as conn:
    conn.execute(
        text("INSERT INTO students (name, marks) VALUES (:name, :marks)"),
        [{"name": "Kiran", "marks": 68}, {"name": "Divya", "marks": 95}],
    )
# Run a SQL query and get a DataFrame
df = pd.read_sql("SELECT * FROM students WHERE marks >=75 ORDER BY marks DESC LIMIT 2", engine)
df = pd.read_sql("SELECT name FROM students",engine)

df = pd.read_sql("SELECT * FROM students ORDER BY name ",engine)
df = pd.read_sql("SELECT * FROM students ORDER BY marks DESC LIMIT 3 ",engine)
df = pd.read_sql("SELECT name,marks FROM students WHERE marks BETWEEN 70 AND 90 ORDER BY marks DESC",engine)


print(df)