import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import posts from "../data/posts"

const IndexPage = () => {
  return (
    <>
      <Seo title="首页" description="欢迎来到我的博客，分享技术文章和学习心得" />
      <Layout title="最新文章">
        {posts.map(post => (
          <article key={post.id} style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '0.5rem' }}>
              <a href={`/post/${post.slug}`} style={{ color: '#2c3e50' }}>
                {post.title}
              </a>
            </h2>
            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
              📅 {post.date} | 🏷️ {post.tags.join(', ')}
            </div>
            <p>{post.excerpt}</p>
            <a href={`/post/${post.slug}`} style={{ display: 'inline-block', marginTop: '1rem' }}>
              阅读全文 →
            </a>
          </article>
        ))}
      </Layout>
    </>
  )
}

export default IndexPage
