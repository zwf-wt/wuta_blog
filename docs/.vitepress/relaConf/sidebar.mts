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