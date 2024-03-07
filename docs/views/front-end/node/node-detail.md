# node API

## Buffer

### Buffer 是什么
是一个计算机的数据结构，表示的是一个固定长度的缓冲序列。
File -> Buffer 的缓冲区 -> wait 进程再去处理

### Buffer 的 API
#### 声明
```js
// 1. 创建一个长度为 5 字节的内存
const buf = Buffer.alloc(5);

// 2. 创建一个长度为 5 的 Buffer，并初始化
const buf2 = Buffer.from('张三');

const buf3 = Buffer.from([0xe9, 0xba, 0x93]);
console.log(buf1)
console.log(buf2)
console.log(buf3.toString())
```
#### 拼接
```js
const buf4 = Buffer.from('张三');
let new_buf = Buffer.alloc(6);

buf4.copy(new_buf, 0, 0, 3);
buf2.copy(new_buf, 3, 0, 3);

console.log(new_buf.toString())
console.log(new_buf.toString('utf-8'))
console.log(new_buf.toString('hex'))
console.log(new_buf.toString('utf-8', 0, 6))
console.log(new_buf.toString('base64'))
/**
 * base -> baseURL
 * 1. + -> -
 * 2. / -> _
 * 3. = 去掉
 */

// 判断数据是否是 Buffer 类型
console.log(Buffer.isBuffer(new_buf))
console.log(Buffer.isBuffer(buf1))
```

```js
let buf = Buffer.alloc(100);

fs.open(path.resolve(__dirname, './a.js'), 'r', function (err, rfd) {
  fs.read(rfd, buf, 0, 100, 0, function (err, bytesRead) {
    console.log(buf);

    fs.open(path.resolve(__dirname, './b.js'), 'w', 0o666, function(err, wfd) {
      fs.write(wfd, buf, 0, 100, 0 , function(err, written) {
        console.log('写入成功');
      })
    })
  })
})
```
#### node 显示乱码
1. 中文，特殊语言是编码解码不一致
```js
const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../../readme.md'), 'utf-8', (err, data) => {
  console.log(data)
  fs.writeFile(path.resolve(__dirname, '../../re.md'), data, (err) => {
    console.log('success')
  })
})
fs.readFile(path.resolve(__dirname, '../../readme.md'), 'latin1', (err, data) => {
  console.log(data)  
})
```
## stream
```js

let arr = []
const res = fs.createReadStream(path.resolve(__dirname, '../../a.js'), {
  flags: 'r',
  start: 0,
  end: 1000,
  highwateMark: 20, // 64k
  autoClose: true,
  emitClose: true,
});

res.on('open', function(fd) {
  console.log('fd', fd);
})

res.on('data', function(data) {
  console.log('data', data);
})

res.on('end', function(data) {
  console.log('end', Buffer.concat(arr).toString())
})
```

```js
// 压缩文件
const zlib = require('zlib');

const res = fs.createReadStream(path.resolve(__dirname, '../../a.js'))
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../../a.js.gz')));
```

## eventEmitter
发布订阅 和 观察者模式
我让我的函数，在该执行的时候，进行执行
```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
.then(res => {
  console.log('xxx')
})
```

```js
const e = new EventEmitter();
e.on('text', (params) => {
  console.log('text', params)
})

e.emit('text', '123')
```

```js
// 手写发布订阅
function EventEmitter() {
  this._events = {

  }
}
EventEmitter.prototype.on = function(eventName, cb) {
  if (!this._events) {
    this._events = {}
  }
  let eventList = this._events[eventName] || (this._events[eventName] = []);
  eventList.push(cb)

}

EventEmitter.prototype.emit = function(eventName, ...rest) {
  this._events[eventName] && this._events[eventName].forEach(cb => cb(...rest))
}

EventEmitter.prototype.off = function(eventName, cb) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName]
      .filter(item => (item !== cb) && (item.cb !== cb))
  }
}

EventEmitter.prototype.once = function(eventName, cb) {
  const once = (...rest) => {
    cb(...rest);
    this.off(eventName, once);
  }

  this.on(eventName, once);
}

const e = new EventEmitter();
const handle1 = function (msg) {
  console.log('handle1: ', msg);
}

const handle2 = function (msg) {
  console.log('handle2: ', msg);
}

e.on('data', handle1)

e.once('data', handle2)

e.off('data', handle2)
setTimeout(() => {
  e.emit('data', '123')
  e.emit('data', '张三')
})
// emit 和 on 是 无耦合的
```

