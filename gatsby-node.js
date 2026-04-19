const posts = require("./src/data/posts")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  // 为每篇文章创建详情页
  posts.forEach(post => {
    createPage({
      path: `/post/${post.slug}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        post: post
      }
    })
  })

  console.log(`✅ 创建了 ${posts.length} 个文章页面`)
}
