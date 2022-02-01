const app = require("./scripts/app");

exports.analyze_tapped = sender => {
  // loading
  // TODO: load data
  const url = $("input_url").text
  console.log(`main.ux url: ${url}`)
  app.requestHistory(url, histories => {
    app.analyzeHistory(histories)
    $cache.set('input_url', url)
    $ui.push('detail')
  })
  // finish loading, push to detail page
}

exports.load_history_tapped = async sender => {
  console.log('load_history_tapped')
  if (!$drive.exists(app.HistoryJsonFile)) {
    $ui.toast(`${app.HistoryJsonFile} does not exist`)
  } else {
    console.log(`read icloud file ${app.HistoryJsonFile}`)
    const data = $drive.read(app.HistoryJsonFile);
    app.analyzeHistory(JSON.parse(data['string']))
    $ui.push('detail')
  }
}

exports.main_view_appeared = async sender => {
  const inputUrl = $("input_url")
  inputUrl.text = $cache.get("input_url");
}