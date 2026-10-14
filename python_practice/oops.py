class Employee:
    def __init__(self, name, base_salary):
        self.name=name
        self.base_salary=base_salary
    
    def calculate_pay(self):
        self.base_salary += self.base_salary*0.05
        return self.base_salary

class Manager(Employee):
    def __init__(self,name,base_salary,team_bonus):
        super().__init__(name,base_salary)
        self.team_bonus = team_bonus

    def calculate_pay(self):
        super().calculate_pay()
        self.base_salary += self.team_bonus
        print(f"your salary: {self.base_salary}")


san=Manager("san",40000,5000)

san.calculate_pay()

from abc import ABC, abstractmethod
class DeliveryVehicle(ABC):

    def __init__(self):
        super().__init__()

    @property
    @abstractmethod
    def fuel_type(self):
        pass
    
    @abstractmethod
    def calculate_eta(self,distance:float) -> float:
        return 8.9
    
    @abstractmethod
    def consume_energy(self,distance:float) -> float:
        return 5.7

    def delivery_package(self, package_id: str, distance: float):
        print("DELIVERY JUST STARTED")
        energy = self.consume_energy(distance)
        eta = self.calculate_eta(distance)

        print(f"the {package_id} will be delivered by {eta}")

class ElectricTruck(DeliveryVehicle):

    def __init__(self, vehicle_id, batter_capacity):
        super().__init__()
        self.vehicle_id=vehicle_id
        self.batter_capacity=batter_capacity
        
    @property
    def fuel_type(self):
        return "Battery"

    def calculate_eta(self,distance:float) -> float:
        eta = 60/distance

        return eta

    def consume_energy(self,distance:float) -> float:
        return distance


class AutonomousDrone:

    def calculate_eta(self,distance:float) -> float:
        print("in autodrone-eta")
        return 8.9
    

    def consume_energy(self,distace:float) -> float:
        print("in autodrone-energy")
        return 5.7

    def delivery_package(self, package_id: str, distance: float):
        print("DELIVERY JUST STARTED for autodrones")
        energy = self.consume_energy(distance)
        eta = self.calculate_eta(distance)

        return f"the {package_id} will be delivered by {eta}"

def dispatch_delivery_fleet(vehicles: list, package_list: list, distance: float):
    for vehicle,package_id in zip(vehicles,package_list):
        print(vehicle.delivery_package(package_id,distance))

if __name__ == "__main__":
    max_truck = ElectricTruck(564,"600 watz")
    lux_vehi =ElectricTruck(565,"798 watz")

    rul_drone =AutonomousDrone()

    dispatch_delivery_fleet([max_truck,lux_vehi,rul_drone],[111,123,124],432)

from abc import ABC, abstractmethod

class TransactionProcessor(ABC):

    def __init__(self):
        super().__init__()

    @property
    @abstractmethod
    def processor_name():
        return payment
    

    @abstractmethod
    def calculate_fee(self,amount:float)->float:
        print("in transactionprocessor - calculate fee")
        return amount*0.5

    @abstractmethod
    def verify_funds(self, account_id: str, amount: float) -> bool:
        print("in transactionprocessor - verify_funds")
        return amount>5000

    def execute_transaction(self, transaction_id: str, account_id: str, amount: float) -> str:
        print("transaction verification is starting")
        fund_verification = self.verify_funds
        if fund_verification:
            calculated_fee = self.calculate_fee
            amount -= calculated_fee
            process_name = self.process_name()

        print(f"the id :{transaction_id} , amount processed : {amount:.2f}, the process name is {process_name}")

class CreditCardProcessor(TransactionProcessor):

    def __init__(self, merchant_id:str, daily_limit:float):
        super().__init__()
        merchant_id=self.merchant_id
        daily_limit=self.daily_limit


    @property
    def processor_name():
        return "visa/mastercard"
    def verify_funds(self,account_id,amount):
        print("verify_fund in creditcardprocessor")
        return True

    def calculate_fee(self,amount:float)->float:
        print("in creditcardprocessor - calculate fee")
        return amount*0.25

    
