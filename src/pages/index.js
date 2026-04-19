import * as React from "react"

const IndexPage = () => {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Gatsby 构建成功</h1>
      <p>当前时间: {new Date().toLocaleString()}</p>
      <a href="/about">关于页面</a>
    </main>
  )
}

export default IndexPage
