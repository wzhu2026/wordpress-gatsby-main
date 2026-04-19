/**
 * Gatsby SSR APIs
 */

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `zh-CN` })
}
