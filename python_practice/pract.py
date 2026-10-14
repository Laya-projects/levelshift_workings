print("Hi")
# dummy file that i use to check the workings and functionalities of certain functions
class BankAccount:

    bank_name = "Kotak"

    def __init__(self,name,init_balance,PIN):
        self.acc_holder_name=name
        self.__balance=init_balance

        self.__acc_PIN=PIN
        self._acc_status="Active"

    def deposite(self,amount):
        self.__balance += amount

        print(f"Deposited!, Available balance : {self.__balance:.2f}")

    def withdraw(self,amount,user_pin):
        
        if self.__verify_pin(user_pin):
            if self.__balance>amount:
                self.__balance-=amount
                print(f"Amount {amount:.2f}  withdrawed ")
            else:
                print("insufficient Balance")

        else:
            print("Invalid pin! , Access denied")

    def __verify_pin(self,user_pin):
        if user_pin == self.__acc_PIN:
            return True
        
        else:
            return False

    @classmethod
    def change_bank_name(cls,new_bank_name):
        cls.bank_name = new_bank_name
        print(f"Bank Name change to {cls.bank_name}")

laya_acc= BankAccount("Laya",24000,2109)

laya_acc.deposite(10000)
laya_acc.withdraw(15000,2109)
laya_acc.change_bank_name("ICICI")       



immutable_roles = frozenset(["Read", "Write", "Execute"])

# This works perfectly because a frozenset is hashable!
role_permissions = {
    immutable_roles: "Admin_Level_Access"
}
print(f"Dictionary using a frozenset as a key: {role_permissions}")

s="laua os"

l=s.strip().split()

n=len(l)
print(n)

