import * as React from "react"
import { Link } from "gatsby"

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: 'rgba(250, 253, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  borderBottom: '1px solid rgba(118,207,197,0.1)',
}

const menuStyle = {
  display: 'flex',
  gap: '2rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  height: '100%',
}

const siteNameStyle = {
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '0.05em',
  color: '#ec6664',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}

const menuLinkStyle = {
  fontWeight: 700,
  color: '#d48a88',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'color 0.2s',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0.25rem 0',
}

const activeMenuLinkStyle = {
  ...menuLinkStyle,
  color: '#ec6664',
}

const Header = ({ siteTitle }) => {
  // 检查 Giscus 环境变量是否配置（可选功能）
  const isGiscusConfigured = typeof window !== 'undefined' && 
                             process.env.GATSBY_GISCUS_REPO && 
                             process.env.GATSBY_GISCUS_REPO_ID && 
                             process.env.GATSBY_GISCUS_CATEGORY_ID

  const handleMouseOver = (e) => {
    const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
    if (!isActive) {
      e.currentTarget.style.color = '#ec6664'
    }
  }

  const handleMouseOut = (e) => {
    const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
    if (!isActive) {
      e.currentTarget.style.color = '#d48a88'
    }
  }

  const handleSiteNameMouseOver = (e) => {
    e.currentTarget.style.color = '#ffb400'
  }

  const handleSiteNameMouseOut = (e) => {
    e.currentTarget.style.color = '#ec6664'
  }

  return (
    <nav style={navStyle}>
      <Link 
        to="/" 
        style={siteNameStyle} 
        onMouseOver={handleSiteNameMouseOver} 
        onMouseOut={handleSiteNameMouseOut}
      >
        {siteTitle || '我的博客'}
      </Link>
      <ul style={menuStyle}>
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link 
            to="/" 
            style={menuLinkStyle} 
            getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >首页</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link 
            to="/posts" 
            style={menuLinkStyle} 
            getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >文章</Link>
        </li>
        {isGiscusConfigured && (
          <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
            <Link 
              to="/comments" 
              style={menuLinkStyle} 
              getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >留言</Link>
          </li>
        )}
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link 
            to="/contact" 
            style={menuLinkStyle} 
            getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >联系</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
