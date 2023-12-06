
import { DefaultTheme } from 'vitepress';
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  // {
  //   text: '个人成长',
  //   items: [
  //     {
  //       text: '大江南北游记',
  //       link: '/column/Travel/' // 表示docs/column/Travel/index.md
  //     },
  //     {
  //       text: '所思·所想',
  //       link: '/column/Growing/' // 表示docs/column/Growing/index.md
  //     }
  //   ]
  // },
  {
    text: '关于我',
    items: [
      {
        text: '掘金',
        link: 'https://juejin.cn'
      },
      {
        text: '无它工具',
        link: 'https://zhang_wen_fa.gitee.io/wuta_tools_view2/#/'
      }
    ]
  },
  {
    text: '后端',
    items: [
      {
        text: 'SQL常用语句',
        link: '/views/sql/common-sql'
      },
    ]
  },
];
