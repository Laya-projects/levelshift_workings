import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("sqlite:///practice.db")

df_inner = pd.read_sql("""
    SELECT s.name, s.marks,d.department,d.hod
    FROM students s 
    INNER JOIN departments d 
    ON s.department = d.department
""",engine)

df_left =pd.read_sql("""
    SELECT s.name,s.marks,d.department,d.hod
    FROM students s
    LEFT JOIN departments d
    ON s.department=d.department
""",engine)

df_right =pd.read_sql("""
    SELECT s.name,s.marks,d.department,d.hod
    FROM students s
    RIGHT JOIN departments d
    ON s.department=d.department
""",engine)

#print(df_inner)
#print(df_left)
#print(df_right)

df_full = pd.read_sql(""" SELECT s.name, s. marks, d. department, d. hod 
FROM students s 
FULL JOIN departments d 
ON s.department=d.department
GROUP BY d.hod""",engine)

df_full_correct=pd.read_sql("""
    SELECT 
        d.hod,
        d.department,
        COUNT(s.name) AS total_students,
        ROUND(AVG(s.marks), 2) AS avg_marks
    FROM students s 
    FULL JOIN departments d 
        ON s.department = d.department
    GROUP BY d.hod, d.department

""",engine)


#print(df_full_correct)