const exchange = require('./exchange')
process.env.NTBA_FIX_319 = 1
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
const bot = new TelegramBot(token)
const cron = require('node-cron')

const simpleBuy = {
  start: async ({
    asset,
    days,
    totalAmount,
    pairing,
    minuteInterval,
    cronInterval,
  }) => {
    // initiate cron job
    cron.schedule(cronInterval, async () => {
      // 1. get min quantity
      const minQuantity = await exchange.getMinQuantity(asset, pairing)
      // 2. generate order
      function generateOrder(
        asset,
        days,
        totalAmount,
        pairing,
        minuteInterval
      ) {
        // generate amount per order
        // days * number of intervals in a day
        const msInterval = minuteInterval * 60000
        const msInDay = 24 * 60 * 60 * 1000
        // number of intervals in a day = number of ms in a day  / msInterval
        const numberOfIntervalsInADay = msInDay / msInterval
        const totalIntervals = numberOfIntervalsInADay * days
        const amount = totalAmount / totalIntervals

        const order = {
          asset: asset,
          amount: minQuantity > amount ? minQuantity : amount,
          pairing: pairing,
        }
        return order
      }
      const order = generateOrder(
        asset,
        days,
        totalAmount,
        pairing,
        minuteInterval
      )
      console.log(order)
      exchange.marketBuy(order)
    })
  },
  test: async ({ text }) => {
    console.log(text)
  },
}

module.exports = simpleBuy
