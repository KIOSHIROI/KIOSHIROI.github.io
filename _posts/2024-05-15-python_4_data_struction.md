---
layout: post
title: "4. python数据结构"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 函数

* 函数是组织代码的重要方式，它们可以让代码更加模块化和易于维护。函数可以执行特定的任务并返回结果。

### 定义函数

* 在Python中，可以使用`def`关键字来定义函数。函数名后跟一对圆括号和一个冒号，函数体缩进。
* ```python
  # 示例代码
  # 无返回值 相当于C语言void函数
  def greet(name):
      print(f"Hello, {name}!") # print("Hello, {}!".format(name))

  # 调用函数
  greet("Alice")

  ```

### 返回值

* 函数可以使用`return`语句返回一个值。
* ```python
  # 示例代码
  def add(a, b):
      return a + b

  # 调用函数并存储返回值
  result = add(3, 5)
  print(result)  # 输出 8

  ```

### 默认参数值

* 可以为函数参数指定默认值，如果调用函数时未提供该参数，则使用默认值。
* ```python
  # 示例代码
  def greet(name="Guest"):
      print(f"Hello, {name}!")

  # 调用函数
  greet()          # 输出 Hello, Guest!
  greet("Alice")   # 输出 Hello, Alice!

  ```

### 可变参数

* 可以使用`*args`和`**kwargs`来定义可变参数的函数，`*args`用于接收任意数量的位置参数，`**kwargs`用于接收任意数量的关键字参数。
* ```python
  # 示例代码
  def print_args(*args):
      for arg in args:
          print(arg)

  print_args(1, 2, 3)

  def print_kwargs(**kwargs):
      for key, value in kwargs.items():
          print(f"{key}: {value}")

  print_kwargs(name="Alice", age=30)

  ```

### 嵌套函数和闭包

* 可以在函数内部定义函数，这种函数称为嵌套函数。闭包是指内部函数引用了外部函数的变量，并且外部函数已经返回。

* ```python
  # 示例代码
  def outer_function(msg):
      def inner_function():
          print(msg)
      return inner_function

  closure = outer_function("Hello")
  closure()  # 输出 Hello

  ```

* 闭包是一个非常有用的编程概念，它可以在许多情况下提升代码的可读性、可维护性和灵活性。以下是闭包的几个主要用途：

#### 1. 数据封装

闭包可以用来封装数据，提供一种实现数据隐藏和保护的方式。这类似于面向对象编程中的私有属性。

```python
def make_counter():
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter

# 创建一个计数器实例
my_counter = make_counter()
print(my_counter())  # 输出 1
print(my_counter())  # 输出 2
```

在这个示例中，`count`变量被封装在`make_counter`函数中，只有内部的`counter`函数可以访问和修改它。

#### 2. 回调函数

闭包常用于回调函数中，尤其是在异步编程和事件驱动编程中。

```python
def create_callback(message):
    def callback():
        print(message)
    return callback

callback_hello = create_callback("Hello, World!")
callback_hello()  # 输出 Hello, World!
```

在这个示例中，`callback`函数作为一个回调函数，能够记住并使用`create_callback`函数的参数`message`。

#### 3. 高阶函数

闭包可以用于创建高阶函数，即返回另一个函数的函数。这在函数式编程中非常常见。

```python
def multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply

times_two = multiplier(2)
times_three = multiplier(3)

print(times_two(5))  # 输出 10
print(times_three(5))  # 输出 15
```

在这个示例中，`multiplier`函数返回一个新的函数`multiply`，该函数将输入的数字乘以一个特定的因子。

#### 4. 延迟求值

闭包可以用于延迟求值，即在需要时才计算结果，而不是在定义时就计算。这在某些性能优化中非常有用。

```python
def make_lazy_add(a, b):
    def lazy_add():
        return a + b
    return lazy_add

lazy_add_function = make_lazy_add(2, 3)
print(lazy_add_function())  # 输出 5
```

在这个示例中，`lazy_add`函数只有在被调用时才计算`a + b`的值。

#### 5. 状态持久化

闭包可以用来持久化某些状态，而不需要使用全局变量。这对于构建状态机或管理复杂的状态非常有用。

```python
def create_accumulator():
    total = 0

    def add(value):
        nonlocal total
        total += value
        return total

    return add

accumulator = create_accumulator()
print(accumulator(10))  # 输出 10
print(accumulator(5))   # 输出 15
```

在这个示例中，`total`变量的状态在多次调用`add`函数之间得以持久化。