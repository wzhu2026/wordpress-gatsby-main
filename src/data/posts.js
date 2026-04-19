// 本地文章数据
const posts = [
  {
    id: 1,
    slug: "hello-world",
    title: "我的博客",
    date: "2025-04-19",
    excerpt: "这是我的第一篇博客文章。",
    content: "<p>这是我的第一篇博客文章。欢迎来到我的个人博客！</p><p>我会在这里分享技术文章和学习心得。</p>",
    tags: ["欢迎", "博客"]
  },
  {
    id: 2,
    slug: "gatsby-intro",
    title: "Gatsby 入门指南",
    date: "2025-04-18",
    excerpt: "了解 Gatsby 的基本概念和使用方法。",
    content: "<p>Gatsby 是一个基于 React 的静态站点生成器。</p><p>它可以帮助你快速构建高性能的网站。</p><h2>优点</h2><ul><li>性能优异</li><li>SEO 友好</li><li>丰富的插件生态</li></ul>",
    tags: ["Gatsby", "React"]
  },
  {
    id: 3,
    slug: "react-hooks",
    title: "React Hooks 基础",
    date: "2025-04-17",
    excerpt: "学习 React Hooks 的核心概念。",
    content: "<p>Hooks 是 React 16.8 引入的新特性。</p><h2>常用 Hooks</h2><ul><li>useState - 管理状态</li><li>useEffect - 处理副作用</li><li>useContext - 共享状态</li></ul>",
    tags: ["React", "JavaScript"]
  }
]

export default posts
