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
  ]
}