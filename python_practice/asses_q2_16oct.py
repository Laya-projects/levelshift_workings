from abc import ABC, abstractmethod
import sys


class InvalidSalaryError(Exception):
    pass

class DuplicateEmployeeError(Exception):
    pass


class Employee(ABC):
    company = "TechNova"

    def __init__(self, emp_id, name, department):
        self.emp_id = emp_id
        self.name = name
        self._department = department

    @property
    def department(self):
        return self._department

    @abstractmethod
    def calculate_pay(self):
        pass


class FullTimeEmployee(Employee):
    def __init__(self, emp_id, name, department, salary, bonus_percent):
        super().__init__(emp_id, name, department)
        self.salary = salary
        self.bonus_percent = bonus_percent

    @property
    def salary(self):
        return self.__salary

    @salary.setter
    def salary(self, value):
        if value <= 0:
            raise InvalidSalaryError("Invalid salary for " + self.name)
        self.__salary = value

    def calculate_pay(self):
        pay = self.__salary + (self.__salary * self.bonus_percent / 100)
        return pay


class Contractor(Employee):
    def __init__(self, emp_id, name, department, hourly_rate, hours):
        super().__init__(emp_id, name, department)
        self.hourly_rate = hourly_rate
        self.hours = hours

    @property
    def hourly_rate(self):
        return self.__hourly_rate

    @hourly_rate.setter
    def hourly_rate(self, value):
        if value <= 0:
            raise InvalidSalaryError("Invalid salary for " + self.name)
        self.__hourly_rate = value

    def calculate_pay(self):
        return self.__hourly_rate * self.hours


class Intern:
    STIPEND = 10000

    def __init__(self, emp_id, name, department):
        self.emp_id = emp_id
        self.name = name
        self.department = department

    def calculate_pay(self):
        return self.STIPEND


class Payroll:
    total_added = 0

    def __init__(self):
        self.employees = {}

    def add_employee(self, emp):
        if emp.emp_id in self.employees:
            raise DuplicateEmployeeError("Duplicate employee ID " + emp.emp_id)
        self.employees[emp.emp_id] = emp
        Payroll.total_added += 1

    def total_payout(self):
        total = sum(e.calculate_pay() for e in self.employees.values())
        return total

    def highest_paid(self):
        top = max(self.employees.values(), key=lambda e: e.calculate_pay())
        return (top.name, top.calculate_pay())

    def department_summary(self):
        totals = {}
        for e in self.employees.values():
            if e.department in totals:
                totals[e.department] += e.calculate_pay()
            else:
                totals[e.department] = e.calculate_pay()
        ordered = sorted(totals.items(), key=lambda x: x[1], reverse=True)
        return dict(ordered)

    def departments(self):
        d = {e.department for e in self.employees.values()}
        return sorted(d)

    def register(self):
        lines = [f"{e.emp_id} | {e.name} | {type(e).__name__} | {e.calculate_pay():.2f}" for e in self.employees.values()]
        return lines


p = Payroll()
processed = 0

n = int(input())
for i in range(n):
    line = input().strip()
    try:
        parts = line.split()
        kind = parts[0]
        eid = parts[1]
        name = parts[2]
        dept = parts[3]

        if kind == "FT":
            emp = FullTimeEmployee(eid, name, dept, float(parts[4]), float(parts[5]))
        elif kind == "CT":
            emp = Contractor(eid, name, dept, float(parts[4]), float(parts[5]))
        elif kind == "IN":
            emp = Intern(eid, name, dept)
        else:
            raise ValueError("bad type")

        p.add_employee(emp)
        

    except (InvalidSalaryError, DuplicateEmployeeError) as e:
        print("Error:", e)
    except (ValueError, IndexError):
        print("Error: Malformed record ->", line)
    finally:
        processed += 1

print("=== Payroll Register (TechNova) ===")
for r in p.register():
    print(r)

print(f"Employees added: {Payroll.total_added}")
print(f"Total payout: {p.total_payout():.2f}")

name, pay = p.highest_paid()
print(f"Highest paid: {name} ({pay:.2f})")

print("Department summary:")
summary = p.department_summary()
for dept in summary:
    print(f"  {dept}: {summary[dept]:.2f}")

print("Departments:", p.departments())
print("Records processed:", processed)


t = FullTimeEmployee("T1", "Test", "QA", 1000, 0)

try:
    Employee("0", "x", "y")
except TypeError:
    print("Abstract check: Employee is abstract")

print("Access check:", hasattr(t, '__salary'))

try:
    t.salary = 0
except InvalidSalaryError as e:
    print("Setter check:", e)


'''(i) Open/closed principle principle does Payroll follow by depending on calculate_pay() method. this is because 
Payroll is the methode we need no changes when we add new employee types.
Payroll is open for extension because we can add new employee types (like Freelancer) by creating a new class
with calculate_pay() method and passing it to add_employee(). This is open/closed principle'''

''' (ii) Single Responsibility Principle explains that , here each class like Exceptions, employee classes
(FullTimeEmployee, Contractor, Intern), parsing and Payroll each do one job each, so each has only one reason to change.'''

''' (iii) __salary is said to be private attribute but it only becomes _FullTimeEmployee__salary -- we can access it by calling it by its class name followed by attribute name(_FullTimeEmployee__salary).
Python only hides it, not locks it.'''


