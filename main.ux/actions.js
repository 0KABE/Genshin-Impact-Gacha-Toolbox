const app = require("./scripts/app");

exports.tapped = sender => {
  // loading
  // TODO: load data
  const url = $("input_url").text
  console.log(`main.ux url: ${url}`)
  app.requestHistory(url, histories => {
    app.analyzeHistory(histories)
    $ui.push('detail')
  })
  // finish loading, push to detail page
}
