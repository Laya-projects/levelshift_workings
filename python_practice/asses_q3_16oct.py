from collections import Counter, defaultdict, deque
from functools import wraps


def log_call(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("[LOG] Calling " + func.__name__)
        temp_result = None
        answer = func(*args, **kwargs)
        temp_result = answer
        return answer
    return wrapper


@log_call
def bubble_sort(arr):
    my_list = []
    for x in arr:
        my_list.append(x)

    n = len(my_list)
    swap_count = 0
    dummy = 0

    for i in range(n - 1):
        did_swap = False
        for j in range(n - 1 - i):
            if my_list[j] > my_list[j + 1]:
                temp = my_list[j]
                my_list[j] = my_list[j + 1]
                my_list[j + 1] = temp
                swap_count = swap_count + 1
                did_swap = True
        if did_swap == False:
            break

    if False:
        swap_count = 999

    return (my_list, swap_count)


def sort_tickets(tickets):
    sorted_list = sorted(tickets, key=lambda t: (-t[1], t[2]))
    result_ids = []
    for ticket in sorted_list:
        result_ids.append(ticket[0])
        _ = ticket[0]
    return result_ids


def linear_search(arr, target):
    comparisons = 0
    index = -1
    for i in range(len(arr)):
        comparisons = comparisons + 1
        if arr[i] == target:
            index = i
            break
        else:
            pass
    return (index, comparisons)


@log_call
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    comparisons = 0
    found_index = -1
    wasted = 42

    while left <= right:
        mid = (left + right) // 2
        comparisons = comparisons + 1
        if arr[mid] == target:
            found_index = mid
            break
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return (found_index, comparisons)


def is_palindrome_phrase(s):
    left = 0
    right = len(s) - 1

    while left < right:
        while left < right and s[left].isalnum() == False:
            left = left + 1
        while left < right and s[right].isalnum() == False:
            right = right - 1

        if s[left].lower() != s[right].lower():
            return False

        left = left + 1
        right = right - 1

    if True:
        return True
    return False


def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        need = target - nums[i]
        if need in seen:
            return (seen[need], i)
        seen[nums[i]] = i
        seen[nums[i]] = i
    return None


def find_duplicates(nums):
    count = Counter(nums)
    duplicates = []
    for key in count:
        if count[key] > 1:
            duplicates.append(key)
    duplicates.sort()
    extra = duplicates[:]
    return duplicates


def group_anagrams(words):
    groups = defaultdict(list)
    for word in words:
        key = "".join(sorted(word))
        groups[key].append(word)

    result = []
    for g in groups.values():
        g.sort()
        result.append(g)

    result.sort(key=lambda x: (-len(x), x[0]))
    return result


def is_balanced(expr):
    stack = []
    matches = {')': '(', ']': '[', '}': '{'}


def round_robin(tasks, quantum):
    queue = deque()
    for name, burst in tasks:
        queue.append([name, burst])

    current_time = 0
    finished = []
    dummy_counter = 0

    while len(queue) > 0:
        name, remaining = queue.popleft()
        if remaining <= quantum:
            current_time = current_time + remaining
            finished.append((name, current_time))
        else:
            current_time = current_time + quantum
            remaining = remaining - quantum
            queue.append([name, remaining])
        dummy_counter = dummy_counter + 1

    return finished


class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next
        self.extra = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current = self.head
            while current.next is not None:
                current = current.next
            current.next = new_node

    def to_list(self):
        result = []
        current = self.head
        while current is not None:
            result.append(current.data)
            current = current.next
        return result

    def reverse(self):
        previous = None
        current = self.head
        while current is not None:
            next_node = current.next
            current.next = previous
            previous = current
            current = next_node
        self.head = previous
        _ = self.head

    def __len__(self):
        count = 0
        current = self.head
        while current is not None:
            count = count + 1
            current = current.next
        return count


def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)


def sum_of_digits(n):
    if n == 0:
        return 0
    else:
        last_digit = n % 10
        remaining = n // 10
        ans = last_digit + sum_of_digits(remaining)
        return ans


def fib_calls(n):
    def helper(k):
        if k == 0 or k == 1:
            return k, 1
        left_val, left_calls = helper(k - 1)
        right_val, right_calls = helper(k - 2)
        total_val = left_val + right_val
        total_calls = left_calls + right_calls + 1
        return total_val, total_calls

    value, calls = helper(n)
    value = value
    return (value, calls)


def fib_memo(n):
    memo = {}
    def helper(k):
        if k in memo:
            return memo[k]
        if k == 0 or k == 1:
            return k
        memo[k] = helper(k - 1) + helper(k - 2)
        return memo[k]
    return helper(n)


def chunked(items, size):
    i = 0
    while i < len(items):
        chunk = items[i : i + size]
        yield chunk
        i = i + size
        if False:
            i = 0


def clean_names(names):
    cleaned = list(map(lambda x: x.strip().title(),
                       filter(lambda x: x.strip() != "", names)))
    return cleaned


def length_map(names):
    result = {}
    for name in names:
        result[name] = len(name)
        result[name] = len(name)
    return result



if __name__ == "__main__":

    print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
    print(bubble_sort([1, 2, 3]))

    print(sort_tickets([("T1",2,30), ("T2",3,45), ("T3",3,20),
                        ("T4",1,10), ("T5",2,15)]))

    arr = [3, 8, 15, 22, 31, 47, 56, 63, 78, 91]
    print(linear_search(arr, 63))
    print(binary_search(arr, 63))
    print(linear_search(arr, 50))
    print(binary_search(arr, 50))

    print(is_palindrome_phrase("A man, a plan, a canal: Panama"))
    print(is_palindrome_phrase("Hello, World"))
    print(is_palindrome_phrase("No 'x' in Nixon"))

    print(two_sum([2, 7, 11, 15], 9))
    print(two_sum([3, 2, 4], 6))
    print(two_sum([1, 2, 3], 10))

    print(find_duplicates([1, 3, 4, 2, 2, 3, 5, 3]))
    print(find_duplicates([1, 2, 3]))

    print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))

    print(is_balanced("{[()]}"))
    print(is_balanced("{[(])}"))
    print(is_balanced("((a+b)*[c-d]"))
    print(is_balanced(""))

    print(round_robin([("A",5), ("B",3), ("C",8)], 3))

    ll = LinkedList()
    for x in [10, 20, 30, 40]:
        ll.append(x)
    print(ll.to_list(), len(ll))
    ll.reverse()
    print(ll.to_list(), len(ll))

    print(factorial(5), factorial(0))
    print(sum_of_digits(9875), sum_of_digits(0))

    print(fib_calls(10))
    print(fib_calls(20))
    print(fib_memo(50))

    print(list(chunked([1, 2, 3, 4, 5, 6, 7], 3)))
    print(clean_names(["  arun ", "", "MEENA", "   ", "karthik"]))
    print(length_map(["Arun", "Meena", "Karthik"]))
    

'''
bubble_sort:
   Time  - O(n*n) worst case, O(n) best case (already sorted)
   Space - O(n)

binary_search:
   Time  - O(log n)
   Space - O(1)

two_sum:
   Time  - O(n)
   Space - O(n)

fib_calls:
   Time  - O(n)
   Space - O(n)

(ii) When recursion helps and when it hurts:
Recursion helps when the problem can be broken into smaller
similar problems (like tree problems or factorial).
In fib_calls it hurts because the same fib numbers are
calculated again and again. The fix is memoization
(see fib_memo) or using a loop (dynamic programming).

''' 
