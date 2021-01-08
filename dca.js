const exchange = require('./exchange')

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
        const minutes = Number(days) * 24
        return minutes
      }
      const intervals = calcIntervals(days)

      async function getAmount(amount, interval, minQuantity) {
        const rand = Math.floor(Math.random() * Math.floor(10))
        const orderAmount = (amount / interval) * rand
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

    // Generate random number between 0 and 10 minutes
    function generateRandTime() {
      return Math.floor(Math.random() * Math.floor(60000000))
    }
    const go = true
    while (go) {
      const order = await generateOrder(days, amount, minQuantity, pairing)
      function wait() {
        return new Promise((resolve, reject) => {
          setTimeout(
            (order) => {
              return resolve(
                console.log('pushing order to exchange'),
                console.log(order),
                exchange.marketSell(order)
              )
            },
            generateRandTime(),
            order
          )
        })
      }
      await wait()
    }
  },
}

module.exports = simpleBuy
