import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ children, title }) => {
  return (
    <div>
      {/* 导航栏 */}
      <nav style={{
        background: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>首页</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>关于</Link>
        <Link to="/tags" style={{ color: 'white', textDecoration: 'none' }}>标签</Link>
        <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>搜索</Link>  {/* 新增 */}
      </nav>

      {/* 主要内容 */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        {title && <h1 style={{ marginBottom: '1rem' }}>{title}</h1>}
        {children}
      </main>

      {/* 页脚 */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        marginTop: '3rem',
        color: '#666',
        borderTop: '1px solid #eee'
      }}>
        © {new Date().getFullYear()} 我的博客
      </footer>
    </div>
  )
}

export default Layout
