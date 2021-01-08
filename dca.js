const exchange = require('./exchange')
process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
const bot = new TelegramBot(token)
// while go = true market buy a little of this

// get days
// get amount
// get intervals

let go = true

const simpleBuy = {
  start: async ({ asset, days, amount, pairing }) => {
    const minQuantity = await exchange.getMinQuantity(asset, pairing)

    async function generateOrder(days, amount, minQuantity, pairing) {
      function calcIntervals(days) {
        const hours = Number(days) * 24
        return hours
      }
      const intervals = calcIntervals(days)

      async function getAmount(amount, interval, minQuantity) {
        const orderAmount = amount / interval
        if (orderAmount < minQuantity) {
          return minQuantity
        }
        return orderAmount
      }
      const orderAmount = await getAmount(amount, intervals, minQuantity)

      const order = {
        asset: asset,
        amount: orderAmount,
        pairing: pairing,
      }
      return order
    }

    const go = true
    while (go) {
      console.log('doing a thing')
      const order = await generateOrder(days, amount, minQuantity, pairing)
      function wait() {
        return new Promise((resolve, reject) => {
          setTimeout(
            (order) => {
              return resolve(
                console.log('pushing order to exchange'),
                console.log(order),
                bot.sendMessage(chatId, `bought some`),
                exchange.marketBuy(order)
              )
              // tell me
            },
            1000,
            order
          )
        })
      }
      await wait()
    }
  },
}

module.exports = simpleBuy
