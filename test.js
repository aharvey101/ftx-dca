const exchange = require('./exchange.js')

async function dothing() {
  const res = await exchange.getMinQuantity('BTC', 'USD')
  console.log(res)
}

dothing()
