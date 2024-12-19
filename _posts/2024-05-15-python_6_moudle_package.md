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

> **注意**
> (不推荐)我们也可以使用`from whichmodule import`来导入模块中的所有内容，但是这样导入存在风险。倘若该模块中定义的对象与其他模块或python标准包存在**冲突**，可能导致不可预估的错误！


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

### wheel
尽管我们可以通过pip安装第三方包，但有些包并不在pypi上，这时候就需要使用wheel文件来安装。

wheel文件是python的二进制包格式，通常用于分发和安装Python包。与源代码包不同，wheel包已经编译为二进制形式，可以直接在目标系统上安装，而无需编译源代码。

wheel文件通常以.whl为扩展名，例如requests-2.28.2-py3-none-any.whl。

使用wheel安装第三方包的方法如下:
1. 从镜像平台其他途径获取wheel包
2. 使用pip在自己环境中安装wheel包
```bash
pip install requests-2.28.2-py3-none-any.whl
```

### 镜像
由于某些神秘力量，国内访问pypi的速度很慢，这时候就需要使用镜像来加速下载。
常用的镜像源有：
- 清华：https://pypi.tuna.tsinghua.edu.cn/simple
- 阿里云：http://mirrors.aliyun.com/pypi/simple/
- ustc: https://pypi.mirrors.ustc.edu.cn/simple/
- hust：http://pypi.hustunique.com/
- sdut：http://pypi.sdutlinux.org/
- 豆瓣：http://pypi.douban.com/simple/

*如何配置镜像源？*
#### 1. 永久配置镜像源
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
pip config set install.trusted-host pypi.tuna.tsinghua.edu.cn
```

#### 2. 临时使用镜像源
使用`-i`
```bash
pip install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple 
```

### 参考资料
- [https://www.cnblogs.com/chenjo/p/14071864.html](https://www.cnblogs.com/chenjo/p/14071864.html)
- [https://blog.csdn.net/qq_53141117/article/details/132744428](https://blog.csdn.net/qq_53141117/article/details/132744428)