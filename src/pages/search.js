import * as React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import posts from "../data/posts"

const SearchPage = () => {
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
    
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.content.toLowerCase().includes(term.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    )
    setSearchResults(results)
  }

  return (
    <>
      <Seo title="搜索" description="搜索文章内容" />
      <Layout title="搜索文章">
        {/* 搜索框 */}
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
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#76cfc5'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>

        {/* 搜索结果 */}
        {searchTerm && (
          <div>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              找到 {searchResults.length} 篇相关文章
            </p>
            
            {searchResults.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#666'
              }}>
                😢 没有找到相关文章，试试其他关键词吧
              </div>
            ) : (
              searchResults.map(post => (
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
              ))
            )}
          </div>
        )}

        {/* 搜索提示 */}
        {!searchTerm && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999'
          }}>
            🔍 输入关键词开始搜索（标题、内容、标签）
          </div>
        )}
      </Layout>
    </>
  )
}

export default SearchPage
