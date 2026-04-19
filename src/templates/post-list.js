import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const PostListTemplate = ({ pageContext }) => {
  const { posts, currentPage, totalPages, prevPage, nextPage } = pageContext

  return (
    <>
      <Seo 
        title={currentPage === 1 ? "首页" : `第 ${currentPage} 页`} 
        description="分享技术文章和学习心得" 
      />
      <Layout title={currentPage === 1 ? "最新文章" : `第 ${currentPage} 页`}>
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

        {/* 分页导航 */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid #eee'
          }}>
            {prevPage ? (
              <a href={prevPage} style={{ color: '#76cfc5', textDecoration: 'none' }}>
                ← 上一页
              </a>
            ) : (
              <span style={{ visibility: 'hidden' }}>← 上一页</span>
            )}
            
            <span style={{ color: '#666' }}>
              第 {currentPage} / {totalPages} 页
            </span>
            
            {nextPage ? (
              <a href={nextPage} style={{ color: '#76cfc5', textDecoration: 'none' }}>
                下一页 →
              </a>
            ) : (
              <span style={{ visibility: 'hidden' }}>下一页 →</span>
            )}
          </div>
        )}
      </Layout>
    </>
  )
}

export default PostListTemplate
