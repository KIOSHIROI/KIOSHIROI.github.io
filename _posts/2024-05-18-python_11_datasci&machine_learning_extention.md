---
layout: post
title: "11. 拓展：python数据科学与机器学习库"
date:   2024-5-18
tags: [python]
comments: true
author: kioshiroi
---
## 拓展：数据科学与机器学习库

### 1. NumPy

NumPy 是一个用于科学计算的库，支持多维数组和矩阵运算，提供了大量的数学函数。

```python
import numpy as np

# 创建数组
array = np.array([1, 2, 3, 4, 5])
print(array)

# 数组运算
print(array + 10)
print(array * 2)
```

### 2. pandas

pandas 是一个数据分析和处理库，提供了高性能的数据结构和数据分析工具。

```python
import pandas as pd

# 创建数据框
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)
print(df)

# 数据框操作
print(df['Name'])
print(df.describe())
```

### 3. matplotlib

matplotlib 是一个绘图库，用于创建静态、动态和交互式的图表。

```python
import matplotlib.pyplot as plt

# 创建数据
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# 绘制折线图
plt.plot(x, y)
plt.xlabel('x轴')
plt.ylabel('y轴')
plt.title('折线图示例')
plt.show()
```

### 4. scikit-learn

scikit-learn 是一个用于机器学习的库，提供了简单高效的数据挖掘和数据分析工具。

```python
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 加载数据集
iris = datasets.load_iris()
X = iris.data
y = iris.target

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 创建并训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测并评估模型
y_pred = model.predict(X_test)
print(f"准确率: {accuracy_score(y_test, y_pred)}")
```

接下来会逐个整理各部分内容。