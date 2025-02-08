# 动手学深度学习
以下代码均来自`《动手学深度学习》`,仅是个人学习笔记
## 线性回归
### 从零开始实现
```python
import random
import torch
from d2l import torch as d2l

# 生成数据集
def synthetic_data(w, b, num_examples):
    """ 生成 y = Xw + b + 噪声 """
    X = torch.normal(0, 1, (num_examples, len(w)))
    y = torch.matmul(X, w) + b
    y += torch.normal(0, 0.01, y.shape)

    return X, y.reshape((-1, 1))

true_w = torch.tensor([2, -3.4])
true_b = 4.2
features, labels = synthetic_data(true_w, true_b, 1000)
# 注意，features中的每一行都包含一个二维数据样本， labels中的每一行都包含一维标签值（一个标量）。
# print('features:', features[0], 'nlabels:', labels[0])

d2l.set_figsize()
d2l.plt.scatter(features[:, (1)].detach().numpy(), labels.detach().numpy(),1)
# 展示 scatter 图表
# d2l.plt.show()

# 读取数据集
def data_iter(batch_size, features, labels):
    num_examples = len(features)
    indices = list(range(num_examples))
    random.shuffle(indices)

    for i in range(0, num_examples, batch_size):
        batch_indices = torch.tensor(
            indices[i: min(i + batch_size, num_examples)]
        )
        yield features[batch_indices], labels[batch_indices]

batch_size = 10
# for X, y in data_iter(batch_size, features, labels):
#     print(X, '\n', y)
#     break

# 初始化模型参数
w = torch.normal(0, 0.01, size=(2, 1), requires_grad=True) # 2行1列
b = torch.zeros(1, requires_grad=True) # 1行1列

# 定义模型
def linreg(X, w, b):
    """ 线性回归模型 """
    return torch.matmul(X, w) + b

# 定义损失函数
def squared_loss(y_hat, y): # y_hat是预测值，y是真实值
    """均方损失函数"""
    return (y_hat - y.reshape(y_hat.shape)) ** 2 / 2

# 定义优化算法
def sgd(params, lr, batch_size): # params是模型参数，lr是学习率，batch_size是批量大小
    """小批量随机梯度下降"""
    with torch.no_grad():
        for param in params:
            param -= lr * param.grad / batch_size
            param.grad.zero_()


"""
训练
1. 初始化参数
2. 重复以下训练，直到完成
    2.1 计算梯度
    2.2 更新参数
"""
lr = 0.03
num_epochs = 3
net = linreg
loss = squared_loss

for epoch in range(num_epochs):  # 训练模型一共需要num_epochs个迭代周期
    # 在每一个迭代周期中，会遍历数据集多轮
    for X, y in data_iter(batch_size, features, labels):
        l = loss(net(X, w, b), y)  # X和y的形状必须相同
        # 因为l形状是(batcch_size, 1), 而不是一个标量。l中的所有元素被加到一起
        l.sum().backward()  # 反向传播，计算关于w和b的梯度
        sgd([w, b], lr, batch_size)  # 使用小批量随机梯度下降迭代模型参数
    with torch.no_grad():
        train_l = loss(net(features, w, b), labels)
        print(f'epoch {epoch + 1}, loss {float(train_l.mean()):f}')

print(f'w的估计值: {w.data.numpy().flatten()}')
print(f'w的估计误差：{true_w - w.reshape(true_w.shape)}')
print(f'b的估计值: {b.data.numpy().flatten()}')
print(f'b的估计误差：{true_b - b}')
```
### 线性回归的简洁实现
```python
'''
    线性回归的简洁实现
'''
import numpy as np
import torch
from torch.utils import data
from d2l import torch as d2l
from torch import nn # nn是神经网络模块

# 1. 生成数据集
true_w = torch.tensor([2, -3.4])
true_b = 4.2
features, labels = d2l.synthetic_data(true_w, true_b, 1000)

# 2. 读取数据集
def load_array(data_arrays, batch_size, is_train=True):
    """构造一个 pytorch 数据迭代器"""
    dataset = data.TensorDataset(*data_arrays) # 将数据集封装成 TensorDataset
    return data.DataLoader(dataset, batch_size, shuffle=is_train) # 将数据集封装成 DataLoader

batch_size = 10
data_iter = load_array((features, labels), batch_size)
# print(next(iter(data_iter)))

# 3. 定义模型
net = nn.Sequential(nn.Linear(2, 1)) # 线性回归模型

# 4. 初始化模型参数
net[0].weight.data.normal_(0, 0.01)
net[0].bias.data.fill_(0)
# print(net[0].weight.data, net[0].bias.data)

# 5. 定义损失函数
loss = nn.MSELoss() # 均方误差损失函数, 默认返回所有样本损失平均值

# 6. 定义优化算法
trainer = torch.optim.SGD(net.parameters(), lr=0.03) # 小批量随机梯度下降

# 7. 训练模型
num_epochs = 3
for epoch in range(num_epochs):
    for X, y in data_iter:
        l = loss(net(X), y) # X和y的形状必须与模型参数的形状相匹配
        trainer.zero_grad() # 梯度清零
        l.backward() # 反向传播
        trainer.step() # 更新参数
    l = loss(net(features), labels) # 计算在所有样本上的损失
    print(f'epoch {epoch + 1}, loss {l:f}')

w = net[0].weight.data
print(f'w的估计误差: {true_w - w.reshape(true_w.shape)}')
b = net[0].bias.data
print(f'b的估计误差: {true_b - b}')
```

