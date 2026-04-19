import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <h1>404：页面未找到</h1>
    <p>您访问的页面不存在...</p>
  </Layout>
)

export const Head = () => <Seo title="404：页面未找到" />

export default NotFoundPage
