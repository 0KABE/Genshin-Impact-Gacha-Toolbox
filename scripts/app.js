function requestHistory(url, complete) {
  console.log(`app.js url: ${url}`)
  $nodejs.run({
    path: 'scripts/index.js',
    argv: [
      '--mode',
      'jsbox',
      '--url',
      url
    ],
    listener: {
      id: 'histories',
      handler: complete
    }
  })
}

function analyzeHistory(histories) {
  const GuaranteedCount = {
    Novice: 90,
    Weapon: 80,
    Permanent: 90,
    Character: 90
  }

  for (const type of Object.keys(Statistics)) {
    Statistics[type].totalCount = histories[type].length

    const rankType5Array = histories[type].filter((value) => value.rank_type === "5")
    Statistics[type].rank5Count = rankType5Array.length

    const lastRank5 = histories[type].find(value => value.rank_type === "5")
    const lastRank5Index = histories[type].indexOf(lastRank5)
    Statistics[type].countFromPreviousRankType5 = lastRank5Index >= 0 ? lastRank5Index : 0

    Statistics[type].countToGuaranteed = GuaranteedCount[type] - Statistics[type].countFromPreviousRankType5
    Statistics[type].averageCountForRankType5 =
      (Statistics[type].totalCount - Statistics[type].countFromPreviousRankType5)
      / Statistics[type].rank5Count
  }

  console.log(`analyze history: ${JSON.stringify(Statistics)}`)
}

const Statistics = {
  Novice: {
    totalCount: null,
    rank5Count: null,
    averageCountForRankType5: null,
    countFromPreviousRankType5: null,
    countToGuaranteed: null
  },
  Weapon: {
    totalCount: null,
    rank5Count: null,
    averageCountForRankType5: null,
    countFromPreviousRankType5: null,
    countToGuaranteed: null
  },
  Permanent: {
    totalCount: null,
    rank5Count: null,
    averageCountForRankType5: null,
    countFromPreviousRankType5: null,
    countToGuaranteed: null
  },
  Character: {
    totalCount: null,
    rank5Count: null,
    averageCountForRankType5: null,
    countFromPreviousRankType5: null,
    countToGuaranteed: null
  }
}

module.exports = {
  requestHistory: requestHistory,
  analyzeHistory: analyzeHistory,
  Statistics: Statistics
}