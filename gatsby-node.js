const path = require("path")

// 文章数据
const posts = [
  {
    id: 1,
    slug: "hello-world",
    title: "欢迎来到我的博客",
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
  },
  // 添加更多测试文章来测试分页
  {
    id: 4,
    slug: "css-tips",
    title: "CSS 实用技巧",
    date: "2025-04-16",
    excerpt: "分享一些实用的 CSS 技巧。",
    content: "<p>CSS 技巧分享...</p>",
    tags: ["CSS", "前端"]
  },
  {
    id: 5,
    slug: "javascript-advanced",
    title: "JavaScript 进阶知识",
    date: "2025-04-15",
    excerpt: "深入理解 JavaScript 核心概念。",
    content: "<p>JavaScript 进阶内容...</p>",
    tags: ["JavaScript", "前端"]
  },
  {
    id: 6,
    slug: "git-guide",
    title: "Git 使用指南",
    date: "2025-04-14",
    excerpt: "Git 版本控制入门到精通。",
    content: "<p>Git 使用指南...</p>",
    tags: ["Git", "工具"]
  }
]

// 每页显示文章数
const POSTS_PER_PAGE = 2

// 获取所有标签及其文章
const getTagsMap = () => {
  const tagsMap = new Map()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, [])
      }
      tagsMap.get(tag).push(post)
    })
  })
  return tagsMap
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  posts.forEach(post => {
    createNode({
      ...post,
      id: createNodeId(`post-${post.id}`),
      internal: {
        type: `BlogPost`,
        contentDigest: createContentDigest(post),
      },
    })
  })

  console.log(`✅ 添加了 ${posts.length} 篇文章到 GraphQL`)
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // 创建文章详情页
  posts.forEach(post => {
    createPage({
      path: `/post/${post.slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        post: post
      }
    })
  })

  // 创建标签页面
  const tagsMap = getTagsMap()
  tagsMap.forEach((tagPosts, tag) => {
    createPage({
      path: `/tag/${encodeURIComponent(tag)}`,
      component: path.resolve(`./src/templates/tag.js`),
      context: {
        tag: tag,
        posts: tagPosts
      }
    })
  })

  // 创建分页首页
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  
  for (let i = 0; i < totalPages; i++) {
    const start = i * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    const pagePosts = posts.slice(start, end)
    
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve(`./src/templates/post-list.js`),
      context: {
        posts: pagePosts,
        currentPage: i + 1,
        totalPages: totalPages,
        prevPage: i > 0 ? (i === 1 ? `/` : `/page/${i}`) : null,
        nextPage: i < totalPages - 1 ? `/page/${i + 2}` : null
      }
    })
  }

  console.log(`✅ 创建了 ${posts.length} 个文章页面`)
  console.log(`✅ 创建了 ${tagsMap.size} 个标签页面`)
  console.log(`✅ 创建了 ${totalPages} 个分页页面`)
}