class CryptoProcessor:
    

    @abstractmethod
    def calculate_fee(self,amount:float)->float:
        print("in CryptoProcessor - calculate fee")
        return amount*0.5

    @abstractmethod
    def verify_funds(self, account_id: str, amount: float) -> bool:
        print("in CryptoProcessor - verify_funds")
        return True

    def execute_transaction(self, transaction_id: str, account_id: str, amount: float) -> str:
        print("CryptoProcessor transaction verification is starting")
        fund_verification = self.verify_funds
        if fund_verification:
            calculated_fee = self.calculate_fee
            amount -= calculated_fee
            process_name = self.process_name()

        print(f"the id :{transaction_id} , amount processed : {amount:.2f}, the process name is {process_name}")


def executing_transaction(process_type : list, account_id:list, transaction_id:list, amount):
    for process_type,account_id,transaction_id in zip(process_type,account_id,transaction_id):
        process_type()


try:
    class TradingSystemException(Exception):
        pass

    class ComplianceViolationException(TradingSystemException):
        def __init__(self,rejected_transc):
            super().__init__()
            self.rejected_transc=rejected_transc

        print("its a ComplianceViolationException")

    class InsufficentLiquidityException(TradingSystemException):
        def __init__(self,rejected_transc):
            super().__init__()
            self.rejected_transc=rejected_transc

        print("its a InsufficentLiquidityException")

except:

# Raw dataset to copy into your script
raw_review = [
    {"user": "Arjun", "product": "laptop", "rating": 5, "tags": ["Tech", "Work", "TECH"]},
    {"user": "Priya", "product": "Mouse", "rating": 4, "tags": ["tech", "Ergonomic"]},
    {"user": "Rohan", "product": "COFFEE MUG", "rating": 3, "tags": ["Office", "Kitchen"]},
    {"user": "Neha", "product": "laptop", "rating": 2, "tags": ["Tech", "Disappointing"]},
    {"user": "Amit", "product": "USB CABLE", "rating": 5, "tags": ["tech", "Utility"]}
]


results =[ review["product"].lower() for review in raw_review]
print(results)

res_set={ tags.lower() for review in raw_review for tags in review["tags"] }
print(res_set)
res_dict = { review["user"]: review["product"].upper() for review in raw_review if review["rating"]>=4}

print(res_dict)
    
# Raw dataset to copy into your script
network_logs = [
    {"ip": "192.168.1.5", "status": "ALLOW", "packets": 12, "ports": [80, 443]},
    {"ip": "10.0.0.12", "status": "BLOCK", "packets": 4, "ports": [22]},
    {"ip": "192.168.1.5", "status": "ALLOW", "packets": 45, "ports": [443, 8080]},
    {"ip": "172.16.254.1", "status": "BLOCK", "packets": 99, "ports": [23, 21, 22]},
    {"ip": "10.0.0.12", "status": "BLOCK", "packets": 1, "ports":[34,87,32]}
]

list_res= [log["ip"] for log in network_logs if log["status"] == "BLOCK"]

print(list_res)

set_res ={ port for log in network_logs for port in log["ports"]}

print(set_res)

dict_res = { log["ip"]:log["packets"] for log in network_logs if log["status"] == "BLOCK"}
print(dict_res)


class ThermalOverloadException(Exception):
    def __init__(self,current_temp,message ):
        super().__init__(self.message)
        self.current_temp=current_temp
        self.message=message

    
def adjust_thermostat_settings(target_temperature):

    if target_temperature>45:
        raise ThermalOverloadException(target_temperature)

def run_smart_home(temp):
    try:
        adjust_thermostat_settings(temp)
    
    except ThermalOverloadException as error:
        print("shut down now")
    else:
        print("in else, try done successfully")

    finally:
        print("in finally, try except else workings revisit again ")

run_smart_home(48)




# Parking Lot System

class ParkingLot:
    capacity = 3  # Class attribute

    def __init__(self):
        self.occupied_slots = 0  # Instance attribute

    # Park a vehicle
    def park_vehicle(self):
        if self.occupied_slots < ParkingLot.capacity:
            self.occupied_slots += 1
            print("Vehicle parked successfully")
        else:
            print("Parking lot is full")

    # Remove a vehicle
    def remove_vehicle(self):
        if self.occupied_slots > 0:
            self.occupied_slots -= 1
            print("Vehicle removed successfully")
        else:
            print("Parking lot is empty")

    # Display available slots
    def display_slots(self):
        available = ParkingLot.capacity - self.occupied_slots
        print("Available slots:", available)


