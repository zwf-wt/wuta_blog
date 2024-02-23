# Vue

## 1. 组件通信
### 1.1 Vue2.x
#### 1. 子组件通过 props 接收父组件传递的数据
```vue
<!-- 父组件 -->
<template>
  <div>
    <Child
      :msg="message"
    />
  </div>
</template>

<script>
import Child from '../components/Child.vue'

export default {
  name: 'Home',
  data () {
    return {
      message: '你好！',
    }
  },
  methods: {
  },
  components: {
    Child
  }
}
</script>

```

```vue
<!-- 子组件 -->
<template>
  <div>
    <!-- 父组件传进来的数据 -->
    {{ msg }}
    <!-- 当前组件自己定义的数据 -->
    {{ name }}
    {{ age }}
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      name: '李四',
      age: 20
    }
  }
}
</script>
```
#### 2. 子组件通过 `$parent` 获取父组件实例上的数据
<template>
  <div>
    <!-- 子组件通过 $parent 获取到的父组件数据 -->
    {{ sex }}
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      name: '李四',
      age: 20,
      sex: ''
    }
  },
  mounted () {
    this.sex = this.$parent.sex
  }
}
</script>

#### 1. 2. 子组件向父组件传递数据
> 子组件通过 `$emit` 方法向父组件触发事件，并将数据传递给父组件。
```vue
<!-- 父组件 -->
<template>
  <div>
    <Child
      :msg="message"
      @handleBtn="handleBtn"
    />
  </div>
</template>

<script>
import Child from '../components/Child.vue'

export default {
  name: 'Home',
  data () {
    return {
      message: '你好！',
      sex: '男'
    }
  },
  methods: {
    handleBtn (data) {
      console.log('子组件向父组件传递的数据', data)
    }
  },
  components: {
    Child
  }
}
</script>

```
```vue
<!-- 子组件 -->
<template>
  <div>
    <!-- 父组件传进来的数据 -->
    {{ msg }}
    <!-- 当前组件自己定义的数据 -->
    {{ name }}
    {{ age }}
    <!-- 子组件通过 $parent 获取到的父组件数据 -->
    {{ sex }}

    <button @click="handleBtn">按钮</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      name: '李四',
      age: 20,
      sex: ''
    }
  },
  methods: {
    handleBtn () {
      this.$emit('handleBtn', {
        name: this.name.split('').reverse().join(''),
        age: this.age,
        sex: this.sex
      })
    }
  },
  mounted () {
    this.sex = this.$parent.sex
  }
}
</script>

```
### 1.2 Vue3.x

