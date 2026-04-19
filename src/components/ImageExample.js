import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const ImageExample = () => {
  return (
    <div style={{ margin: '2rem 0' }}>
      <h3>Gatsby 优化后的图片</h3>
      <StaticImage
        src="../images/example.jpg"
        alt="示例图片"
        placeholder="blurred"
        width={600}
        height={400}
        style={{ borderRadius: '8px' }}
      />
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
        ✅ 自动优化：WebP格式、懒加载、响应式、模糊占位
      </p>
    </div>
  )
}

export default ImageExample
