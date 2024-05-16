---
layout: post
title: "8. python文件操作"
date:   2024-5-16
tags: [python]
comments: true
author: kioshiroi
---
## 文件处理

在实际编程中，经常需要读取和写入文件。Python 提供了强大的文件处理功能，允许我们轻松地操作文件。

### 打开和关闭文件

* 可以使用 `open` 函数打开文件，使用 `close` 方法关闭文件。

```python
# 打开文件
file = open("example.txt", "r")

# 读取文件内容
content = file.read()
print(content)

# 关闭文件
file.close()
```

### 使用 `with` 语句

* `with` 语句可以自动处理文件的打开和关闭，确保文件在使用完后正确关闭。

```python
# 使用 with 语句打开文件
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
```

### 读取文件

* 可以使用 `read`、`readline` 和 `readlines` 方法读取文件内容。

```python
# 读取整个文件
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# 逐行读取文件
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())

# 读取一行
with open("example.txt", "r") as file:
    line = file.readline()
    print(line)

# 读取所有行并返回列表
with open("example.txt", "r") as file:
    lines = file.readlines()
    print(lines)
```

### 写入文件

* 可以使用 `write` 和 `writelines` 方法写入文件内容。

```python
# 写入文件
with open("example.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.\n")

# 写入多行
lines = ["First line.\n", "Second line.\n", "Third line.\n"]
with open("example.txt", "w") as file:
    file.writelines(lines)
```

### 文件模式

可以使用不同的模式打开文件：

* `'r'`：读取（默认模式）
* `'w'`：写入（会覆盖文件）
* `'a'`：追加（在文件末尾添加内容）
* `'b'`：二进制模式（用于非文本文件）

```python
# 以追加模式打开文件
with open("example.txt", "a") as file:
    file.write("This line is appended.\n")

# 以二进制模式读取文件
with open("example.jpg", "rb") as file:
    content = file.read()
    print(content)
```

### 文件和目录操作

* 使用 `os` 模块可以进行文件和目录操作。

```python
import os

# 检查文件是否存在
print(os.path.exists("example.txt"))

# 获取文件大小
print(os.path.getsize("example.txt"))

# 重命名文件
os.rename("example.txt", "new_example.txt")

# 删除文件
os.remove("new_example.txt")

# 创建目录
os.mkdir("example_dir")

# 删除目录
os.rmdir("example_dir")
```