## 2. 插槽
> 允许在父组件中预留位置，动态地插入子组件的内容。这在创建可复用的组件时非常有用。
### 2.1 默认插槽(Default Slot)
> 默认插槽是最基本的插槽类型，在父组件中使用 `<slot>` 标签定义，如果子组件没有提供内容插入到这个插槽中，那么将显示默认的内容。
1. 定义子组件
```vue
<!-- 子组件内容 -->
<template>
  <div>
    <h1>DefaultSlot</h1>

    <!-- 使用 slot 预留位置 -->
    <slot>李四</slot>
  </div>
</template>

<script>
export default {
  name: 'DefaultSlot'
}
</script>

```
2. 在父组件中使用子组件，并插入内容
```vue
<template>
  <div>
    <!-- 使用插槽的默认值 -->
    <DefaultSlot />
    <!-- 自定义插槽内容 -->
    <DefaultSlot>
      <p>默认插槽内容 -- {{ name }}</p>
    </DefaultSlot>
  </div>
</template>

<script>
import DefaultSlot from '../components/DefaultSlot.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: '张三'
    }
  },
  components: {
    DefaultSlot
  }
}
</script>
```
![默认插槽](/assets/vue/default_slot.png)
### 2.2 具名插槽(Named Slot)
> 具名插槽允许你在父组件中定义多个具有名称的插槽，子组件可以根据名称将内容插入到对应的插槽中。在父组件中使用 `<slot>` 标签时，通过 name 属性指定插槽的名称。
1. 定义子组件内容
```vue
<template>
  <div>
    <h1>具名插槽</h1>

    <!-- 1. 预留具名插槽位置 header -->
    <slot name="header"></slot>
    <span>组件内容</span>

    <!-- 2. 预留默认插槽位置 -->
    <slot>主体</slot>

    <!-- 3. 预留具名插槽位置 footer -->
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'NamedSlot'
}
</script>
```
2. 在父组件中使用子组件，并插入内容
```vue
<template>
  <div>
    <!-- 1. 任何插槽都不写 -->
    <NamedSlot />
    <hr>

    <!-- 2. 自定义插槽内容 -->
    <NamedSlot>
      <!-- 具名插槽 -->
      <template v-slot:header>
        <h1>我是头部内容 -- {{ name }}</h1>
      </template>
      
      <template #footer>
        <h1>我是尾部内容 -- {{ name }}</h1>
      </template>
      <!-- 默认插槽 -->
      <p>我是主体内容 -- {{ name }}</p>
    </NamedSlot>
    <hr>

    <!-- 3. 只定义默认插槽内容 -->
    <NamedSlot>
      <!-- 默认插槽 -->
      <div>
        {{ name }}
      </div>
    </NamedSlot>
  </div>
</template>

<script>
import NamedSlot from '../components/NamedSlot.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: '张三'
    }
  },
  components: {
    NamedSlot
  }
}
</script>

```
![具名插槽](/assets/vue/named_slot.png)
### 2.3 作用域插槽(Scoped Slot)
> 作用域插槽是一种特殊类型的插槽，它允许子组件向父组件传递数据。通过在子组件中使用 `<slot>` 标签的 v-slot 指令来定义作用域插槽，并在父组件中使用子组件时，可以通过 `slot-scope` 属性获取子组件传递的数据。
1. 子组件中使用 `<slot>` 标签，并使用 `v-slot` 指令来定义作用域插槽。
```vue
<template>
  <div>
    <h1>作用域插槽</h1>
    <slot :data="obj"></slot>

    <slot :data="footer" name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'ScopedSlot',
  data () {
    return {
      obj: {
        name: '张三',
        age: 18
      },
      footer: {
        text: '底部内容'
      }
    }
  }
}
</script>

```
2. 父组件中使用子组件时，通过 `slot-scope` 属性获取子组件传递的数据。
```vue
<template>
  <div>
    <!-- 1. 不使用插槽内容 -->
    <ScopedSlot />
    <hr>

    <!-- 2. 使用插槽内容 -->
    <ScopedSlot>
      <!-- 默认的具名插槽 -->
      <template v-slot:default="slotProps">
        <div>
          姓名：{{ slotProps.data.name }}
        </div>
        <div>
          性别：{{ slotProps.data.age }}
        </div>
      </template>

      <!-- 2. 具名的默认插槽 -->
      <template v-slot:footer="slotProps">
        <div>
          {{ slotProps.data.text }}
        </div>
      </template>
    </ScopedSlot>
  </div>
</template>

<script>
// import DefaultSlot from '../components/DefaultSlot.vue'
// import NamedSlot from '../components/NamedSlot.vue'
import ScopedSlot from '../components/ScopedSlot.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: '张三'
    }
  },
  components: {
    // DefaultSlot,
    // NamedSlot,
    ScopedSlot
  }
}
</script>

</script>

```

![作用域插槽](/assets/vue/scoped_slot.png)
## 3. keep-alive
> Vue 的 keep-alive 是一个抽象组件，用于缓存动态组件，它可以保留组件状态或避免重新渲染。
当 keep-alive 包裹动态组件时，这些动态组件将会被缓存起来，而不是每次切换时都销毁重建。这意味着在切换回已经缓存的组件时，它们的状态将会被保留，而不需要重新渲染和重新挂载。
```vue
<template>
  <div id="app">
    <button @click="toggleComponent">Toggle Component</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  },
  methods: {
    toggleComponent() {
      this.currentComponent = this.currentComponent === 'ComponentA' ? 'ComponentB' : 'ComponentA';
    }
  }
};
</script>
```
> `<keep-alive>` 包裹了一个动态组件，在切换动态组件时，被缓存的组件状态将会被保留，从而提高了页面切换的性能和用户体验。需要注意的是，在使用 keep-alive 时，被缓存的组件需要实现 activated 和 deactivated 生命周期钩子，在组件被激活和停用时执行相应的逻辑
### `keep-alive` 接收三个属性：
- `include`：字符串或正则表达式，只有匹配的组件会被缓存。
- `exclude`：字符串或正则表达式，任何匹配的组件都不会被缓存。
- `max`：数字，最多可以缓存多少组件实例。
```vue
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

- max: 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

### `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

### `<keep-alive>` 案例
#### 案例1：
- 定义两个组件
```vue
<!-- componentA -->
<template>
  <div>
    组件A
  </div>
</template>

<script>
export default {
  beforeCreate () {
    console.log('组件A beforeCreate')
  },
  created () {
    console.log('组件A created')
  },
  beforeMount () {
    console.log('组件A beforeMount')
  },
  mounted () {
    console.log('组件A mounted')
  },
  activated () {
    console.log('组件A activated')
  },
  deactivated () {
    console.log('组件A deactivated')
  },
  destroyed () {
    console.log('组件A destroyed')
  }
}
</script>
```

