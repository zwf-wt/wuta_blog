# 工作中遇到的情况

## 1. js
### 1.生成`FormData`数据
```js
// 生成formData数据
const createFormData = obj => {
  const formData = new FormData()
  Object.keys(obj).forEach(item => {
    if (!Array.isArray(obj[item])) {
      formData.append(item, obj[item])
    } else {
      obj[item].forEach(childItem => {
        formData.append(`${item}[]`, childItem)
      })
    }
  })
  return formData
}
```
### 2. 将字符串和 `unicode` 码互相转换

```js
// 1. 将字符串转换为unicode码
let char = '三';
let unicode = char.charCodeAt(0).toString(16);
unicode = '\u' + '0000'.substr(0, 4 - unicode.length) + unicode;

// 输出结果为：\u4e09

// 2. 将 unicode 码转换为字符串
console.log(`\u4e09`) // 使用 ES6+ 模板字符串转换
// 输出结果为：三
```