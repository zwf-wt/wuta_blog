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
          text: 'JS面试题',
          link: '/views/front-end/interview-questions/js'
        },
        {
          text: 'Vue面试题',
          link: '/views/front-end/interview-questions/vue'
        },
        {
          text: 'Webpack面试题',
          link: '/views/front-end/interview-questions/webpack'
        },
        {
          text: '算法题目',
          link: '/views/front-end/interview-questions/alg'
        },
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
      ]
    }
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
        }
      ]
    }
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
          text: '建造者模式',
          link: '/views/design-pattern/creational/builder'
        }
      ]
    },
    {
      text: '结构型模式',
      items: [
        {
          text: '适配器模式',
          link: '/views/design-pattern/structural/adapter'
        }
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
  ]
}