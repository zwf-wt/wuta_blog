# 排序

## 前置知识
### 交换两个元素的数据

#### 1. 使用中间变量进行交换

```js
const swap = (arr, i, j) => {
  // 边缘检测

  // 交换
  tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
```


#### 2. 利用加减运算

```js
const swapCal = (arr, i, j) => {
  if(i == j) return;
  arr[i] = arr[i] + arr[j]; // a = a + b
  arr[j] = arr[i] - arr[j]; // b = a - b
  arr[i] = arr[i] - arr[j]; // a = a - b
}
```

#### 3. 利用异或运算
```js
const swapXOR = (arr, i, j) => {
  if(i == j) return;
  arr[i] = arr[i] ^ arr[j]; // a = a ^ b，也可写成 arr[i] ^= arr[j];
  arr[j] = arr[i] ^ arr[j]; // b = (a ^ b) ^ b = a ^ (b ^ b) = a ^ 0 = a， 也可写成 arr[j] ^= arr[i];
  arr[i] = arr[i] ^ arr[j]; // a = (a ^ b) ^ a = (a ^ a) ^ b = 0 ^ b = b， 也可写成 arr[i] ^= arr[j];
}
```