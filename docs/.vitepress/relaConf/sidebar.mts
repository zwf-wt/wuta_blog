import { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Sidebar = {
  '/views/sql/': [
    {
      text: 'sql简介',
      items: [
        {
          text: '常用SQL',
          link: '/views/sql/common-sql'
        },
        {
          text: 'SQL面试题',
          link: '/views/sql/sql-interview'
        },
        {
          text: '实际遇到的问题',
          link: '/views/sql/work'
        }
      ]
    },
  ],
  '/views/algorithm': [
    {
      text: '排序',
      link: '/views/algorithm/sort/index'
    }
  ],
  '/views/git': [
    {
      text: 'Git',
      items: [
        {
          text: 'git常用命令',
          link: '/views/git/common_command'
        },
        {
          text: 'git规范',
          link: '/views/git/git_norm'
        },
      ]
    }
  ],
  // 前端
  '/views/front-end': [
    {
      text: '前端',
      items: [
        {
          text: '介绍',
          link: '/views/front-end/index'
        },
        {
          text: '前端API',
          link: '/views/front-end/front_api'
        },
        {
          text: '通过Node实现一个CLI工具',
          link: '/views/front-end/cli'
        },
        {
          text: '工作',
          link: '/views/front-end/work'
        },
        {
          text: '算法题目',
          link: '/views/front-end/interview-questions/alg'
        },
        {
          text: 'Vue系列',
          items: [
            {
              text: 'vue',
              link: '/views/front-end/vue-series/vue'
            },
            {
              text: 'vue-router',
              link: '/views/front-end/vue-series/vue-router'
            },
            {
              text: 'vuex',
              link: '/views/front-end/vue-series/vuex'
            },
            {
              text: '开发一个vite包并发布到npm',
              link: '/views/front-end/vue-series/custom-vite-package'
            }
          ]
        },
        {
          text: '前端工程化',
          items: [
            {
              text: 'Webpack',
              items: [
                {
                  text: 'Loader',
                  link: '/views/front-end/modules/webpack/loader'
                },
                {
                  text: 'Plugins',
                  link: '/views/front-end/modules/webpack/plugins'
                },
              ]
            }
          ]
        },
        {
          text: '性能优化',
          items: [
            {
              text: '指标',
              link: '/views/front-end/performance-optimization/indicator'
            }
          ]
        },
        {
          text: 'node',
          items: [
            {
              text: '基础',
              link: '/views/front-end/node/basic'
            },
            {
              text: 'node详解',
              link: '/views/front-end/node/node-detail'
            },
            {
              text: 'node框架详解',
              link: '/views/front-end/node/node框架详解'
            }
          ]
        },
        
        {
          text: 'threeJS',
          items: [
            {
              text: '01. 创建一个立方体',
              link: '/views/front-end/threeJS/01. 创建一个立方体'
            },
            {
              text: '02. 坐标辅助器与轨道控制器',
              link: '/views/front-end/threeJS/02. 坐标辅助器与轨道控制器'
            },
            {
              text: '03. 物体位移与父子元素',
              link: '/views/front-end/threeJS/03. 物体位移与父子元素'
            },
            {
              text: '04. 物体的缩放与旋转',
              link: '/views/front-end/threeJS/04. 物体的缩放与旋转'
            },
            {
              text: '05. 设置响应式画布与全屏控制',
              link: '/views/front-end/threeJS/05. 设置响应式画布与全屏控制'
            },
            {
              text: '06. 应用lil-GUI调试开发3D效果',
              link: '/views/front-end/threeJS/06. 应用lil-GUI调试开发3D效果'
            },
            {
              text: '07. 几何体_顶点_索引_面之BufferGeometry',
              link: '/views/front-end/threeJS/07. 几何体_顶点_索引_面之BufferGeometry'
            },
            {
              text: '08. 几何体划分顶点组设置不同材质',
              link: '/views/front-end/threeJS/08. 几何体划分顶点组设置不同材质'
            },
            {
              text: '09. 贴图的加载与环境遮蔽贴图强度设置',
              link: '/views/front-end/threeJS/09. 贴图的加载与环境遮蔽贴图强度设置'
            },
            {
              text: '10. 透明度贴图_环境贴图加载与高光贴图配合使用',
              link: '/views/front-end/threeJS/10. 透明度贴图_环境贴图加载与高光贴图配合使用'
            },
            {
              text: '11. 纹理的颜色空间',
              link: '/views/front-end/threeJS/11. 纹理的颜色空间'
            },
            {
              text: '12. 场景的线型雾和招数雾',
              link: '/views/front-end/threeJS/12. 场景的线型雾和招数雾'
            },
            {
              text: '13. 加载gltf模型和加载压缩过的模型',
              link: '/views/front-end/threeJS/13. 加载gltf模型和加载压缩过的模型'
            },
            {
              text: '14. 光线投射实现3d场景交互事件',
              link: '/views/front-end/threeJS/14. 光线投射实现3d场景交互事件'
            },
            {
              text: '15. 补间动画Tween应用',
              link: '/views/front-end/threeJS/15. 补间动画Tween应用'
            },
            {
              text: '16. 全面讲解UV与应用',
              link: '/views/front-end/threeJS/16. 全面讲解UV与应用'
            },
            {
              text: '17. 法向量属性应用与法向量辅助器',
              link: '/views/front-end/threeJS/17. 法向量属性应用与法向量辅助器'
            },
            {
              text: '18. 几何体顶点转化_顶点位移_旋转_缩放',
              link: '/views/front-end/threeJS/18. 几何体顶点转化_顶点位移_旋转_缩放'
            },
            {
              text: '19. 包围盒使用与世界矩阵转换',
              link: '/views/front-end/threeJS/19.包围盒使用与世界矩阵转换'
            },
            {
              text: '20. 几何体居中与获取几何体中心',
              link: '/views/front-end/threeJS/20.几何体居中与获取几何体中心'
            },
            {
              text: '21. 获取多个物体包围盒',
              link: '/views/front-end/threeJS/21.获取多个物体包围盒'
            },
            {
              text: '22. 边缘几何体与线框几何体',
              link: '/views/front-end/threeJS/22.边缘几何体与线框几何体'
            },
            {
              text: '23. 灯光与阴影的设置',
              link: '/views/front-end/threeJS/23.灯光与阴影的设置'
            },
          ]
        },
        
      ]
    },
  ],
  // 后端
  '/views/after-end': [
    {
      text: 'Python',
      items: [
        {
          text: 'Python基础',
          link: '/views/after-end/python/PythonBasic'
        },
        {
          text: 'Pandas代码片段',
          link: '/views/after-end/python/PandasCodeSnippet'
        },
        {
          text: '机器学习',
          items: [
            {
              text: '概述',
              link: '/views/after-end/python/MachineLearning/index.md'
            },
            {
              text: '特征工程',
              link: '/views/after-end/python/MachineLearning/2. 特征工程.md'
            },
            {
              text: '分类算法',
              link: '/views/after-end/python/MachineLearning/3. 分类算法.md'
            }
          ]
        }
      ]
    },
    {
      text: 'Java',
      items: [
        {
          text: 'Java基础',
          items: [
            {
              text: '继承',
              link: '/views/after-end/java/basic/extend'
            },
            {
              text: '多态',
              link: '/views/after-end/java/basic/polymorphic'
            },
            {
              text: '枚举',
              link: '/views/after-end/java/basic/enumerate'
            },
          ]
        },
      ]
    },
  ],
  // 设计模式相关
  '/views/design-pattern': [
    {
      text: '设计模式',
      // link: '/views/design-pattern/index'
      items: [
        {
          text: '介绍',
          link: '/views/design-pattern/index'
        }
      ]
    },
    {
      text: '创建型模式',
      items: [
        {
          text: '单例模式',
          link: '/views/design-pattern/creational/singleton'
        },
        {
          text: '工厂模式',
          link: '/views/design-pattern/creational/factory'
        },
        {
          text: '建造者模式',
          link: '/views/design-pattern/creational/builder'
        },
        {
          text: '原型模式',
          link: '/views/design-pattern/creational/prototype'
        }
      ]
    },
    {
      text: '结构型模式',
      items: [
        {
          text: '桥接器模式',
          link: '/views/design-pattern/structural/bridge'
        },
        {
          text: '适配器模式',
          link: '/views/design-pattern/structural/adapter'
        },
        {
          text: '组合模式',
          link: '/views/design-pattern/structural/composite'
        },
        {
          text: '装饰器模式',
          link: '/views/design-pattern/structural/decorator'
        },
        {
          text: '外观模式',
          link: '/views/design-pattern/structural/facade'
        },
        {
          text: '享元模式',
          link: '/views/design-pattern/structural/flyweight'
        },
        {
          text: '代理模式',
          link: '/views/design-pattern/structural/proxy'
        },
      ]
    },
    {
      text: '行为型模式',
      items: [
        {
          text: '模板方法模式',
          link: '/views/design-pattern/behavior/template_function'
        }
      ]
    }
  ],
  '/views/books/img-http': [
    {
      text: '第一章：了解Web及网络基础',
      link: '/views/books/img-http/第一章：了解Web及网络基础'
    }
  ],
  '/views/books/人月神话': [
    {
      text: '焦油坑',
      link: '/views/books/人月神话/焦油坑'
    },
    {
      text: '人月神话',
      link: '/views/books/人月神话/人月神话'
    },
    {
      text: '外科手术队伍',
      link: '/views/books/人月神话/外科手术队伍'
    },
    {
      text: '画蛇添足',
      link: '/views/books/人月神话/画蛇添足'
    },
    {
      text: '贯彻执行',
      link: '/views/books/人月神话/贯彻执行'
    },
    {
      text: '为什么巴比伦塔会失败？',
      link: '/views/books/人月神话/为什么巴比伦塔会失败'
    },
    {
      text: '胸有成竹',
      link: '/views/books/人月神话/胸有成竹'
    },
    {
      text: '削足适履',
      link: '/views/books/人月神话/削足适履'
    },
  ],
  '/views/interview-questions': [
    {
      text: '前端面试',
      items: [
        {
          text: 'CSS面试题',
          link: '/views/interview-questions/css'
        },
        {
          text: 'DOM面试题',
          link: '/views/interview-questions/dom'
        },
        {
          text: 'JS面试题',
          // link: '/views/interview-questions/js',
          items: [
            {
              text: '基础语法篇',
              link: '/views/interview-questions/js/js_basic'
            },
            {
              text: '对象',
              link: '/views/interview-questions/js/js_object'
            },
            {
              text: '函数',
              link: '/views/interview-questions/js/function'
            },
            {
              text: 'Promise',
              link: '/views/interview-questions/js/promise'
            },
            {
              text: 'es6+',
              link: '/views/interview-questions/js/es6'
            },
            {
              text: '其它',
              link: '/views/interview-questions/js/js'
            },
          ]
        },
        
        {
          text: '框架',
          items: [
            {
              text: 'Vue面试题',
              link: '/views/interview-questions/vue'
            },
          ]
        },
        {
          text: '打包工具',
          items: [
            {
              text: 'Webpack面试题',
              link: '/views/interview-questions/webpack'
            },
          ]
        },
        
        {
          text: '某公司题库',
          link: '/views/interview-questions/CompanyQuestionBank'
        },
        
      ]
    },
    {
      text: '后端面试',
      items: []
    },
    {
      text: '计算机网络',
      link: '/views/interview-questions/network'
    },
    {
      text: '数据结构与算法',
      items: [
        {
          text: '数据结构',
          link: '/views/interview-questions/dataStructure-algorithm/dataStructure'
        },
        {
          text: '算法题',
          link: '/views/interview-questions/dataStructure-algorithm/alg'
        },
        {
          text: '其它',
          link: '/views/interview-questions/dataStructure-algorithm/other'
        },
      ]
    }
  ]
}