---
layout: post
title: "6. python模块与包"
date:   2024-5-15
tags: [python]
comments: true
author: kioshiroi
---
## 模块和包

在编写较大程序时，将代码组织成模块和包有助于提高代码的可维护性和重用性。Python 提供了强大的模块和包机制。我们将详细介绍以下内容：

### 模块

模块是一个包含 Python 代码的文件，可以包含变量、函数和类。通过 `import` 语句可以在其他代码中使用模块。

**创建和使用模块：**

假设有一个名为 `mymodule.py` 的文件，内容如下：

```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"
```

可以在另一个 Python 文件中导入并使用这个模块：

```python
# main.py
import mymodule

print(mymodule.greet("Alice"))  # 输出 "Hello, Alice!"
```

也可以使用 `from ... import ...` 语句导入模块中的特定部分：

```python
# main.py
from mymodule import greet

print(greet("Bob"))  # 输出 "Hello, Bob!"
```

### 包

包是一个包含多个模块的目录，其中包含一个特殊的 `__init__.py` 文件，该文件可以是空的，也可以包含包的初始化代码。

**创建和使用包：**

假设有一个名为 `mypackage` 的目录，结构如下：

```
mypackage/
    __init__.py
    module1.py
    module2.py
```

`module1.py` 的内容如下：

```python
# module1.py
def add(a, b):
    return a + b
```

`module2.py` 的内容如下：

```python
# module2.py
def subtract(a, b):
    return a - b
```

可以在另一个 Python 文件中导入并使用这个包：

```python
# main.py
from mypackage import module1, module2

print(module1.add(5, 3))        # 输出 8
print(module2.subtract(5, 3))   # 输出 2
```

### 使用标准库

Python 附带了一个丰富的标准库，提供了大量有用的模块，可以直接导入和使用。例如，使用 `math` 模块进行数学运算：

```python
import math

print(math.sqrt(16))  # 输出 4.0
```

### 安装第三方包

可以使用 `pip` 安装第三方包。例如，安装和使用 `requests` 包来发送 HTTP 请求：

```bash
pip install requests
```

安装后，可以在代码中导入并使用 `requests` 包：

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)  # 输出 200
```

模块和包使得代码更加模块化和可重用，有助于组织和管理大型项目。
