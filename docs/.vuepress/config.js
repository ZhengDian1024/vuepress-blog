module.exports = {
  title: '个人主页',
  description: 'Personal Website',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/photo.jpeg' }],
    ['link', { rel: 'manifest', href: '/images/photo.jepg' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/photo.jpeg' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '基础', link: '/base/' },
      {text: '进阶', link: '/senior/' },
      {text: '算法', link: '/algorithm/'},
      {text: '诗和远方', link: '/others/'},
      {text: 'Github', link: 'https://github.com/ZhengDian1024'}
    ],
    // sidebar:{
    //   // '/base/': [
    //   //     {
    //   //       title: '前端基础',
    //   //       children: [
    //   //         '/base/1.html',
    //   //         '/base/2.html',
    //   //         '/base/3.html',
    //   //         '/base/4.html',
    //   //         '/base/5.html',
    //   //         '/base/6.html',
    //   //         '/base/7.html',
    //   //         '/base/8.html',
    //   //         '/base/9.html',
    //   //         '/base/10.html',
    //   //         '/base/11.html',
    //   //       ]
    //   //     }
    //   //   ],
    //     '/algorithm/': [
    //       {
    //         title: '递归',
    //         collapsable: true,
    //         children: [
    //           '递归.md',
    //         ]
    //       }
    //     ]
    // },
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2,
    lastUpdated: "更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "本文源码地址",
    smoothScroll: true,
  }
};
