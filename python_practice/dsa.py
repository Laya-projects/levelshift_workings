# DSA practice - Python

# Strings - reverse using two pointers
# Time: O(n), Space: O(n)
def reverse_string(s: str) -> str:
    chars = list(s)
    left, right = 0, len(chars) - 1

    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1

    return "".join(chars)


# Strings - check if two strings are anagrams
# Time: O(n), Space: O(n)
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1

    return True

# Compare frequencies

a = [1, 2, 2, 3]
b = [2, 3, 1, 2]

freq = {}

for num in a:
    freq[num] = freq.get(num, 0) + 1

for num in b:
    if num not in freq or freq[num] == 0:
        print(False)
        break
    freq[num] -= 1
else:
    print(all(count == 0 for count in freq.values()))

# Time: O(n + m) | Space: O(n)

# Find missing numbers

nums = [1, 2, 5, 7]
n = 7

present = set(nums)
missing = []

for num in range(1, n + 1):
    if num not in present:
        missing.append(num)

print(missing)

# Time: O(n + len(nums))
# Space: O(n)



# Strings - palindrome check, ignoring punctuation and case
# Time: O(n), Space: O(1)
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True


# Searching - binary search (list must be sorted)
# Time: O(log n), Space: O(1)
def binary_search(num_l: list, target: int) -> int:
    left, right = 0, len(num_l) - 1

    while left <= right:
        mid = (left + right) // 2

        if num_l[mid] == target:
            return mid
        elif num_l[mid] > target:
            right = mid - 1
        else:
            left = mid + 1

    return -1


# Sorting - bubble sort
# Time: O(n^2), Space: O(1)
def bubble_sort(nums: list) -> list:
    n = len(nums)
    for i in range(n):
        for j in range(n - i - 1):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums


# Sorting - insertion sort
# Time: Best O(n), Worst O(n^2), Space: O(1)
def insertion_sort(nums: list) -> list:
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1

        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1

        nums[j + 1] = key

    return nums


# Sorting - selection sort
# Time: O(n^2), Space: O(1)
def selection_sort(nums: list) -> list:
    n = len(nums)

    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if nums[j] < nums[min_index]:
                min_index = j

        nums[i], nums[min_index] = nums[min_index], nums[i]

    return nums


# Hashing - Two Sum
# Time: O(n) average, Space: O(n)
def two_sum(nums: list, target: int) -> list:
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []


# Hashing - group anagrams
# Time: O(m * k log k), Space: O(m * k)
def grouping_anagrams(words: list) -> list:
    groups = {}

    for word in words:
        key = "".join(sorted(word))
        if key not in groups:
            groups[key] = []
        groups[key].append(word)

    return list(groups.values())


# Hashing - find duplicate values
# Time: O(n) average, Space: O(n)
def find_duplicates(nums: list) -> list:
    seen = set()
    duplicates = set()

    for num in nums:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)

    return list(duplicates)


# Stack - check matching brackets
# Time: O(n), Space: O(n)
def valid_parentheses(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False

    return len(stack) == 0


# Queue - FIFO example
# Append and popleft are O(1); Space: O(n)
from collections import deque

queue = deque()
queue.append(10)
queue.append(20)
queue.append(30)
# queue.popleft()


# Linked list - node structure
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


# Linked list - insert after a known node
# Time: O(1), Space: O(1)
def insert_after(node: Node, data) -> Node:
    new_node = Node(data)
    new_node.next = node.next
    node.next = new_node
    return new_node


# Linked list - reverse the list
# Time: O(n), Space: O(1)
def reverse_list(head):
    prev = None
    current = head

    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt

    return prev


# Linked list - find the middle node
# Time: O(n), Space: O(1)
def middle_node(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow


# Recursion - countdown
# Time: O(n), Call stack: O(n)
def count_down(n: int):
    if n <= 0:
        return

    print(n)
    count_down(n - 1)


# Recursion - factorial
# Time: O(n), Call stack: O(n)
def fact(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * fact(n - 1)


# Recursion - print numbers from 1 to n
# Time: O(n), Call stack: O(n)
def print_numbers(n: int):
    if n <= 0:
        return

    print_numbers(n - 1)
    print(n)


# Recursion - sum from 1 to n
# Time: O(n), Call stack: O(n)
def total(n: int) -> int:
    if n <= 0:
        return 0
    return n + total(n - 1)


# Recursion - power for non-negative exponent
# Time: O(n), Call stack: O(n)
def power(a: int, n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return a * power(a, n - 1)


# Recursion - reverse a string
# Time: O(n^2) due to slicing/concatenation, Call stack: O(n)
def reverse_string_recursive(s: str) -> str:
    if len(s) <= 1:
        return s
    return s[-1] + reverse_string_recursive(s[:-1])


# Recursion - Fibonacci number (simple recursive version)
# Time: O(2^n) upper bound, Call stack: O(n)
def fibonacci(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


# Recursion - sum of digits
# Time: O(d), Call stack: O(d), d = number of digits
def sum_of_digits(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 0
    return n % 10 + sum_of_digits(n // 10)



# print(reverse_string("python"))
# print(is_anagram("listen", "silent"))
# print(is_palindrome("A man, a plan, a canal: Panama"))
# print(binary_search([1, 3, 5, 7, 9], 7))
# print(two_sum([2, 7, 11, 15], 9))
# print(valid_parentheses("{[()]}"))
# print(grouping_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# print(sum_of_digits(89728482))


class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)

        if self.head is None:
            self.head = new_node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = new_node
        new_node.prev = current

    
    def display_forward(self):
        current = self.head

        while current:
            print(current.data, end=" <-> ")
            current = current.next

        print("None")


    def display_backward(self):
        current = self.head

        if current is None:
            print("List is empty")
            return

        while current.next:
            current = current.next

        while current:
            print(current.data, end=" <-> ")
            current = current.prev

        print("None")

    
    def delete(self, value):
        current = self.head

        while current and current.data != value:
            current = current.next

        if current is None:
            print("Value not found")
            return

        if current.prev:
            current.prev.next = current.next
        else:
            self.head = current.next

        if current.next:
            current.next.prev = current.prev

dll = DoublyLinkedList()

dll.insert(10)
dll.insert(20)
dll.insert(30)

dll.display_forward()
dll.display_backward()

dll.delete(20)

dll.display_forward()

















