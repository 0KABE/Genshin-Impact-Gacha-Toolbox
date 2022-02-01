const axios = require('axios')
const { URL } = require('url')

exports.GachaType = GachaType = {
    'Novice': 100,
    'Weapon': 302,
    'Permanent': 200,
    'Character': 301
}
const RequestInterval = 250

exports.getAllTypeUrl = function getAllTypeUrl(baseUrl) {
    const urls = {}
    console.log(`base url: ${baseUrl}`)
    console.log(Object.keys(GachaType))
    for (const type of Object.keys(GachaType)) {
        const code = GachaType[type]
        const url = new URL(baseUrl)
        url.searchParams.set('end_id', 0)
        url.searchParams.set('gacha_type', code)
        url.searchParams.set('size', 20)
        urls[type] = url
    }
    return urls
}

exports.getAllHistory = async function getAllHistory(url) {
    var result = []

    var currentUrl = new URL(url)
    var thisPageHistory = []

    do {
        // sleep a while
        await new Promise(r => setTimeout(r, RequestInterval));

        console.log(`current request url: ${currentUrl.toString()}`)
        const response = await axios.get(currentUrl.toString())
        const body = response.data

        // get history data
        thisPageHistory = body['data']['list']
        result = result.concat(thisPageHistory)

        if (thisPageHistory.length > 0) {
            // get end id
            const endId = thisPageHistory[thisPageHistory.length - 1]['id']
            // update url
            currentUrl = updatePaginationUrl(currentUrl, endId)
        }
    } while (thisPageHistory.length > 0)

    return result
}

function updatePaginationUrl(oldUrl, endId) {
    const url = new URL(oldUrl)
    url.searchParams.set('end_id', endId)
    return url
}
