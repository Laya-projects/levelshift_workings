from sqlalchemy import create_engine, text
import pandas as pd

engine = create_engine("sqlite:///practice.db")

rows = [
    ("Asha",   "Data Science", "Chennai",    2, 85, 92),
    ("Ravi",   "Data Science", "Madurai",    3, 72, 80),
    ("Meena",  "Computer Sci", "Chennai",    3, 91, 95),
    ("Kiran",  "Mechanical",   "Coimbatore", 1, 68, 70),
    ("Divya",  "Computer Sci", "Trichy",     4, 95, 98),
    ("Arjun",  "Mechanical",   "Chennai",    2, 55, 65),
    ("Sneha",  "Data Science", "Madurai",    4, 88, 90),
    ("Vikram", "Electrical",   "Coimbatore", 3, 77, 85),
    ("Priya",  "Electrical",   "Chennai",    1, 63, 72),
    ("Naveen", "Computer Sci", "Trichy",     2, 81, 88),
    ("Lakshmi","Data Science", "Chennai",    1, 94, 96),
    ("Suresh", "Mechanical",   "Madurai",    4, 59, 68),
]

with engine.begin() as conn:
    conn.execute(text("DROP TABLE IF EXISTS students"))
    conn.execute(text("""
        CREATE TABLE students (
            id INTEGER PRIMARY KEY,
            name TEXT,
            department TEXT,
            city TEXT,
            year INTEGER,
            marks INTEGER,
            attendance INTEGER
        )
    """))
    conn.execute(
        text("INSERT INTO students (name, department, city, year, marks, attendance) "
             "VALUES (:n, :d, :c, :y, :m, :a)"),
        [dict(n=r[0], d=r[1], c=r[2], y=r[3], m=r[4], a=r[5]) for r in rows],
    )



'''df = pd.read_sql("SELECT * FROM students WHERE department = 'Data Science' AND marks >85", engine)
df = pd.read_sql("SELECT * FROM students WHERE marks < 60 OR marks>94 ",engine)
df =pd.read_sql("SELECT name FROM students WHERE name LIKE '%ya%'", engine)
df = pd.read_sql("SELECT * FROM students WHERE department IN ('Mechanical','Data Science')",engine)
df = pd.read_sql("SELECT * FROM students WHERE department IN ('Computer Sci','Data Science') AND marks > 80 AND attendance >90",engine)
df = pd.read_sql("SELECT * FROM students ",engine)
'''

df_avg = pd.read_sql("""
    SELECT department, AVG(marks)
    FROM students
    GROUP BY department
    HAVING city = 'Chennai'
    ORDER BY AVG(marks) DESC
""",engine)

with engine.begin() as conn:
    conn.execute(text("UPDATE students SET marks = 98 WHERE name ='Priya'"))

from sqlalchemy import create_engine, text

engine = create_engine("sqlite:///practice.db")

with engine.connect() as conn:
    conn.execute(text("UPDATE students SET marks = 0 WHERE name = 'Asha'"))
    conn.rollback()   # undo: Asha's marks stay unchanged

with engine.connect() as conn:
    conn.execute(text("UPDATE students SET marks = 90 WHERE name = 'Asha'"))
    conn.commit()     # save permanently


df = pd.read_sql("SELECT * FROM students",engine)

print(df)

