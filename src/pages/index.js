import * as React from "react"
import Layout from "../components/Layout"

const IndexPage = () => {
  return (
    <Layout title="欢迎学习 Gatsby">
      <p>这是一个极简的 Gatsby 学习项目。</p>
      <p>当前时间：{new Date().toLocaleString()}</p>
      <p>你可以通过修改这些文件来学习：</p>
      <ul>
        <li><code>src/pages/</code> - 页面文件</li>
        <li><code>src/components/</code> - 组件文件</li>
        <li><code>gatsby-config.js</code> - 配置文件</li>
      </ul>
    </Layout>
  )
}

export default IndexPage
