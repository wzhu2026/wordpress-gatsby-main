// Unified fallback data file
// Used when WordPress API requests fail or data is incomplete

// 静态文章数据
const fallbackPosts = [
  {
    "id": 1,
    "slug": "hello-world",
    "title": {
      "rendered": "欢迎来到我的博客"
    },
    "content": {
      "rendered": "<h2>欢迎</h2><p>这是我的第一篇博客文章。欢迎来到我的个人博客！</p><p>我会在这里分享技术文章、项目经验和生活感悟。</p>"
    },
    "excerpt": {
      "rendered": "<p>欢迎来到我的个人博客！我会在这里分享技术文章、项目经验和生活感悟。</p>"
    },
    "date": "2025-01-15T08:00:00",
    "modified": "2025-01-15T08:00:00",
    "tags": ["欢迎", "博客"],
    "jetpack_featured_media_url": "https://picsum.photos/id/0/640/360"
  },
  {
    "id": 2,
    "slug": "gatsby-intro",
    "title": {
      "rendered": "Gatsby 入门指南"
    },
    "content": {
      "rendered": "<h2>什么是 Gatsby？</h2><p>Gatsby 是一个基于 React 的静态站点生成器。它可以帮助你快速构建高性能的网站。</p><h2>为什么选择 Gatsby？</h2><ul><li>性能优异</li><li>SEO 友好</li><li>丰富的插件生态</li><li>优秀的开发体验</li></ul>"
    },
    "excerpt": {
      "rendered": "<p>Gatsby 是一个基于 React 的静态站点生成器。它可以帮助你快速构建高性能的网站。</p>"
    },
    "date": "2025-02-20T10:30:00",
    "modified": "2025-02-20T10:30:00",
    "tags": ["Gatsby", "React", "前端"],
    "jetpack_featured_media_url": "https://picsum.photos/id/100/640/360"
  },
  {
    "id": 3,
    "slug": "react-hooks",
    "title": {
      "rendered": "React Hooks 完全指南"
    },
    "content": {
      "rendered": "<h2>什么是 Hooks？</h2><p>Hooks 是 React 16.8 引入的新特性，让你可以在不编写 class 的情况下使用 state 和其他 React 特性。</p><h2>常用 Hooks</h2><ul><li>useState - 管理状态</li><li>useEffect - 处理副作用</li><li>useContext - 共享状态</li><li>useReducer - 复杂状态逻辑</li></ul>"
    },
    "excerpt": {
      "rendered": "<p>Hooks 是 React 16.8 引入的新特性，让你可以在不编写 class 的情况下使用 state 和其他 React 特性。</p>"
    },
    "date": "2025-03-10T14:20:00",
    "modified": "2025-03-10T14:20:00",
    "tags": ["React", "JavaScript", "前端"],
    "jetpack_featured_media_url": "https://picsum.photos/id/26/640/360"
  }
];

// Hero category fallback data
const fallbackHero = {
  basic: {
    title: "欢迎",
    name: "开发者",
    description: "一名热爱编程和分享知识的全栈开发者",
    avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
  },
  buttons: [
    { text: "查看文章", link: "/posts", type: "primary" },
    { text: "联系我", link: "/contact", type: "secondary" }
  ]
};

// Contact category fallback data
const fallbackContact = {
  title: "联系我们",
  description: "我始终欢迎讨论新项目、创意想法或参与您的愿景的机会。",
  bottom_info: {
    response_time: "我通常在工作日24小时内回复消息。",
    closing_message: "期待收到您的来信！🚀"
  }
};

// Socials category fallback data
const fallbackSocials = {
  socials: [
    { name: "twitter", val: "https://twitter.com/", svg: "twitter.svg", type: "social" },
    { name: "github", val: "https://github.com/", svg: "github.svg", type: "social" },
    { name: "email", val: "mailto:your@email.com", svg: "email.svg", address: "your@email.com", type: "contact" }
  ]
};

