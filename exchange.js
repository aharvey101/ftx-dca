require('dotenv').config()
const CCXT = require('ccxt')
const ccxt = new CCXT.ftx({
  secret: process.env.FTX_API_SECRET,
  apiKey: process.env.FTX_API_KEY,
  headers: {
    'FTX-SUBACCOUNT':
      process.env.NODE_ENV === 'production' ? 'buyEth' : 'test2',
  },
})

const ftx = {
  marketBuy: async ({ asset, amount, pairing }) => {
    const pair = asset + '/' + pairing
    const response = await ccxt
      .createOrder(pair, 'market', 'buy', amount)
      .then((res) => res)
    return response
  },
  getMinQuantity: async (asset, pairing) => {
    const pair = `${asset}/${pairing}`
    const price = await ccxt
      .fetchTicker(pair)
      .then((res) => res)
      .catch((err) => console.log(err))
    return price.info.minProvideSize
  },
}

module.exports = ftx
