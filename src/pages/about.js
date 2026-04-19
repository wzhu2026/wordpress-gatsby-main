import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const AboutPage = () => {
  return (
    <>
      <Seo title="关于" description="了解我和这个博客" />
      <Layout title="关于我">
        <p>你好！欢迎来到我的博客。</p>
        <p>这里会分享：</p>
        <ul>
          <li>技术文章和学习心得</li>
          <li>项目经验分享</li>
          <li>前端开发技巧</li>
        </ul>
        <p>希望通过我的分享能帮助到更多人。</p>
      </Layout>
    </>
  )
}

export default AboutPage
