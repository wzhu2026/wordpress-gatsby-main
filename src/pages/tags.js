import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import posts from "../data/posts"

// 获取所有标签
const getAllTags = () => {
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

const TagsPage = () => {
  const tagsMap = getAllTags()
  const tags = Array.from(tagsMap.keys()).sort()

  return (
    <>
      <Seo title="标签" description="按标签浏览文章" />
      <Layout title="文章标签">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          {tags.map(tag => (
            <a
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: '#e9ecef',
                borderRadius: '20px',
                color: '#495057',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.target.style.background = '#76cfc5'
                e.target.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.target.style.background = '#e9ecef'
                e.target.style.color = '#495057'
              }}
            >
              {tag} ({tagsMap.get(tag).length})
            </a>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default TagsPage
