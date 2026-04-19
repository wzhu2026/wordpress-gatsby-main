/**
 * Gatsby Node APIs
 */

const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL;
const defaultApiMode = process.env.GATSBY_WORDPRESS_API_MODE || 'default';

const getApiBase = (url) => {
  if (!url) return null;
  if (url.includes('wordpress.com')) {
    const site = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `https://public-api.wordpress.com/wp/v2/sites/${site}`;
  } else {
    return `${url.replace(/\/$/, '')}/wp-json/wp/v2`;
  }
};

const API_BASE = getApiBase(WORDPRESS_URL);

const {
  fallbackPosts,
  fallbackPostsMeta,
  defaultAuthor,
  defaultAuthorAvatar
} = require('./src/data/fallbackData');

const parseCategoryData = (description) => {
  if (!description) return null;
  try {
    return JSON.parse(description);
  } catch (e) {
    console.log('Error parsing category data:', e.message);
    return null;
  }
};

const decodeHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…');
};

const fetchWordPressData = async () => {
  try {
    if (defaultApiMode === 'acf') {
      return null;
    } else {
      const [postsResponse, categoriesResponse, pagesResponse] = await Promise.all([
        fetch(`${API_BASE}/posts?_embed&per_page=100`),
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/pages?_embed&per_page=50`)
      ]);
      const posts = await postsResponse.json();
      const categories = await categoriesResponse.json();
      const pages = await pagesResponse.json();
      return {
        posts,
        categories,
        pages,
        siteName: WORDPRESS_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')
      };
    }
  } catch (error) {
    console.error('Error fetching WordPress data:', error);
    return null;
  }
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  if (!process.env.GATSBY_WORDPRESS_URL || process.env.GATSBY_WORDPRESS_URL === 'https://your-wordpress-site.com') {
    console.log('📦 使用本地 fallback 数据');
    
    const {
      fallbackPosts,
      fallbackHero,
      fallbackAbout,
      fallbackContact,
      fallbackSocials,
      fallbackComments,
      fallbackFooter,
      fallbackSkills,
      fallbackProjects
    } = require('./src/data/fallbackData');
    
    fallbackPosts.forEach(post => {
      const nodeId = createNodeId(`wordpress-post-${post.id}`);
      createNode({
        id: nodeId,
        internal: {
          type: 'WordPressPost',
          contentDigest: createContentDigest(post),
        },
        wordpressId: post.id,
        title: decodeHtml(post.title?.rendered || ''),
        content: post.content?.rendered || '',
        excerpt: post.excerpt?.rendered || '',
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        author: defaultAuthor,
        authorAvatar: defaultAuthorAvatar,
        featuredImage: post.jetpack_featured_media_url || '',
        categories: [],
        tags: [],
        readTime: Math.ceil((post.content?.rendered?.length || 0) / 1000) + ' 分钟阅读',
      });
    });
    
    const fallbackCategories = [
      { name: 'hero', slug: 'hero', parsedData: fallbackHero },
      { name: 'about', slug: 'about', parsedData: fallbackAbout }, 
      { name: 'contact', slug: 'contact', parsedData: fallbackContact },
      { name: 'socials', slug: 'socials', parsedData: fallbackSocials },
      { name: 'comments', slug: 'comments', parsedData: fallbackComments },
      { name: 'footer', slug: 'footer', parsedData: fallbackFooter },
      { name: 'skills', slug: 'skills', parsedData: fallbackSkills },
      { name: 'projects', slug: 'projects', parsedData: fallbackProjects },
    ];
    
    fallbackCategories.forEach((cat, idx) => {
      createNode({
        id: createNodeId(`fallback-category-${cat.slug}`),
        internal: {
          type: 'WordPressCategory',
          contentDigest: createContentDigest(cat),
        },
        wordpressId: idx + 1,
        name: cat.name,
        slug: cat.slug,
        description: '',
        count: 1,
        parsedData: cat.parsedData,
      });
    });
    return;
  }
  
  console.log('🔄 获取 WordPress 数据...');
  const wpData = await fetchWordPressData();
  
  if (!wpData) {
    console.log('⚠️ WordPress 数据获取失败，使用 fallback 数据');
    return;
  }
  
  const { posts, categories, pages, siteName } = wpData;
  console.log(`✅ 获取到 ${posts.length} 篇文章, ${categories.length} 个分类`);

  posts.forEach((post) => {
    const nodeId = createNodeId(`wordpress-post-${post.id}`);
    createNode({
      id: nodeId,
      internal: {
        type: 'WordPressPost',
        contentDigest: createContentDigest(post),
      },
      wordpressId: post.id,
      title: decodeHtml(post.title?.rendered || ''),
      content: post.content?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      author: defaultAuthor,
      authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || defaultAuthorAvatar,
      featuredImage: post.jetpack_featured_media_url || '',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      readTime: Math.ceil((post.content?.rendered?.length || 0) / 1000) + ' 分钟阅读',
    });
  });
  
  categories.forEach((category) => {
    const nodeId = createNodeId(`wordpress-category-${category.id}`);
    let parsedData = parseCategoryData(category.description);
    
    createNode({
      id: nodeId,
      internal: {
        type: 'WordPressCategory',
        contentDigest: createContentDigest(category),
      },
      wordpressId: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      count: category.count,
      parsedData: parsedData,
    });
  });
  
  console.log('✅ WordPress 数据节点创建完成');
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  
  console.log('🔄 创建页面...');
  
  const result = await graphql(`
    query {
      allWordPressPost {
        nodes {
          wordpressId
          title
          slug
          excerpt
          content
          date
          author
          authorAvatar
          featuredImage
          categories
          tags
          readTime
        }
      }
    }
  `);
  
  if (result.errors) {
    console.error('GraphQL 查询错误:', result.errors);
    const { fallbackPosts } = require('./src/data/fallbackData');
    fallbackPosts.forEach(post => {
      createPage({
        path: `/post/${post.slug}`,
        component: require.resolve("./src/pages/post/[slug].js"),
        context: {
          slug: post.slug,
          post: post
        },
      });
    });
    return;
  }
  
  const posts = result.data.allWordPressPost.nodes;
  
  posts.forEach(post => {
    createPage({
      path: `/post/${post.slug}`,
      component: require.resolve("./src/pages/post/[slug].js"),
      context: {
        slug: post.slug,
        post: {
          id: post.wordpressId,
          title: post.title,
          author: post.author,
          authorAvatar: post.authorAvatar,
          tags: post.tags,
          readTime: post.readTime,
          date: post.date,
          excerpt: post.excerpt,
          content: post.content,
        }
      },
    });
  });
  
  console.log(`✅ 创建了 ${posts.length} 个文章页面`);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type WordPressPost implements Node {
      wordpressId: Int!
      title: String!
      content: String!
      excerpt: String!
      slug: String!
      date: Date! @dateformat
      modified: Date! @dateformat
      author: String!
      authorAvatar: String
      featuredImage: String
      categories: [String!]!
      tags: [String!]!
      readTime: String!
    }
    
    type WordPressCategory implements Node {
      wordpressId: Int!
      name: String!
      slug: String!
      description: String!
      count: Int!
      parsedData: JSON
    }
    
    type WordPressPage implements Node {
      wordpressId: Int!
      title: String!
      content: String!
      excerpt: String!
      slug: String!
      date: Date! @dateformat
      modified: Date! @dateformat
      featuredImage: String
    }
  `;
  
  createTypes(typeDefs);
};
