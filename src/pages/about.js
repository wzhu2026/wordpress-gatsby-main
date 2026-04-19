import * as React from "react"
import Layout from "../components/Layout"

const AboutPage = () => {
  return (
    <Layout title="关于本项目">
      <p>这个项目是为了学习 Gatsby 而创建的。</p>
      <p>Gatsby 是一个基于 React 的静态站点生成器。</p>
      <h2>学习要点</h2>
      <ul>
        <li>✅ 页面路由（文件系统路由）</li>
        <li>✅ 组件化开发（Layout 组件）</li>
        <li>⏳ 样式添加（下一步）</li>
        <li>⏳ 数据管理</li>
        <li>⏳ 动态路由</li>
      </ul>
    </Layout>
  )
}

export default AboutPage
