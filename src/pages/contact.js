import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { contactPageStyles } from "../styles/contactStyles"
import { graphql, useStaticQuery } from "gatsby"

const renderIcon = (iconType, socialMediaData) => {
  const iconData = socialMediaData?.find(item => item.name === iconType && item.type === 'contact')
  
  if (iconData && iconData.svg) {
    return (
      <img 
        src={`/svg/${iconData.svg}`}
        alt={`${iconType} 图标`}
        style={{
          width: '24px',
          height: '24px',
          display: 'block',
          margin: 'auto'
        }}
      />
    )
  }
  return null
}

const renderSocialIcon = (iconType, socialMediaData) => {
  const iconData = socialMediaData?.find(item => item.name === iconType && item.type === 'social')
  
  if (iconData && iconData.svg) {
    return (
      <img 
        src={`/svg/${iconData.svg}`}
        alt={`${iconType} 图标`}
        style={{
          width: '36px',
          height: '36px',
          transition: 'transform 0.2s ease',
          display: 'block',
          margin: 'auto'
        }}
      />
    )
  }
  return null
}

const ContactPage = () => {
  const usedColors = React.useRef(new Set())

  const data = useStaticQuery(graphql`
    query ContactStaticDataQuery {
      allWordPressCategory {
        nodes {
          slug
          parsedData
        }
      }
    }
  `)

  const contactCategory = data.allWordPressCategory.nodes.find(cat => cat.slug === 'contact')
  const contactData = contactCategory?.parsedData || {}
  const socialsCategory = data.allWordPressCategory.nodes.find(cat => cat.slug === 'socials')
  const socialMediaObj = socialsCategory?.parsedData || {}
  const contactSocialMedia = Array.isArray(socialMediaObj.socials) ? socialMediaObj.socials.filter(item => item.type === 'contact') : []
  const socialMediaForFollow = Array.isArray(socialMediaObj.socials) ? socialMediaObj.socials.filter(item => item.type === 'social') : []

  if (!contactData) {
    return (
      <Layout>
        <Seo title="联系" description="联系我们" />
      </Layout>
    )
  }

  const getRandomColor = () => {
    const gradients = [
      'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
      'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ]
    
    const availableColors = gradients.filter(color => !usedColors.current.has(color))
    
    if (availableColors.length === 0) {
      usedColors.current.clear()
      return gradients[0]
    }
    
    const selectedColor = availableColors[Math.floor(Math.random() * availableColors.length)]
    usedColors.current.add(selectedColor)
    return selectedColor
  }

  return (
    <Layout>
      <Seo 
        title={contactData.title} 
        description={contactData.description}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          ${contactPageStyles}
          :root {
            --size-content: 1200px !important;
          }
          .contact-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
          }
        `
      }} />
      
      <div className="contact-page-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%' }}>
          <h1 className="contact-title" style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {contactData.title}
          </h1>
          <p className="contact-subtitle" style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto',
            maxWidth: '600px',
            lineHeight: 1.6
          }}>
            {contactData.description}
          </p>
        </div>

        <div className="contact-grid">
          <div style={{
            background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #f0f0f0, #f8f8f8, #f0f0f0) border-box',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '2px solid transparent',
            width: '100%'
          }}>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#666',
              textAlign: 'center'
            }}>
              联系方式
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {contactSocialMedia.map((contact, index) => (
                <div key={contact.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  background: 'rgba(118,207,197,0.05)',
                  transition: 'all 0.3s',
                  minWidth: '280px',
                  flex: '0 1 auto'
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: getRandomColor(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.1rem'
                  }}>
                    {renderIcon(contact.name, contactSocialMedia)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>
                      {contact.name === 'email' ? '邮箱' : contact.name === 'phone' ? '电话' : contact.name === 'location' ? '地址' : contact.name}
                    </div>
                    {contact.val && (contact.val.startsWith('mailto:') || contact.val.startsWith('tel:')) ? (
                      <a 
                        href={contact.val}
                        style={{
                          fontSize: '1.1rem',
                          color: '#666',
                          textDecoration: 'none',
                          fontWeight: '600',
                          transition: 'color 0.3s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#76cfc5'}
                        onMouseLeave={(e) => e.target.style.color = '#666'}
                      >
                        {contact.address}
                      </a>
                    ) : (
                      <div style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        fontWeight: '600'
                      }}>
                        {contact.address}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <a
                href="/comments"
                style={{
                  background: 'linear-gradient(90deg, #76cfc5 0%, #b4b8f8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 20px rgba(118, 207, 197, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(118, 207, 197, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(118, 207, 197, 0.3)';
                }}
              >
                💬 留言
              </a>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #f0f0f0, #f8f8f8, #f0f0f0) border-box',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '2px solid transparent',
            width: '100%'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.2rem',
              color: '#666',
              textAlign: 'center'
            }}>
              关注我
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
              {socialMediaForFollow.map((social, index) => (
                <a
                  key={social.name}
                  href={social.val || social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0,
                    background: 'none',
                    color: '#222',
                    fontSize: '2.2rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ec6664';
                    const img = e.currentTarget.querySelector('img');
                    if (img) {
                      img.style.transform = 'scale(1.18)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#222';
                    const img = e.currentTarget.querySelector('img');
                    if (img) {
                      img.style.transform = 'scale(1)';
                    }
                  }}
                  title={social.name}
                >
                  {renderSocialIcon(social.name, socialMediaForFollow)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: '#666',
          fontSize: '1rem',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            {contactData.bottom_info?.response_time || "我通常在工作日24小时内回复消息。"}
          </p>
          <p>
            {contactData.bottom_info?.closing_message || "期待收到您的来信！🚀"}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
