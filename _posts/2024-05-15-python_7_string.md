---
layout: post
title: "1. python字符串"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 字符串处理

字符串是Python中最常用的数据类型之一。理解和掌握字符串处理方法是编写高效Python代码的基础。

### 1. 字符串创建与基本操作

* 字符串可以使用单引号、双引号或三引号创建。

```python
# 创建字符串
str1 = 'Hello'
str2 = "World"
str3 = '''This is
a multiline
string'''

print(str1)  # 输出 Hello
print(str2)  # 输出 World
print(str3)  # 输出 This is\n a multiline\n string
```

### 2. 字符串拼接

* 可以使用加号（`+`）拼接字符串，使用乘号（`*`）重复字符串。

```python
# 字符串拼接
greeting = str1 + ' ' + str2
print(greeting)  # 输出 Hello World

# 字符串重复
repeat_str = str1 * 3
print(repeat_str)  # 输出 HelloHelloHello
```

### 3. 字符串格式化

* Python提供了多种字符串格式化方法，包括百分号格式化、`str.format()`方法和f字符串（格式化字符串字面量）。

```python
name = "Alice"
age = 25

# 百分号格式化
print("Hello, %s. You are %d years old." % (name, age))

# str.format()方法
print("Hello, {}. You are {} years old.".format(name, age))

# f字符串（Python 3.6及以上）
print(f"Hello, {name}. You are {age} years old.")
```

### 4. 字符串索引与切片

* 可以使用索引访问字符串中的单个字符，使用切片获取子字符串。

```python
# 字符串索引
s = "Python"
print(s[0])  # 输出 P
print(s[-1])  # 输出 n

# 字符串切片
print(s[1:4])  # 输出 yth
print(s[:3])  # 输出 Pyt
print(s[3:])  # 输出 hon
```

### 5. 常用字符串方法

* Python提供了许多内置的字符串方法，用于各种字符串操作。

```python
s = "hello, world"

# 大小写转换
print(s.upper())  # 输出 HELLO, WORLD
print(s.lower())  # 输出 hello, world
print(s.capitalize())  # 输出 Hello, world
print(s.title())  # 输出 Hello, World

# 去除空白字符
s2 = "  hello  "
print(s2.strip())  # 输出 hello
print(s2.lstrip())  # 输出 hello  
print(s2.rstrip())  # 输出   hello

# 查找和替换
print(s.find("world"))  # 输出 7
print(s.replace("world", "Python"))  # 输出 hello, Python

# 拆分和连接
words = s.split(", ")
print(words)  # 输出 ['hello', 'world']
print(", ".join(words))  # 输出 hello, world
```

### 6. 字符串的不可变性

* 字符串在Python中是不可变的，一旦创建，就不能修改其内容。任何对字符串的操作都会创建一个新字符串。

```python
s = "hello"
s = s.replace("h", "y")
print(s)  # 输出 yello
```

### 7. 字符串的编码和解码

* 可以使用`encode()`方法将字符串编码为字节，使用`decode()`方法将字节解码为字符串。

```python
# 编码
s = "hello"
b = s.encode("utf-8")
print(b)  # 输出 b'hello'

# 解码
s2 = b.decode("utf-8")
print(s2)  # 输出 hello
```

### 8. 多行字符串和转义字符

* 多行字符串可以使用三引号创建，转义字符用于表示特殊字符。

```python
# 多行字符串
multi_line_str = """This is a
multiline
string"""
print(multi_line_str)

# 转义字符
escaped_str = "He said, \"Hello!\""
print(escaped_str)  # 输出 He said, "Hello!"
```