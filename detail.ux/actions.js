const app = require('./scripts/app')

const GachaType = ['Character', 'Weapon', 'Permanent', 'Novice']

function freshView() {
    const tab = $("tab_type")
    const totalCount = $("total_gacha")
    const rankType5Count = $("rank_5_count")
    const averageRank5 = $("average_rank_5")
    const previousRank5 = $("previous_rank_5")
    const countToGuaranteed = $("count_to_guaranteed")

    const currentGacha = GachaType[tab.index]
    totalCount.text = app.Statistics[currentGacha].totalCount
    rankType5Count.text = app.Statistics[currentGacha].rank5Count
    averageRank5.text = Math.round(app.Statistics[currentGacha].averageCountForRankType5)
    previousRank5.text = app.Statistics[currentGacha].countFromPreviousRankType5
    countToGuaranteed.text = app.Statistics[currentGacha].countToGuaranteed
}

function mergeHistories(origin, newer) {
    if (!origin) return newer

    const result = {}
    for (const type of GachaType) {
        if (origin[type] && origin[type].length > 0 && origin[type][0].id) {
            const lastId = origin[type][0].id
            const elementInNewer = newer[type].find(value => value.id === lastId)
            const indexInNewer = newer[type].indexOf(elementInNewer)
            result[type] = newer[type].slice(0, indexInNewer).concat(origin[type])
        } else {
            result[type] = newer[type]
        }
    }
    return result
}

exports.changed = (sender) => {
    freshView()
}

exports.appeared = (sender) => {
    freshView()
}

exports.save_history_tapped = async (sender) => {
    var originHistories = null
    if (!$drive.exists(app.HistoryJsonFile)) {
        $ui.toast(`${app.HistoryJsonFile} does not exist, going to create one`)
    } else {
        const data = await $drive.download(app.HistoryJsonFile)
        console.log(`${app.HistoryJsonFile} downloaded`)
        originHistories = data['string']
    }
    const histories = mergeHistories(originHistories, app.getRawHistories())
    console.log(`save_history_tapped: ${JSON.stringify(histories)}`)

    const success = $drive.write({
        data: $data({ string: JSON.stringify(histories) }),
        path: app.HistoryJsonFile
    });
    console.log(`write to ${$drive.absolutePath(app.HistoryJsonFile)} ${success}`)
}