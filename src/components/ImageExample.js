import * as React from "react"

const ImageExample = () => {
  // 使用免费的在线示例图片
  const imageUrl = "https://picsum.photos/id/100/600/400"
  
  return (
    <div style={{ margin: '2rem 0' }}>
      <h3>示例图片（普通 img 标签）</h3>
      <img 
        src={imageUrl}
        alt="示例图片"
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          height: 'auto', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
        📸 使用在线图片服务，无需安装额外插件
      </p>
    </div>
  )
}

export default ImageExample
