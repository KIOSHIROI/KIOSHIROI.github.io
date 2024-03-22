---
layout: post
title: 为什么我们选择最小平方损失？
date:   2024-3-21
tags: [machine learning]
comments: true
author: kioshiroi
---
>  **&quot;Why least square?&quot;**                 --吴恩达

对于训练集$X$，标签集$Y$,"error set"$E$, $x\in X, y\in Y, \epsilon \in E$:

我们猜测(Assume):

$$
y^{(i)}=\theta^Tx^{(i)}+\epsilon^{(i)}
$$

> \* $\epsilon$: Unmeasured effects/random noise/etc.

在我们朴素的认知中，所有其他因素和噪音的合成是遵循高斯分布的：

$$
\epsilon^{(i)}\sim \mathcal N(0,\sigma^2)
$$

那么：

$$
P(\epsilon^{(i)})=\frac{1}{\sqrt{2\pi}\sigma}\exp\Big( -\frac{(\epsilon^{(i)})^2}{2\sigma^2} \Big)
$$

同时，我们朴素地认为训练集个各个特征之间遵循独立同分布(I.I.D.)

> 尽管I.I.D"not a true assumptioin", 但是在机器学习中"无伤大雅"（是很普遍且很有用的假设）

$$
P(y^{(i)}\mid x^{(i)};\theta) = \frac{1}{\sqrt{2\pi}\sigma}\exp\Big( -\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2} \Big)
$$

> 根据Assume移项得到的。
>
>  $P(y^{(i)}\mid x^{(i)};\theta)$：the prob of $y^{(i)}$ given $x^{(i)}$.$\theta$是参数而不是随机变量。

我们可以得到：

$$
(y^{(i)}|x^{(i)};\theta)\sim \mathcal N(\theta^Tx^{(i)},\sigma^2)
$$

$$
\mathcal{L}(\theta) = \qquad P(\vec{y}|x;\theta) \qquad * \\ \ \qquad=\prod^{m}_{i=1} P(y^{(i)}|x^{(i)}; \theta) \ ** \\  \ \ \qquad\qquad \qquad\qquad=\prod^{m}_{i=1}\frac{1}{\sqrt{2\pi}\sigma}\exp\Big( -\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2} \Big)
$$

> $"\mathcal L":$ likelyhood
>
> $*\rightarrow **:$ $I.I.D$

$$
\begin{array}{ll}
\mathcal l(\theta) &= \log \mathcal L(\theta)\\
\\
&=\log\prod\limits^{m}_{i=1}\dfrac{1}{\sqrt{2\pi}\sigma}\exp\Big( -\dfrac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2} \Big)\\
\\
&=\sum\limits^{m}_{i=1}\Big[\log\dfrac{1}{\sqrt{2\pi}\sigma}+\log \exp\Big( -\dfrac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2} \Big)\Big]\\
\\
&=m\log\dfrac{1}{\sqrt{2\pi}\sigma}+\sum\limits^{m}_{i=1}-\dfrac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2} 
\end{array}
$$

我们可以发现最后的结果成为了常数+$f(y^{(i)}-\theta^Tx^{(i)})$

因为我们要MLE(Maximuize likelyhood estimation\),即：

$$
choose\ \theta \ to\quad \text {maximize} \quad\mathcal L(\theta)
$$

所以我们的目标变成了：

$$
choose\ \theta \ to\quad \text {minimize} \quad\sum\limits^{m}_{i=1}\dfrac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}
$$

也就是：

$$
choose\ \theta \ to\quad \text {minimize} \quad\dfrac{1}{2}\sum\limits^{m}_{i=1}{(y^{(i)}-\theta^Tx^{(i)})^2}=\mathcal J(\theta)
$$

> $\mathcal J(\theta):$即损失函数，这里为我们常用的平方损失函数

我们可以发现这就是我们在回归问题中常用的$\mathcal J(\theta)$.

在这一刻，概率与直觉达到了统一。

‍
