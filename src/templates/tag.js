import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const TagTemplate = ({ pageContext }) => {
  const { tag, posts: tagPosts } = pageContext

  return (
    <>
      <Seo title={`标签: ${tag}`} description={`包含标签 "${tag}" 的所有文章`} />
      <Layout title={`标签: ${tag}`}>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          共 {tagPosts.length} 篇文章
        </p>
        {tagPosts.map(post => (
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
        <div style={{ marginTop: '2rem' }}>
          <a href="/tags">← 返回所有标签</a>
        </div>
      </Layout>
    </>
  )
}

export default TagTemplate