## 图像分类
```python
import torch
import torchvision
from torch.utils import data
from torchvision import transforms
from d2l import torch as d2l

d2l.use_svg_display() # 使用矢量图显示

# 读取数据集
trans = transforms.ToTensor()
mnist_train = torchvision.datasets.FashionMNIST(train=True, root='./data', transform=trans, download=True)
mnist_test = torchvision.datasets.FashionMNIST(train=False, root='./data', transform=trans, download=True)
# print(len(mnist_train), len(mnist_test))

print(mnist_train[0][0].shape) # (1, 28, 28)

def get_fashion_mnist_labels(labels):
    """ 返回Fashion-MNIST数据集的文本标签 """
    text_labels = ['t-shirt', 'trouser', 'pullover', 'dress', 'coat', 'sandal', 'shirt', 'sneaker', 'bag', 'ankle boot']

    return [text_labels[int(i)] for i in labels]

def show_images(imgs, num_rows, num_cols, titles=None, scale=1.5):
    """ 绘制图像列表 """
    figsize = (num_cols * scale, num_rows * scale) # 设置图片大小
    _, axes = d2l.plt.subplots(num_rows, num_cols, figsize=figsize) # 创建子图
    axes = axes.flatten() # 将子图展平为一维数组
    for i, (ax, img) in enumerate(zip(axes, imgs)): # 遍历子图和图像
        if torch.is_tensor(img): # 如果图像是张量
            # 将张量转换为NumPy数组
            ax.imshow(img.numpy())


        else: # 如果图像是NumPy数组
            ax.imshow(img) # 显示图像
        ax.axes.get_xaxis().set_visible(False) # 隐藏x轴
        ax.axes.get_yaxis().set_visible(False) # 隐藏y轴
        if titles:
            ax.set_title(titles[i]) # 设置标题

    return axes

X, y = next(iter(data.DataLoader(mnist_train, batch_size=18)))
show_images(X.reshape(18, 28, 28), 2, 9, titles=get_fashion_mnist_labels(y))
# d2l.plt.show()

# 读取小批量
batch_size = 256

def get_dataloader_workers():
    return 4

train_iter = data.DataLoader(
    mnist_train, batch_size, shuffle=True,
    num_workers=get_dataloader_workers()
)

timer = d2l.Timer()
for X, y in train_iter: # 迭代数据集
    continue
print(f'{timer.stop():.2f} sec')

# 整合所有组件
def load_data_fashion_mnist(batch_size, resize=None):
    """ 下载Fashion-MNIST数据集，然后将其加载到内存中 """
    trans = [transforms.ToTensor()]
    if resize:
        trans.insert(0, transforms.Resize(resize))
    trans = transforms.Compose(trans)
    mnist_train = torchvision.datasets.FashionMNIST(
        root="./data", train=True, transform=trans, download=True
    )
    mnist_test = torchvision.datasets.FashionMNIST(
        root="./data", train=False, transform=trans, download=True
    )

    return (data.DataLoader(mnist_train, batch_size, shuffle=True,
                            num_workers=get_dataloader_workers()),
            data.DataLoader(mnist_test, batch_size, shuffle=False,
                            num_workers=get_dataloader_workers())
           )

train_iter, test_iter = load_data_fashion_mnist(batch_size=32, resize=64)
for X, y in test_iter:
    print(X.shape, X.dtype, y.shape, y.dtype)
    break
```
## softmax回归从零开始实现
```python
"""
softmax回归的从零开始实现
"""
import torch
from IPython import display
from d2l import torch as d2l

batch_size = 256
train_iter, test_iter = d2l.load_data_fashion_mnist(batch_size)

# 1. 初始化模型参数
num_inputs = 784
num_outputs = 10
W = torch.normal(0, 0.01, size=(num_inputs, num_outputs), requires_grad=True)
b = torch.zeros(num_outputs, requires_grad=True)

# 2. 定义 softmax 操作
X = torch.tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
# print(X.sum(0, keepdim=True), X.sum(1, keepdim=True))

def softmax(X):
    X_exp = torch.exp(X) # 对每个元素求指数
    partition = X_exp.sum(1, keepdim=True) # 按行求和
    return X_exp / partition # 对每个元素求商

X = torch.normal(0, 1, (2, 5)) # 均值为0，标准差为1的正态分布
X_prob = softmax(X)
# print(X_prob, X_prob.sum(1))

# 3. 定义模型
def net(X):
    return softmax(torch.matmul(X.reshape((-1, W.shape[0])), W) + b)

# 4. 定义损失函数
y = torch.tensor([0, 2])
y_hat = torch.tensor([[0.1, 0.3, 0.6], [0.3, 0.2, 0.5]])
# print(y_hat[[0, 1], y])

def cross_entropy(y_hat, y):
    return -torch.log(y_hat[range(len(y_hat)), y])
# print(cross_entropy(y_hat, y))

# 5. 分类精度
def accuracy(y_hat, y):
    """ 计算预测正确的数量 """
    if len(y_hat.shape) > 1 and y_hat.shape[1] > 1: # 如果y_hat有多个输出，只计算第一个
        y_hat = y_hat.argmax(axis=1) # 返回y_hat中最大值的索引
    cmp = y_hat.type(y.dtype) == y # 比较y_hat和y是否相等
    return float(cmp.type(y.dtype).sum()) # 返回预测正确的数量
# print(accuracy(y_hat, y) / len(y))

def evaluate_accuracy(net, data_iter):
    """ 计算在指定数据集上模型的精度 """
    if isinstance(net, torch.nn.Module): # 如果net是torch.nn.Module的实例
        net.eval() # 将模型设置为评估模式
    metric = Accumulator(2) # 用于统计预测正确的数量和总数量
    with torch.no_grad(): # 关闭梯度计算
        for X, y in data_iter:
            metric.add(accuracy(net(X), y), y.numel())
    return metric[0] / metric[1] # 返回预测正确的数量占总数量的比例

class Accumulator:
    """ 在多个变量上累加 """
    def __init__(self, n):
        self.data = [0.0] * n

    def add(self, *args):
        self.data = [a + float(b) for a, b in zip(self.data, args)]

    def reset(self):
        self.data = [0.0] * len(self.data)

    def __getitem__(self, idx):
        return self.data[idx]

# if __name__ == '__main__':
#     print(evaluate_accuracy(net, test_iter))

# 训练
def train_epoch_ch3(net, train_iter, loss, updater):
    """训练模型一个迭代周期"""
    # 将模型设置为训练模式
    if isinstance(net, torch.nn.Module):
        net.train()

    # 训练损失总和、训练准确度总和、样本数
    metric = Accumulator(3)
    for X, y in train_iter:
        # 计算梯度并更新参数
        y_hat = net(X) # 前向传播
        l = loss(y_hat, y) # 计算损失
        if isinstance(updater, torch.optim.Optimizer): # 如果updater是优化器
            updater.zero_grad() # 梯度清零
            l.mean().backward() # 反向传播
            updater.step() # 更新参数
        else:
            # 使用自定义优化器
            l.sum().backward()
            updater(X.shape[0])
        metric.add(float(l.sum()), accuracy(y_hat, y), y.numel())
    return metric[0] / metric[2], metric[1] / metric[2] # 返回训练损失和训练准确度

class Animator:
    """在动画中绘制数据"""
    def __init__(self, xlabel=None, ylabel=None, legend=None, xlim=None,
                 ylim=None, xscale='linear', yscale='linear',
                 fmts=('-', 'm--', 'g-.', 'r:'), nrows=1, ncols=1,
                 figsize=(3.5, 2.5)
    ):
        # 增量地绘制多条线
        if legend is None:
            legend = []
        d2l.use_svg_display()
        self.fig, self.axes = d2l.plt.subplots(nrows, ncols, figsize=figsize)

        if nrows * ncols == 1:
            self.axes = [self.axes, ]
        # 使用lambda函数捕获参数
        self.config_axes = lambda: d2l.set_axes(
            self.axes[0], xlabel, ylabel, xlim, ylim, xscale, yscale, legend)
        self.X, self.Y, self.fmts = None, None, fmts

    def add(self, x, y):
        # 向图表中添加多个数据点
        if not hasattr(y, "__len__"):
            y = [y]
        n = len(y)
        if not hasattr(x, "__len__"):
            x = [x] * n
        if not self.X:
            self.X = [[] for _ in range(n)]
        if not self.Y:
            self.Y = [[] for _ in range(n)]
        for i, (a, b) in enumerate(zip(x, y)):
            if a is not None and b is not None:
                self.X[i].append(a)
                self.Y[i].append(b)
        self.axes[0].cla()
        for x, y, fmt in zip(self.X, self.Y, self.fmts):
            self.axes[0].plot(x, y, fmt)
        self.config_axes()
        display.display(self.fig)
        display.clear_output(wait=True)

def train_ch3(net, train_iter, test_iter, loss, num_epochs, updater):
    """训练模型"""
    animator = Animator(xlabel='epoch', xlim=[1, num_epochs], ylim=[0.3, 0.9],
                        legend=['train loss', 'train acc', 'test acc'])
    for epoch in range(num_epochs):
        train_metrics = train_epoch_ch3(net, train_iter, loss, updater)
        test_acc = evaluate_accuracy(net, test_iter)
        animator.add(epoch + 1, train_metrics + (test_acc,))
    train_loss, train_acc = train_metrics
    assert train_loss < 0.5, train_loss
    assert train_acc <= 1 and train_acc > 0.7, train_acc
    assert test_acc <= 1 and test_acc > 0.7, test_acc

lr = 0.1
def updater(batch_size):
    return d2l.sgd([W, b], lr, batch_size)

num_epochs = 10
train_ch3(net, train_iter, test_iter, cross_entropy, num_epochs, updater)

# 预测
def predict_ch3(net, test_iter, n=6):
    """ 预测标签 """
    for X, y in test_iter:
        break
    trues = d2l.get_fashion_mnist_labels(y)
    preds = d2l.get_fashion_mnist_labels(net(X).argmax(axis=1))
    titles = [true + '\n' + pred for true, pred in zip(trues, preds)]

    d2l.show_images(X[0:n].reshape((n, 28, 28)), 1, n, titles=titles[0:n])

if __name__ == '__main__':
    predict_ch3(net, test_iter)
    d2l.plt.show()
```
## softmax 回归的简洁实现
```python

import torch
from torch import nn
from d2l import torch as d2l

batch_size = 256
train_iter, test_iter = d2l.load_data_fashion_mnist(batch_size)

# 初始化模型参数
net = nn.Sequential(nn.Flatten(), nn.Linear(784, 10))

def init_weights(m):
    if type(m) == nn.Linear:
        nn.init.normal_(m.weight, std=0.01)

net.apply(init_weights)
loss = nn.CrossEntropyLoss()

# 优化算法
trainer = torch.optim.SGD(net.parameters(), lr=0.1)

# 训练
num_epochs = 10
d2l.train_ch3(net, train_iter, test_iter, loss, num_epochs, trainer)

d2l.plt.show()
```