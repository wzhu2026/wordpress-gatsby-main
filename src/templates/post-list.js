import * as React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const PostListTemplate = ({ pageContext }) => {
  const { posts, currentPage, totalPages, prevPage, nextPage } = pageContext
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // 处理搜索
  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    
    if (term.trim() === "") {
      setSearchResults([])
      return
    }
    
    // 需要导入 posts 数据
    const allPosts = require("../data/posts").default
    const results = allPosts.filter(post => 
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.content.toLowerCase().includes(term.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    )
    setSearchResults(results)
  }

  // 显示搜索结果时
  if (searchTerm) {
    return (
      <>
        <Seo title="搜索结果" description={`搜索: ${searchTerm}`} />
        <Layout title={`搜索结果: ${searchTerm}`}>
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="输入关键词搜索文章..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#76cfc5'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            找到 {searchResults.length} 篇相关文章
            <button 
              onClick={() => {
                setSearchTerm("")
                setSearchResults([])
              }}
              style={{
                marginLeft: '1rem',
                background: 'none',
                border: 'none',
                color: '#76cfc5',
                cursor: 'pointer'
              }}
            >
              清除搜索
            </button>
          </p>
          {searchResults.map(post => (
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

  // 正常显示文章列表
  return (
    <>
      <Seo 
        title={currentPage === 1 ? "首页" : `第 ${currentPage} 页`} 
        description="分享技术文章和学习心得" 
      />
      <Layout title={currentPage === 1 ? "最新文章" : `第 ${currentPage} 页`}>
        {/* 快速搜索入口 */}
        <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
          <a 
            href="/search"
            style={{
              color: '#76cfc5',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            🔍 高级搜索 →
          </a>
        </div>

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
