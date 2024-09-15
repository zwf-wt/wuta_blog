# 代理模式

## 介绍
代理模式（Proxy Pattern）是结构型设计模式中的一种，它为其他对象提供一个代理以控制对这个对象的访问。通过代理模式，客户端可以通过代理对象间接地访问目标对象，这样可以在一定程度上保护目标对象，同时也可以在访问目标对象之前或之后添加额外的操作。

代理模式的主要优点包括：

- 控制对一个对象的访问，给某些消费者提供不同级别的访问权限。
- 代理对象可以实例化开销很大的对象，并且只在必要的时候才真正创建这个对象。
- 可以让对象在远程位置，代理帮助我们处理网络细节和其他通信细节。

代理模式通常包含以下几个角色：

1. Subject（抽象主题类）：定义了RealSubject和Proxy必须共同遵循的接口。
2. RealSubject（真实主题类）：定义了代理最终要实现的真实操作。
3. Proxy（代理类）：包含了对RealSubject的引用，提供了与RealSubject一样的接口以便能够在任何时候都能替代RealSubject。此外，Proxy类可以在RealSubject的操作之前或之后执行一些附加操作（如访问控制、记录日志等）。

## 案例
```js
/**
 * 故事开始在一个充满代码香气的羊村，沸羊羊，一个用字面量构造的简单对象，心中藏着对美羊羊深深的喜欢。在这个世界里，每个对象都由属性和方法构成，它们遵循着面向对象编程的法律，
 * 简单直接。沸羊羊决定，要向小美送一束鲜花，以表心意。如果是在一个没有复杂逻辑的理想世界，这段故事或许会这样展开：
 */
const fyy={
    name:'沸羊羊',
    sendFlower:function(receiber){
        console.log(`${this.name} 送了一束花给 ${receiver.name}`)
    }
}
const myy={
    name:'美羊羊',
    receiveFlower:function(sender){
        console.log(`${this.name}收到了${sender.name}送出的花，但是我不喜欢你`)
    }
}
xyy.sendFlower(myy)

// 你看这就是直接带来的尴尬，但是我们间接的送那尴尬的就不是我们了。

/**
 * 在这个故事中，我们引入了一个新角色——喜羊羊。喜羊羊和沸羊羊是老乡，并且她也具有接收花朵的能力（即实现了与喜羊羊相同的接口）。
 * 在代理模式的背景下，喜羊羊扮演了代理的角色，她可以代替美羊羊接收花朵，并在适当的时候将花朵转交给美羊羊。
 * 
 * 在JavaScript中，我们可以通过面向对象的方式来实现代理模式。
 * 首先，我们定义两个对象：沸羊羊和美羊羊。她们都拥有一些属性和方法，包括sendFlower和receiveFlower。
 * 然后，我们创建代理对象喜羊羊，她也具有receiveFlower方法，但这个方法内部可能会包含一些额外的逻辑，如检查美羊羊是否在线、记录日志等。
 */

const fyy={
  name:'沸羊羊',
  school:'xxx',
  sendFlower:function(target){
    console.log(`沸羊羊给${target.name}送了一束鲜花。`)
    target.receiveFlower(this);
  }
}
const myy={
  name:'美羊羊',
  receiveFlower:function(sender){
    // console.log(`${this.name}收到了${sender.name}送出的花`)
  }
}


xyy={
  name:'喜羊羊',
  isMyyAvailable: function() {  
    // 假设这里有一些逻辑来判断美羊羊是否在线
    // 是否愿意接受花  
    return true; // 示例中假设小美在线  
  },  
  receiveFlower: function(flower) {  
    if (this.isMyyAvailable()) {  
      myy.receiveFlower(flower);  
      console.log('美羊羊接受了你的花并叫你去约会');  
    } else {  
      console.log('美羊羊没接受你的花并且他不不喜欢你');  
    }  
  }  
}
fyy.sendFlower(xyy)

```