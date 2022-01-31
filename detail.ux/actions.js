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

exports.changed = (sender) => {
    freshView()
}

exports.appeared = (sender) => {
    freshView()
}