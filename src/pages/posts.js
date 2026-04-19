import * as React from "react"
import { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostsPage = ({ data }) => {
  const postsData = data.allWordPressPost.nodes
  const categoriesData = data.allWordPressCategory.nodes
  
  const postsCategory = categoriesData.find(cat => 
    cat.name === 'Posts' || 
    cat.name === 'posts' ||
    cat.name.toLowerCase().includes('posts')
  )
  
  const metaData = postsCategory?.parsedData || {}
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  const allTags = useMemo(() => {
    const tags = new Set()
    if (postsData && Array.isArray(postsData)) {
      postsData.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tags.add(tag))
        }
      })
    }
    return Array.from(tags).sort()
  }, [postsData])

  const filteredPosts = useMemo(() => {
    if (!postsData || !Array.isArray(postsData)) {
      return []
    }
    return postsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [postsData, searchTerm, selectedTags])

  const groupedPosts = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      const dateOnly = post.date.split('T')[0];
      if (!groups[dateOnly]) groups[dateOnly] = [];
      groups[dateOnly].push(post);
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  }, [filteredPosts]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRandomReadTime = () => `${Math.floor(Math.random() * 16) + 5} 分钟阅读`;

  return (
    <Layout>
      <Seo 
        title={metaData?.title || '文章'} 
        description={metaData?.subtitle || '浏览所有文章'}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background: linear-gradient(120deg, #f8fafc 0%, #e6f7f4 100%) !important;
            min-height: 100vh;
          }
          :root {
            --size-content: 1200px !important;
          }
          .posts-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
          }
        `
      }} />
      
      <div className="posts-page-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {metaData?.title || '文章'}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto'
          }}>
            {metaData?.subtitle || '浏览所有文章'}
          </p>
        </div>

        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: '#333',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              标签筛选：
            </h3>
            <div style={{ flex: 1 }} />
            <div style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
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
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            width: '100%'
          }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '2px solid',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedTags.includes(tag) ? '#76cfc5' : 'transparent',
                  borderColor: selectedTags.includes(tag) ? '#76cfc5' : '#ddd',
                  color: selectedTags.includes(tag) ? 'white' : '#666'
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#76cfc5'
                    e.target.style.color = '#76cfc5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#ddd'
                    e.target.style.color = '#666'
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              没有找到符合条件的文章。
            </div>
          ) : (
            groupedPosts.map(([date, posts]) => (
              <div key={date} style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '2.5rem',
                padding: '2.5rem 2rem 2rem 2rem',
                border: '1px solid #e9ecef',
              }}>
                <div style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#179b8e',
                  marginBottom: '2rem',
                  letterSpacing: '0.02em',
                }}>{formatDate(date)}</div>
                <div style={{ width: '100%' }}>
                  {posts.map((post) => (
                    <div key={post.wordpressId}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        transition: 'all 0.3s',
                        borderRadius: '12px',
                      }}>
                        <div style={{
                          flex: 2,
                          display: 'flex',
                          alignItems: 'center',
                          minWidth: 0,
                          padding: '1.5rem 1rem',
                        }}>
                          <h3 style={{
                            fontSize: '1.6rem',
                            fontWeight: '600',
                            margin: '0',
                            color: '#333',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1,
                            minWidth: 0,
                            lineHeight: '1.2',
                            display: 'flex',
                            alignItems: 'center',
                            height: '36px'
                          }}>
                            <Link 
                              to={`/post/${post.slug}`}
                              style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'inline-block',
                                maxWidth: '100%'
                              }}
                              onMouseEnter={e => {
                                e.target.style.color = '#76cfc5'
                              }}
                              onMouseLeave={e => {
                                e.target.style.color = '#333'
                              }}
                            >
                              {post.title}
                            </Link>
                          </h3>
                        </div>
                        <div style={{
                          flex: 1.2,
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1.5rem 1rem',
                          minWidth: '150px',
                          flexWrap: 'wrap',
                          rowGap: '0.3rem',
                        }}>
                          {post.tags && post.tags.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '0.3rem',
                              flexWrap: 'nowrap',
                              width: '100%',
                              overflow: 'hidden',
                            }}>
                              {post.tags.slice(0, 2).map((tag, i) => (
                                <span key={tag + i} style={{
                                  background: '#edf2f7',
                                  color: '#4a5568',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '15px',
                                  fontSize: '0.85rem',
                                  fontWeight: 500,
                                  whiteSpace: 'nowrap'
                                }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div style={{
                          flex: '0 0 120px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          padding: '1.5rem 1rem',
                        }}>
                          <Link 
                            to={`/post/${post.slug}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: '#76cfc5',
                              textDecoration: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              padding: '0.5rem 1rem',
                              cursor: 'pointer',
                              border: 'none',
                              background: 'none',
                            }}
                          >
                            阅读全文 <span style={{ fontSize: '1.2rem' }}>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage

export const query = graphql`
  query PostsPageQuery {
    allWordPressPost(sort: {date: DESC}) {
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
    allWordPressCategory {
      nodes {
        name
        parsedData
      }
    }
  }
`
