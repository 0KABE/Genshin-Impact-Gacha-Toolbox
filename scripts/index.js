const yargs = require('yargs')
const fs = require('fs')
const { getAllTypeUrl, getAllHistory: getAllHistories, GachaType } = require('./spider')

const argv = yargs
  .option('mode', {
    demandOption: true,
    choices: ['cli', 'jsbox'],
    description: 'Running mode',
    default: 'jsbox'
  })
  .option('url', {
    description: 'A gacha url to fetch all gacha history',
    demandOption: true,
    type: 'string'
  })
  .option('output_file', {
    description: 'Export the histories to specified file in json format',
    type: 'string'
  })
  .argv

function exportJson(histories) {
  // write to file
  console.log(`export histories to ${argv.output_file}`)
  fs.writeFile(argv.output_file, JSON.stringify(histories), 'utf-8', (err) => {
    if (err) throw err;
    console.log('complete');
  })
}

async function run() {
  console.log(`starting a spider`)
  console.log(argv)

  const urls = getAllTypeUrl(argv.url)

  const histories = {}
  for (const type of Object.keys(GachaType)) {
    const history = await getAllHistories(urls[type])
    histories[type] = history
  }

  if (argv.output_file) {
    exportJson(histories)
  } else {
    console.log(`Not set output_file path, cancel to export the data`)
  }

  if (argv.mode === 'jsbox') {
    console.log(`notify to jsbox`)
    $jsbox.notify('histories', histories)
  }
}

run().catch((e) => { console.log(`exception: ${e}`) })