```ts
abstract class Observer {
  subject: Subject;
  constructor(subject: Subject) {
    this.subject = subject;
    this.subject.attach(this);
  }

  abstract run(data: String | Number): void;
}

class Subject {
  deps: Array<Observer>;
  state: Number;

  constructor() {
    this.deps = [];
    this.state = 0;
  }

  attach(obs: Observer) {
    this.deps.push(obs);
  }

  setState(num: Number) {
    this.state = num;
    this.notifyAllObserver()
  }

  notifyAllObserver() {
    this.deps.forEach(obs => {
      obs.run(this.state);
    })
  }
}


class BinaryObserver extends Observer {
  constructor(subject: Subject) {
    super(subject);
  }

  run(data: String | Number): void {
    console.log('hello this is the binary observer:', data.toString(2));
  }
}

class ArrayObserver extends Observer {
  constructor(subject: Subject) {
    super(subject);
  }

  run(data: Number) {
    console.log('hello this is the array observer', data.toString(8));
  }
}

const subject = new Subject();
const obs = new  BinaryObserver(subject);
const obs2 = new ArrayObserver(subject);
subject.setState(10);
```

## node 事件循环
AIO 异步非阻塞 I/O
餐厅的服务员
### node.js 运行机制
- V8 解析 JavaScript 脚本
- 解析后的 JS 代码，调用 Node API
- libuv 库负责 Node API 的执行, 将不同的任务，分配给不同的线程，形成一个 Event Loop 事件循环
- 以异步的方式将任务的执行结果返回给 V8 引擎
- V8 再将结果返回给用户

### node.js 事件循环的阶段
      procsss.nectTick / Promise ...
                |
    |------------------------|  
|——>|          timers        | 定时器：setTimeout, setInterval
|   |________________________|
|     process.nextTick / promise...
|               |
|   |------------------------|  
|   |  pending callbacks     | 执行延迟到下一个循环迭代的 I/O 回调
|   |________________________|
|     process.nextTick / promise...
|               |
|   |------------------------|  
|   |       idle,prepare     | 系统内部使用，闲置阶段
|   |________________________|
|     process.nextTick / promise...
|               |                     |-----------------|
|   |------------------------|        |   incoming,     |
|——>|       poll 轮询阶段     | <------|   connections,  |
|   |________________________|        |   data, etc.    |
|     process.nextTick / promise...   |_________________|
|               |
|   |------------------------|  
|——>|  check 检查阶段         | setImmediate
|   |________________________|
|     process.nextTick / promise...
|               |
|   |------------------------|  
|——>|  close callbacks       | 关闭回调函数
|   |________________________| socket.on('close', func...)
1. timer 阶段
  执行 setTimeout / setInterval 回调函数, 并且是由 poll 阶段控制的
2. pending callbacks
  执行部分的回调，除了 close, times, setImmediate 设置的回调
3. idle, prepare

4. poll - 在适当的条件下，node会在这里阻塞
  如果没有 timer, 会发生两件事情
  - 如果 poll 队列不为空，会遍历回调队列并同步执行
  - 如果 poll 队列为空
    - 有 setImmediate 会直接结束 poll 阶段进入 check 阶段
    - 如果没有 setImmediate 会等待回调函数加入 poll 队列，并立即执行回调函数
3. check 阶段

```js
async function async1() {
  console.log('async1 started');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2')
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeout0')
  setTimeout(() => {
    console.log('setTimeout1')
  }, 0)

  setImmediate(() => {
    console.log('setImmediate')
  })
}, 0);

async1();

process.nextTick(() => {
  console.log('nextTick')
})

new Promise(resolve => {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(() => {
  console.log('promise.then')
})
console.log('script end');
```

## 安全
1. 通信链路 - https
  1. 证书
  2. 非对称加密
  3. 对称加密
2. JWT(header, payload, signature) 或者 authentication cookie 到底存在哪里？
- cookie 存储
  HttpOnly cookie  / JS enabled / xss enabled
  
  secure cookie / https / 
  
  Samesite cookie / cors enabled / csrf enabled

3. helmetjs