```vue
<!-- componentB -->
<template>
  <div>
    组件B
  </div>
</template>

<script>
export default {
  beforeCreate () {
    console.log('组件B beforeCreate')
  },
  created () {
    console.log('组件B created')
  },
  beforeMount () {
    console.log('组件B beforeMount')
  },
  mounted () {
    console.log('组件B mounted')
  },
  activated () {
    console.log('组件B activated')
  },
  deactivated () {
    console.log('组件B deactivated')
  },
  destroyed () {
    console.log('组件B destroyed')
  }
}
</script>
```
- 使用这两个组件
```vue
<template>
  <div>
    <button @click="toggleComponent">Toggle Component</button>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>

  </div>
</template>

<script>
import ComponentA from '../components/ComponentA.vue'
import ComponentB from '../components/ComponentB.vue'

export default {
  name: 'Home',
  data () {
    return {
      currentComponent: 'ComponentA'
    }
  },
  methods: {
    toggleComponent () {
      this.currentComponent =
        this.currentComponent === 'ComponentA' ? 'ComponentB' : 'ComponentA'
    }
  },
  components: {
    ComponentA, ComponentB
  }
}
</script>
```

- 一开始显示 `ComponentA`, 依次输出`组件A beforeCreate`、`组件A created`、`组件A beforeMount`、`组件A mounted`、`组件A activated`；
- 当第一次点击按钮时，显示`ComponentB`, 依次输出`组件B beforeCreate`、`组件B created`、`组件B beforeMount`, 此时输出`组件A deactivated`，然后再输出 `组件B mounted`、`组件B activated`; 
- 当第二次点击按钮时，显示`ComponentA`, 依次输出`组件B deactivated`、`组件A activated`;
- 当第三次点击按钮时，显示`ComponentB`, 依次输出`组件A deactivated`、`组件B activated`

## 4. 混入
> 它允许我们将一个对象混入到多个 Vue 组件中，从而实现代码复用。
具体来说，当我们创建一个混入对象时，该对象可以包含组件选项、生命周期钩子、数据、方法等内容。然后，我们可以在需要的组件中通过 mixins 选项来引入这个混入对象，从而让混入对象的内容被合并到组件中。

### 4.1 Vue 中混入的缺点主要包括以下几个方面：
1. 命名冲突：如果多个混入对象中定义了相同的数据或方法，那么在组件中使用这些混入对象时就可能会出现命名冲突的问题。为了避免这种情况，我们需要在混入对象的命名上做好规范。

2. 不可预期的副作用：由于混入对象的内容是被合并到组件中的，因此有可能会出现不必要的副作用，导致组件的行为不可预期。为了避免这种情况，我们需要在混入对象中定义好适用的条件和限制。

3. 复杂度增加：当一个组件引入多个混入对象时，它的代码复杂度会随之增加，特别是当这些混入对象之间存在相互依赖的关系时，代码会变得更加难以理解和维护。

4. 语义不清：混入对象的作用是将代码复用到多个组件中，但是混入对象本身的语义并不清晰，容易让人产生混淆和不必要的错误。因此，在使用混入对象时，我们需要在命名和注释等方面做好充分的说明，使其代码含义更加明确。

> 总的来说，混入是一种非常便捷的方式来实现组件之间的代码复用，但需要注意避免命名冲突、不可预期的副作用以及复杂度增加等问题，以确保代码的可维护性和可读性。

### 4.2 混入对象的使用
1. 创建一个2个混入对象
```js
export const mixin1 = {
  data () {
    return {
      name: '张三',
      age: 18
    }
  },
  methods: {
    addAge () {
      this.age++
    }
  }
}

export const mixin2 = {
  data () {
    return {
      age: 30
    }
  }
}
```

2. 在组件中引入混入对象
```vue
<template>
  <div>
    <!-- mixin1 的 name 数据 和 当前组件的 name 冲突了, 那么使用 组件 中的数据 -->
    {{ name }}
    <!-- mixin1 和 mixin2 都定义了 age 变量，后面的将前面的覆盖掉了 -->
    {{ age }}
    <button @click="addAge">
      增加年龄
    </button>

  </div>
</template>

<script>
import { mixin1, mixin2 } from '../mixins/mixin.js'

export default {
  name: 'Home',
  mixins: [mixin1, mixin2],
  data () {
    return {
      name: '李四'
    }
  }
}
</script>

```

![mixins](/assets/vue/mixins.png)

## 6. 生命周期