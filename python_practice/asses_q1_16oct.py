'''(a) Setting up a evironment 

>>> python -m venv assessment_env
>>> pip install requests

'''

name = input().strip().title()
marks = list(int(m) for m in input().split())

initials = "".join(word[0].upper() + "." for word in name.split())

def calculate_stats(*marks):
    total = sum(marks)
    average = total / len(marks)
    highest = max(marks)
    lowest = min(marks)
    return total, average, highest, lowest

total, average, highest, lowest = calculate_stats(*marks)

def get_grade(avg, pass_mark=40):
    if avg >= 90:
        return "A+"
    elif avg >= 75:
        return "A"
    elif avg >= 60:
        return "B"
    elif avg >= pass_mark:
        return "C"
    else:
        return "F"

grade = get_grade(average)



above_avg=0
idx=0
while idx<len(marks):
    if marks[idx]>average:
        above_avg+=1
    idx+=1
  

top3 = sorted(marks, reverse=True)[:3]
reversed_marks = marks[::-1]


print("===== REPORT CARD ======")
print(f"Name : {name}")
print(f"Initial : {initials}")


fail_count = 0

for i,mark in enumerate(marks, start=1):
    if mark >= 40:
        status = "Pass"

    else:
        status = "Fail"
        fail_count +=1
    print(f"Subject {i} : {mark} -> {status}")


  
if fail_count > 0:
    result = f"FAIL ({fail_count} subject(s) failed)"
elif average >= 75:
    result = "DISTINCTION"
else:
    result = "PASS"

print(f"Total : {total}")
print(f"Average : {average:.2f}")
print(f"Highest : {highest}")
print(f"Lowest : {lowest}")
print(f"Grade : {grade}")
print(f"Above average subjects: {above_avg}")
print(f"Top 3 marks: {top3}")
print(f"Marks in reverse order: {reversed_marks}")
print(f"Result : {result}")
print(f"Data types -> name: {type(name).__name__}")
print(f"marks: {type(marks).__name__}")
print(f"average: {type(average).__name__}")