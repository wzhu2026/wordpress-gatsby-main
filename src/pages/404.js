import * as React from "react"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout title="404 - 页面未找到">
      <p>您访问的页面不存在。</p>
      <p><a href="/">返回首页</a></p>
    </Layout>
  )
}

export default NotFoundPage
