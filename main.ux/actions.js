const app = require("./scripts/app");

const HistoryJsonFile = 'genshin_impact_wish_history.json'

exports.analyze_tapped = sender => {
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

exports.load_history_tapped = async sender => {
  if (!$drive.exists(HistoryJsonFile)) {
    $ui.toast(`${HistoryJsonFile} does not exist`)
  } else {
    const histories = await $drive.download(HistoryJsonFile);
    app.analyzeHistory(JSON.parse(histories['string']))
    $ui.push('detail')
  }
}
