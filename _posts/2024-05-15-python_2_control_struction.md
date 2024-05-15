---
layout: post
title: "2. python控制结构"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 控制结构

### 条件语句

* if、else、elif
* ```python
  # 示例代码
  x = 10
  if x > 5:
      print("x 大于 5")
  elif x == 5:
      print("x 等于 5")
  else:
      print("x 小于 5")

  ```

### 循环语句

1. for

* `for`循环用于遍历序列（如列表、元组、字符串等）
* ```python
  # 示例代码1
  fruits = ["apple", "banana", "cherry"]
  for fruit in fruits:
      print(fruit)

  # 示例代码1
  for num in range(3):
  	print(num) 
  # 0
  # 1
  # 2
  ```

2. while

* `while`循环在条件为真时反复执行代码块。
* ```python
  # 示例代码
  count = 0
  while count < 5:
      print(count)
      count += 1

  ```

### 控制流

1. break

* `break`语句用于提前退出循环。
* ```python
  # 示例代码
  for i in range(10):
      if i == 5:
          break
      print(i)

  # 1
  # 2
  # 3
  # 4
  ```

2. continue

* `continue`语句用于跳过当前迭代并继续下一次迭代。
* ```python
  # 示例代码
  for i in range(10):
      if i % 2 == 0:
          continue
      print(i)
  # 1
  # 3
  # 5
  # 7
  # 9
  ```