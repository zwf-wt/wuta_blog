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