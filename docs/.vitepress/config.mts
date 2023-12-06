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
    // https://vitepress.dev/reference/default-theme-config
    nav,
    // : [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    sidebar,
    // : [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

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
