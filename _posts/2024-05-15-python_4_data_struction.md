---
layout: post
title: "4. python数据结构"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 数据结构

* Python 提供了多种内置的数据结构，用于存储和组织数据。我们将详细介绍以下几种常见的数据结构：列表、元组、字典和集合。

### 列表

* 列表是一种有序的可变序列，可以存储任意类型的元素。

```python
# 创建列表
fruits = ["apple", "banana", "cherry"]

# 访问元素
print(fruits[0])  # 输出 "apple"

# 修改元素
fruits[1] = "blueberry"

# 添加元素
fruits.append("date")

# 删除元素
fruits.remove("apple")

# 遍历列表
for fruit in fruits:
    print(fruit)

```

### 元组

* 元组是一种有序的**不可变序列**，一旦创建就不能修改。
* ```python
  # 创建元组
  coordinates = (10.0, 20.0)

  # 访问元素
  print(coordinates[0])  # 输出 10.0

  # 遍历元组
  for coordinate in coordinates:
      print(coordinate)

  ```


* 元组通常用于存储不需要修改的数据，例如地理坐标或数据库记录。

### 字典

* 字典是一种无序的可变映射，使用键-值对来存储数据。
* ```python
  # 创建字典
  student = {"name": "Alice", "age": 25, "major": "Computer Science"}

  # 访问值
  print(student["name"])  # 输出 "Alice"

  # 修改值
  student["age"] = 26

  # 添加键-值对
  student["grade"] = "A"

  # 删除键-值对
  del student["major"]

  # 遍历字典
  for key, value in student.items():
      print(f"{key}: {value}")

  ```

### 集合

* 集合是一种无序的可变集合，不允许重复元素。
* ```python
  # 创建集合
  numbers = {1, 2, 3, 4}

  # 添加元素
  numbers.add(5)

  # 删除元素
  numbers.remove(3)

  # 集合运算
  odds = {1, 3, 5, 7}
  evens = {2, 4, 6, 8}
  union = odds | evens      # 并集
  intersection = odds & evens  # 交集

  # 遍历集合
  for number in numbers:
      print(number)

  ```


> * 集合的声明类似C语言数组的声明，请不要混淆
> * Python中数组的声明需要`import array`包，使用较少，通常在数值运算中使用类似的np.array
> * c语言中没有集合的概念，c++中使用set和unordered_set来表示集合，c++11中引入了unordered_map和unordered_set，可以用来表示集合。c++中的集合运算。