lot1 = ParkingLot()

lot1.park_vehicle()
lot1.park_vehicle()
lot1.display_slots()

lot1.remove_vehicle()
lot1.display_slots()

lot1.park_vehicle()
lot1.park_vehicle()
lot1.park_vehicle()
lot1.display_slots()



from abc import ABC, abstractmethod

# Custom exceptions
class InvalidMarkError(Exception):
    pass


class EnrollmentError(Exception):
    pass


# Abstract class
class Notifier(ABC):
    @abstractmethod
    def send(self, message):
        pass


# Duck typing: this class doesn't inherit from Notifier
class ConsoleNotifier:
    def send(self, message):
        print("Notification:", message)


# Course class
class Course:
    def __init__(self, course_id, title, category):
        self.course_id = course_id
        self.title = title
        self.category = category
        self.student_ids = set()


# Student class
class Student:
    total_students = 0  # Class attribute

    def __init__(self, student_id, name):
        self.student_id = student_id
        self.name = name
        self.enrolled_courses = set()
        self.__marks = {}  

        Student.total_students += 1

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value.strip():
            raise ValueError("Name cannot be empty")
        self._name = value

    @property
    def marks(self):
        return self.__marks.copy()

    @property
    def average(self):
        if not self.__marks:
            return 0

        return sum(self.__marks.values()) / len(self.__marks)

    def add_marks(self, course_id, mark):
        if not 0 <= mark <= 100:
            raise InvalidMarkError("Marks must be between 0 and 100")

        if course_id not in self.enrolled_courses:
            raise EnrollmentError("Student is not enrolled in this course")

        self.__marks[course_id] = mark


# Manages student and course operations
class CourseManager:
    def __init__(self):
        self.students = {}  
        self.courses = {}   

    def add_student(self, student):
        self.students[student.student_id] = student

    def add_course(self, course):
        self.courses[course.course_id] = course

    def enroll(self, student_id, course_id):
        if student_id not in self.students:
            raise EnrollmentError("Student not found")

        if course_id not in self.courses:
            raise EnrollmentError("Course not found")

        student = self.students[student_id]
        course = self.courses[course_id]

        if course_id in student.enrolled_courses:
            raise EnrollmentError("Already enrolled")

        student.enrolled_courses.add(course_id)
        course.student_ids.add(student_id)

    def record_marks(self, student_id, course_id, mark):
        if student_id not in self.students:
            raise EnrollmentError("Student not found")

        self.students[student_id].add_marks(course_id, mark)


class ReportGenerator:
    def show_report(self, manager):
        # List comprehension
        high_scorers = [
            student.name
            for student in manager.students.values()
            if student.average >= 80
        ]

        # Dictionary comprehension
        averages = {
            student.name: round(student.average, 2)
            for student in manager.students.values()
        }

        # Set comprehension
        categories = {
            course.category
            for course in manager.courses.values()
        }

        # Tuple: fixed report of course IDs
        course_ids = tuple(manager.courses.keys())

        print("\nStudent averages:", averages)
        print("Students scoring 80 or above:", high_scorers)
        print("Course categories:", categories)
        print("Course IDs:", course_ids)



def notify_user(notifier, message):
    notifier.send(message)


try:
    manager = CourseManager()

    s1 = Student(1, "Laya")
    s2 = Student(2, "Arun")

    manager.add_student(s1)
    manager.add_student(s2)

    c1 = Course("C101", "Python", "Programming")
    c2 = Course("C102", "Machine Learning", "AI")

    manager.add_course(c1)
    manager.add_course(c2)

    manager.enroll(1, "C101")
    manager.enroll(1, "C102")
    manager.enroll(2, "C101")

    manager.record_marks(1, "C101", 90)
    manager.record_marks(1, "C102", 85)
    manager.record_marks(2, "C101", 70)

    report = ReportGenerator()
    report.show_report(manager)

    notifier = ConsoleNotifier()
    notify_user(notifier, "Student report generated")

    print("\nTotal students:", Student.total_students)

except (ValueError, InvalidMarkError, EnrollmentError) as e:
    print("Error:", e)

finally:
    print("Program finished")