// Comments category fallback data
const fallbackComments = {
  title: "留言与讨论",
  description: "在这里分享您的想法、问题或建议。让我们一起交流和讨论！",
  rules: [
    "请保持尊重和建设性的评论",
    "禁止垃圾信息、自我推广或广告",
    "禁止人身攻击、仇恨言论或骚扰",
    "请保持话题相关性",
    "禁止不当、冒犯或非法内容",
    "使用清晰、友好、包容的语言"
  ]
};

// Posts category fallback data
const fallbackPostsMeta = {
  title: "博客文章",
  description: "探索我们在Web开发、设计和技术方面的最新文章"
};

// About category fallback data
const fallbackAbout = {
  title: "关于我",
  content: "你好，我是一名热爱编程和分享知识的Web开发者。喜欢探索新技术，并通过博客分享我的学习和项目经验。希望能通过我的内容激励更多人踏上编程之路。"
};

// Footer category fallback data
const fallbackFooter = {
  text: "© 2025 我的博客. 保留所有权利.",
  links: [
    { title: "隐私政策", url: "/privacy" },
    { title: "服务条款", url: "/terms" }
  ],
  extra: "Built with Gatsby"
};

// Skills category fallback data
const fallbackSkills = [
  { id: 1, percentage: 95, color: "#61dafb", icon: "R", name: "React" },
  { id: 2, percentage: 90, color: "#f7df1e", icon: "JS", name: "JavaScript" },
  { id: 3, percentage: 88, color: "#3178c6", icon: "TS", name: "TypeScript" },
  { id: 4, percentage: 85, color: "#41b883", icon: "V", name: "Vue.js" },
  { id: 5, percentage: 82, color: "#000000", icon: "N", name: "Node.js" },
  { id: 6, percentage: 80, color: "#e34c26", icon: "H", name: "HTML5" },
  { id: 7, percentage: 78, color: "#264de4", icon: "C", name: "CSS3" },
  { id: 8, percentage: 76, color: "#cc6699", icon: "S", name: "Sass" },
  { id: 9, percentage: 74, color: "#f05032", icon: "G", name: "Git" },
  { id: 10, percentage: 72, color: "#61dafb", icon: "N", name: "Next.js" }
];

// Projects category fallback data
const fallbackProjects = [
  {
    id: 1,
    title: "电商平台",
    description: "使用 React、Node.js 和 MongoDB 构建的全栈电商平台。",
    technologies: ["React", "Node.js", "MongoDB"],
    svg: "/svg/project1.svg",
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "任务管理应用",
    description: "具有实时更新功能的协作任务管理应用。",
    technologies: ["Vue.js", "Firebase", "Vuex"],
    svg: "/svg/project2.svg",
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "天气仪表板",
    description: "基于位置的精美天气仪表板。",
    technologies: ["JavaScript", "CSS3", "Weather API"],
    svg: "/svg/project3.svg",
    link: "#",
    github: "#"
  }
];

const defaultAuthor = "博主";
const defaultAuthorAvatar = "https://avatars.githubusercontent.com/u/20943608?v=4";

const fallbackSiteConfig = {
  siteName: "个人博客",
  wordpressUrl: ""
};

const giscusConfig = {
  repo: process.env.GATSBY_GISCUS_REPO,
  repoId: process.env.GATSBY_GISCUS_REPO_ID,
  category: "Ideas",
  categoryId: process.env.GATSBY_GISCUS_CATEGORY_ID,
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  theme: "noborder_light",
  lang: "zh-CN",
  loading: "lazy"
};

module.exports = {
  fallbackPosts,
  fallbackHero,
  fallbackContact,
  fallbackSocials,
  fallbackComments,
  fallbackPostsMeta,
  fallbackAbout,
  fallbackFooter,
  fallbackSkills,
  fallbackProjects,
  defaultAuthor,
  defaultAuthorAvatar,
  fallbackSiteConfig,
  giscusConfig
};
