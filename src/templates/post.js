import * as React from "react"
import Layout from "../components/Layout"

const PostTemplate = ({ pageContext }) => {
  const { post } = pageContext

  return (
    <Layout title={post.title}>
      <div style={{ marginBottom: '1rem', color: '#666' }}>
        📅 {post.date} | 🏷️ {post.tags.join(', ')}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        <a href="/">← 返回首页</a>
      </div>
    </Layout>
  )
}

export default PostTemplate
