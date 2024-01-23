import { defineConfig } from 'vitepress'
import {
  // 首页右上方导航栏
  nav,
  // 侧边栏
  sidebar,
} from './relaConf/index.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/wuta_blog',
  title: "无它博客",
  description: "A VitePress Site",
  themeConfig: {
    logo: '/avatar.jpg',
    nav,
    sidebar,
    outline: {
      level: [2, 6],
      label: '目录',  
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 本地搜索
    search: {
      provider: 'local'
    },
    // 国际化i18n
    i18nRouting: true
  }
})
