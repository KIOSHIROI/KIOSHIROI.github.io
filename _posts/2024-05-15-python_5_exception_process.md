---
layout: post
title: "5. python错误处理"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 异常处理

* 在编写代码时，可能会遇到各种错误和异常。为了确保程序能够优雅地处理这些错误，Python 提供了异常处理机制。我们将详细介绍如何使用 `try`、`except`、`else` 和 `finally` 块来处理异常。

### 基本的异常处理

* 使用 `try` 和 `except` 块可以捕获和处理异常。

```python
# 示例代码
try:
    x = int(input("请输入一个数字: "))
    y = 10 / x
    print(f"10 除以 {x} 的结果是 {y}")
except ZeroDivisionError:
    print("除零错误！不能用零作为除数。")
except ValueError:
    print("输入错误！请输入一个有效的数字。")
```

* 在这个示例中，`try` 块包含可能引发异常的代码。如果发生 `ZeroDivisionError` 或 `ValueError`，相应的 `except` 块将捕获并处理异常。

### `else` 和 `finally` 块

* `else` 块在没有发生异常时执行，`finally` 块无论是否发生异常都会执行。

```python
# 示例代码
try:
    x = int(input("请输入一个数字: "))
    y = 10 / x
except ZeroDivisionError:
    print("除零错误！不能用零作为除数。")
except ValueError:
    print("输入错误！请输入一个有效的数字。")
else:
    print(f"10 除以 {x} 的结果是 {y}")
finally:
    print("执行结束。")
```

* 在这个示例中，如果没有发生异常，`else` 块中的代码将执行。不论是否发生异常，`finally` 块中的代码都会执行。

### 自定义异常

* 可以定义自己的异常类，以便更好地描述特定错误。

```python
# 自定义异常类
class NegativeNumberError(Exception):
    pass

def check_positive(number):
    if number < 0:
        raise NegativeNumberError("数字不能为负数！")

# 使用自定义异常
try:
    num = int(input("请输入一个正数: "))
    check_positive(num)
except NegativeNumberError as e:
    print(e)
```

* 在这个示例中，定义了一个自定义异常 `NegativeNumberError`，并在 `check_positive` 函数中使用。

### 捕获所有异常

* 可以使用通用的 `except` 块来捕获所有异常。

```python
# 示例代码
try:
    x = int(input("请输入一个数字: "))
    y = 10 / x
except Exception as e:
    print(f"发生异常: {e}")
```

* 在这个示例中，`except Exception` 捕获所有类型的异常，并输出异常信息。

通过异常处理机制，我们可以确保程序在遇到错误时能够优雅地处理，而不会导致崩溃。掌握异常处理是编写健壮和可靠代码的重要技能。

## 抛出异常
### assert

* assert语句用于断言，如果断言失败，程序会抛出AssertionError异常。

```python
# 示例代码
def divide_numbers(a, b):
    assert b != 0, "除数不能为零"
    return a / b

# 使用示例
try:
    result = divide_numbers(10, 0)
except AssertionError as e:
    print(f"断言错误：{e}")
```

### raise

* 使用raise语句可以主动抛出异常

```python
# 基本用法
def check_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    if age > 150:
        raise ValueError("年龄不能超过150岁")
    return True

# 重新抛出异常
def process_age():
    try:
        age = int(input("请输入年龄："))
        check_age(age)
    except ValueError as e:
        print("处理异常...")
        raise  # 重新抛出当前异常
```

### 异常链

* 使用`raise from`可以在抛出新异常时保留原始异常信息

```python
def convert_to_int(text):
    try:
        return int(text)
    except ValueError as e:
        raise ValueError("输入必须是数字") from e

# 使用示例
try:
    number = convert_to_int("abc")
except ValueError as e:
    print(f"错误：{e}")
    print(f"原始错误：{e.__cause__}")
```

这些抛出异常的方法让我们能够：
- 使用assert进行调试和验证
- 使用raise主动抛出异常
- 通过异常链追踪异常的来源和传播过程
