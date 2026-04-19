import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { heroStyles } from '../styles/homeStyles'

function handleBtnMouseOver(e) {
  e.currentTarget.style.background = heroStyles.btnHover.background
  e.currentTarget.style.transform = 'scale(1.06)'
}

function handleBtnMouseOut(e) {
  e.currentTarget.style.background = heroStyles.btn.background
  e.currentTarget.style.transform = 'scale(1)'
}

function handleBtnAltMouseOver(e) {
  e.currentTarget.style.background = heroStyles.btnAltHover.background
  e.currentTarget.style.color = heroStyles.btnAltHover.color
  e.currentTarget.style.transform = 'scale(1.06)'
}

function handleBtnAltMouseOut(e) {
  e.currentTarget.style.background = heroStyles.btnAlt.background
  e.currentTarget.style.color = heroStyles.btnAlt.color
  e.currentTarget.style.transform = 'scale(1)'
}

function handleSocialIconMouseOver(e) {
  e.currentTarget.style.color = heroStyles.socialIconHover.color
  const img = e.currentTarget.querySelector('img')
  if (img) {
    img.style.transform = 'scale(1.18)'
  }
}

function handleSocialIconMouseOut(e) {
  e.currentTarget.style.color = heroStyles.socialIconBtn.color
  const img = e.currentTarget.querySelector('img')
  if (img) {
    img.style.transform = 'scale(1)'
  }
}

function handleAvatarMouseOver(e) {
  e.currentTarget.style.transform = 'scale(1.06)'
  e.currentTarget.style.boxShadow = '0 8px 32px rgba(118,207,197,0.18)'
  e.currentTarget.style.borderColor = '#ec6664'
}

function handleAvatarMouseOut(e) {
  e.currentTarget.style.transform = 'scale(1)'
  e.currentTarget.style.boxShadow = heroStyles.avatarStyle.boxShadow
  e.currentTarget.style.borderColor = heroStyles.avatarStyle.border
}

const HeroSection = () => {
  const data = useStaticQuery(graphql`
    query HeroData {
      heroCategory: allWordPressCategory(filter: { slug: { eq: "hero" } }) {
        nodes {
          parsedData
        }
      }
      socialsCategory: allWordPressCategory(filter: { slug: { eq: "socials" } }) {
        nodes {
          parsedData
        }
      }
    }
  `)

  const heroData = data.heroCategory?.nodes[0]?.parsedData || null
  const socialMediaData = data.socialsCategory?.nodes[0]?.parsedData || {}

  const socialMediaForHome = Array.isArray(socialMediaData.socials)
    ? socialMediaData.socials.filter(item => item.type === 'social')
    : []

  if (!heroData) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>加载中...</div>
  }

  let basic, buttons
  
  if (heroData.basic) {
    basic = heroData.basic
    buttons = heroData.buttons
  } else if (heroData.title) {
    basic = {
      title: heroData.title || "欢迎",
      name: heroData.name || heroData.title || "开发者",
      description: heroData.description || heroData.content || "一名热爱编程的全栈开发者",
      avatar: heroData.avatar || "https://avatars.githubusercontent.com/u/20943608?v=4"
    }
    buttons = heroData.buttons || [
      { text: "查看文章", link: "/posts", type: "primary" },
      { text: "联系我", link: "/contact", type: "secondary" }
    ]
  } else {
    basic = {
      title: "欢迎",
      name: "开发者",
      description: "一名热爱编程的全栈开发者",
      avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
    }
    buttons = [
      { text: "查看文章", link: "/posts", type: "primary" },
      { text: "联系我", link: "/contact", type: "secondary" }
    ]
  }

  const avatarStyle = {
    ...heroStyles.avatarStyle,
    opacity: 1,
  }

  return (
    <div style={heroStyles.heroSection}>
      <div style={heroStyles.contentWrapper}>
        <div style={heroStyles.leftCol}>
          <div>
            <p style={heroStyles.normalText}>{basic.title}</p>
            <h1 style={heroStyles.bigText}>{basic.name}</h1>
            <p style={heroStyles.introText}>
              {basic.description}
            </p>
            <div style={heroStyles.btnRow}>
              {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
                  <Link 
                    key={index}
                    to={button.link} 
                    style={button.type === 'primary' ? heroStyles.btn : heroStyles.btnAlt} 
                    onMouseOver={button.type === 'primary' ? handleBtnMouseOver : handleBtnAltMouseOver} 
                    onMouseOut={button.type === 'primary' ? handleBtnMouseOut : handleBtnAltMouseOut}
                  >
                    {button.text}
                  </Link>
                ))
              ) : (
                <>
                  <Link to="/posts" style={heroStyles.btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut}>查看文章</Link>
                  <Link to="/contact" style={heroStyles.btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut}>联系我</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={heroStyles.rightCol}>
          <img 
            src={basic.avatar} 
            alt="头像" 
            style={avatarStyle} 
            onMouseOver={handleAvatarMouseOver} 
            onMouseOut={handleAvatarMouseOut} 
          />
          <div style={heroStyles.socialList}>
            {socialMediaForHome && socialMediaForHome.length > 0 && socialMediaForHome.map((social, index) => (
              <a 
                key={index}
                href={social.val} 
                style={heroStyles.socialIconBtn}
                target="_blank" 
                rel="noopener noreferrer" 
                title={social.name} 
                onMouseOver={handleSocialIconMouseOver} 
                onMouseOut={handleSocialIconMouseOut}
              >
                <img src={`/svg/${social.svg}`} alt={social.name} style={heroStyles.svgStyle} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
