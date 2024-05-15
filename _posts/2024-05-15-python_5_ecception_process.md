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