name = input().strip().title()
marks = list(map(int, input().split()))

def analysing_marks(*marks, pass_mark=40):
    total = sum(marks)
    average = round(total / len(marks), 2)
    highest = max(marks)
    lowest = min(marks)
    failed_count = sum(1 for m in marks if m < pass_mark)
    return (total, average, highest, lowest, failed_count)

total, average, highest, lowest, failed = analysing_marks(*marks)


if average >= 90:
    grade = "A"
elif average >= 75:
    grade = "B"
elif average >= 60:
    grade = "C"
elif average >= 40:
    grade = "D"
else:
    grade = "F"

top3 = sorted(marks, reverse=True)[:3]


print("===== Report Card =====")
print(f"Student : {name}")
for i, m in enumerate(marks,start=1):
    status = "PASS" if m>= 40 else "FAIL"
    print(f"Subject {i} : {m} - {status}")
print(f"Total : {total}")
print(f"Average : {average:.2f}")
print(f"Highest : {highest}")
print(f"Lowest : {lowest}")
print(f"Failed : {failed}")
print(f"Top 3 : {top3}")
print(f"Grade : {grade}")
