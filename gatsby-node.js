/**
 * 极简版 gatsby-node.js - 确保构建成功
 */

const { fallbackPosts } = require('./src/data/fallbackData');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  console.log('✅ 使用本地数据模式');
  
  // 只创建文章节点，简化流程
  fallbackPosts.forEach(post => {
    const nodeId = createNodeId(`post-${post.id}`);
    createNode({
      id: nodeId,
      internal: {
        type: 'Post',
        contentDigest: createContentDigest(post),
      },
      ...post
    });
  });
  
  console.log(`✅ 创建了 ${fallbackPosts.length} 个文章节点`);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  
  // 直接从 fallbackPosts 创建页面，不经过 GraphQL
  const { fallbackPosts } = require('./src/data/fallbackData');
  
  fallbackPosts.forEach(post => {
    createPage({
      path: `/post/${post.slug}`,
      component: require.resolve("./src/templates/post.js"),
      context: {
        slug: post.slug,
        post: post
      },
    });
  });
  
  console.log(`✅ 创建了 ${fallbackPosts.length} 个文章页面`);
};
