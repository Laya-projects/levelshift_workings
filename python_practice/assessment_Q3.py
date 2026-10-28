from abc import ABC, abstractmethod


class Employee(ABC):
    def __init__(self, name, emp_id):
        super().__init__()
        self.name = name
        self.emp_id = emp_id

    @abstractmethod
    def calculate_salary(self):
        pass

class FullTimeEmployee(Employee):
    def __init__(self,name,emp_id,salary):
        super().__init__(name,emp_id)
        self.salary=float(salary)

    def calculate_salary(self):
        fixed_salary = self.salary
        print(f"{self.name} - FullTimeEmployee - Salary :{fixed_salary:.2f}")
        return fixed_salary

class PartTimeEmployee(Employee):
    def __init__(self,name,emp_id,hours,rate):
        super().__init__(name,emp_id)
        self.hours=float(hours)
        self.rate=float(rate)

    def calculate_salary(self):
        salary = self.hours * self.rate
        print(f"{self.name} - PartTimeEmployee - Salary: {salary:.2f}")
        return salary

class Manager(FullTimeEmployee):
    def __init__(self,name,emp_id,salary,bonus):
        super().__init__(name,emp_id,salary)
        self.bonus = float(bonus)

    def calculate_salary(self):
        base_salary = super().calculate_salary()
        total_salary = base_salary + self.bonus 
        print(f"{self.name} - Manager - Salary :{total_salary:.2f}")
        return total_salary

class Contractor:
    def __init__(self,name,fee):
        self.name = name
        self.fee = float(fee)

    def calculate_salary(self):
        print(f"{self.name} - contractor - Salary : {self.fee} ")
        return self.fee

def salary_processing(n):
    payroll = 0
    instance_list =[]
    for i in range(n):
        desc = input()
        list_desc = list(desc.strip().split())
        type = list_desc[0].lower()
    
        if type == "full":
            name = list_desc[1]
            emp_id = list_desc[2]
            salary = list_desc[3]
            emp_obj = FullTimeEmployee(name,emp_id,salary)
            payroll += emp_obj.calculate_salary()

        elif type == "part":
            name = list_desc[1]
            emp_id = list_desc[2]
            hours = list_desc[3]
            rate = list_desc[4]
            emp_obj= PartTimeEmployee(name,emp_id,hours,rate)
            payroll += emp_obj.calculate_salary()


        elif type == "manager":
            name = list_desc[1]
            emp_id = list_desc[2]
            salary = list_desc[3]
            bonus = list_desc[4]
            emp_obj= Manager(name,emp_id,salary,bonus)
            payroll += emp_obj.calculate_salary()


        elif type == "contractor":
            name = list_desc[1]
            fee = list_desc[2]

            emp_obj = Contractor(name,fee)
            payroll += emp_obj.calculate_salary()

    instance_list.append(emp_obj)

    print(f"\nTotal Payroll Cost: ₹{payroll}")

        
    emp_count = sum(isinstance(type,Employee) for type in instance_list)
    print(f"Employees inheriting from Employee: {emp_count}")     

if __name__ == "__main__":
    try:
        dummy=Employee("suresh",90)

    except TypeError :
        print("Cannot instantiate abstract class Employee.")

    n=int(input())

    action = salary_processing(n)
    



